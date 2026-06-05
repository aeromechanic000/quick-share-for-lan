from flask import Flask, render_template, request, send_from_directory, jsonify, redirect, url_for, Response
import os, random, datetime, json, argparse, time, io, threading
from werkzeug.utils import secure_filename
import markdown

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['DOWNLOAD_FOLDER'] = 'static/downloads'
app.config['VOTES_FILE'] = 'static/votes.json'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

screen_enabled = False

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['DOWNLOAD_FOLDER'], exist_ok=True)

def get_datetime_stamp():
    return datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

def get_random_file_prefix():
    return "%s-%s" % (get_datetime_stamp(), "%03d" % random.randint(0, 1000))

def get_client_ip():
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0]
    return request.remote_addr

def load_votes_data():
    """Load votes data from votes.json"""
    try:
        with open(app.config['VOTES_FILE'], 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_votes_data(data):
    """Save votes data to votes.json"""
    with open(app.config['VOTES_FILE'], 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

@app.route('/')
def index():
    return render_template('index.html', screen_enabled=screen_enabled)

@app.route('/api/markdown')
def get_markdown():
    try:
        with open('static/content.md', 'r', encoding='utf-8') as f:
            content = f.read()
        html_content = markdown.markdown(content, extensions=['fenced_code', 'codehilite'])
        return jsonify({'content': html_content})
    except FileNotFoundError:
        return jsonify({'content': '<p>content.md file not found</p>'})

@app.route('/api/downloads')
def list_downloads():
    try:
        files = []
        download_dir = app.config['DOWNLOAD_FOLDER']
        for filename in os.listdir(download_dir):
            if filename.startswith('.') or filename.startswith('_'):
                continue
            if os.path.isfile(os.path.join(download_dir, filename)):
                file_path = os.path.join(download_dir, filename)
                file_size = os.path.getsize(file_path)
                files.append({
                    'name': filename,
                    'size': file_size
                })
        return jsonify({'files': files})
    except FileNotFoundError:
        return jsonify({'files': []})

@app.route('/download/<filename>')
def download_file(filename):
    if filename.startswith('.') or filename.startswith('_'):
        return jsonify({'error': 'File not accessible'}), 403
    return send_from_directory(app.config['DOWNLOAD_FOLDER'], filename, as_attachment=True)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{get_random_file_prefix()}-{filename}")
        file.save(file_path)
        return jsonify({'message': f'File {filename} uploaded successfully'})

    return jsonify({'error': 'Upload failed'}), 400

# Voting routes
@app.route('/api/vote/topics')
def get_vote_topics():
    """Get all vote topics with their current statistics"""
    try:
        topics_data = load_votes_data()
        return jsonify({'topics': topics_data})
    except Exception as e:
        return jsonify({'topics': [], 'error': str(e)})

@app.route('/api/vote/submit', methods=['POST'])
def submit_vote():
    """Submit a vote for a topic"""
    client_ip = get_client_ip()
    data = request.json
    topic = data.get('topic')
    option = data.get('option')

    if not topic or not option:
        return jsonify({'error': 'Invalid vote data'}), 400

    try:
        topics_data = load_votes_data()

        # Find the topic
        topic_found = False
        for topic_data in topics_data:
            if topic_data['topic'] == topic:
                topic_found = True

                # Initialize results structure if not exists
                if 'results' not in topic_data:
                    topic_data['results'] = {
                        'votes': {},
                        'ips': {},
                        'total_submissions': 0
                    }

                # Check if IP already voted
                if client_ip in topic_data['results']['ips']:
                    return jsonify({'error': 'You have already voted on this topic'}), 400

                # Validate option exists
                if option not in topic_data['options']:
                    return jsonify({'error': 'Invalid option'}), 400

                # Record vote
                if option not in topic_data['results']['votes']:
                    topic_data['results']['votes'][option] = 0
                topic_data['results']['votes'][option] += 1

                # Record IP
                topic_data['results']['ips'][client_ip] = option

                # Increment total submissions
                topic_data['results']['total_submissions'] += 1

                break

        if not topic_found:
            return jsonify({'error': 'Topic not found'}), 404

        # Save updated data
        save_votes_data(topics_data)

        return jsonify({
            'message': 'Vote submitted successfully',
            'topics': topics_data
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vote/cancel', methods=['POST'])
def cancel_vote():
    """Cancel a previously submitted vote"""
    client_ip = get_client_ip()
    data = request.json
    topic = data.get('topic')

    if not topic:
        return jsonify({'error': 'Invalid request'}), 400

    try:
        topics_data = load_votes_data()

        # Find the topic
        topic_found = False
        for topic_data in topics_data:
            if topic_data['topic'] == topic:
                topic_found = True

                # Check if results exist
                if 'results' not in topic_data:
                    return jsonify({'error': 'No vote found to cancel'}), 400

                # Check if IP has voted
                if client_ip not in topic_data['results']['ips']:
                    return jsonify({'error': 'No vote found to cancel'}), 400

                # Get the option that was voted for
                voted_option = topic_data['results']['ips'][client_ip]

                # Decrease vote count
                if voted_option in topic_data['results']['votes']:
                    topic_data['results']['votes'][voted_option] -= 1
                    if topic_data['results']['votes'][voted_option] <= 0:
                        del topic_data['results']['votes'][voted_option]

                # Remove IP from voted list
                del topic_data['results']['ips'][client_ip]

                # Decrease total submissions
                topic_data['results']['total_submissions'] -= 1

                break

        if not topic_found:
            return jsonify({'error': 'Topic not found'}), 404

        # Save updated data
        save_votes_data(topics_data)

        return jsonify({
            'message': 'Vote cancelled successfully',
            'topics': topics_data
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vote/status')
def get_vote_status():
    """Get current user's vote status"""
    client_ip = get_client_ip()

    try:
        topics_data = load_votes_data()
        user_votes = {}

        for topic_data in topics_data:
            if 'results' in topic_data and client_ip in topic_data['results']['ips']:
                user_votes[topic_data['topic']] = topic_data['results']['ips'][client_ip]

        return jsonify({'votes': user_votes})

    except Exception as e:
        return jsonify({'votes': {}, 'error': str(e)})

# Screen sharing
def generate_screen_frames():
    import mss
    from PIL import Image

    with mss.mss() as sct:
        monitor = sct.monitors[1] if len(sct.monitors) > 1 else sct.monitors[0]
        while True:
            screenshot = sct.grab(monitor)
            img = Image.frombytes('RGB', screenshot.size, screenshot.bgra, 'raw', 'BGRX')
            buf = io.BytesIO()
            img.save(buf, format='JPEG', quality=75)
            frame = buf.getvalue()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            time.sleep(0.1)  # ~10 FPS

@app.route('/api/screen-stream')
def screen_stream():
    if not screen_enabled:
        return jsonify({'error': 'Screen sharing not enabled'}), 403
    return Response(generate_screen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/screen-enabled')
def check_screen_enabled():
    return jsonify({'enabled': screen_enabled})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Quick Share for LAN')
    parser.add_argument('--screen', action='store_true', help='Enable screen sharing')
    parser.add_argument('--port', type=int, default=5959, help='Port to run the server on')
    args = parser.parse_args()

    screen_enabled = args.screen

    if screen_enabled:
        print("Screen sharing: ENABLED")

    app.run(debug=True, host="0.0.0.0", port=args.port)
