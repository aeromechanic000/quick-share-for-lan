# Quick Share for LAN

## Install and Run
### Option 1: `uv`

1. uv init 
2. uv add flask markdown
3. uv run app.py
4. open localhost:5959 in browser.

### Option 2: `conda`

1. conda create -n share python=3.12 
2. conda activate share
3. pip install flask markdown
4. python app.py
5. open localhost:5959 in browser.

## Tabs

### Share Tab

The main tab for content sharing and interaction.

- **Documentation** (left panel, top) — Displays the contents of `static/content.md` rendered as Markdown. Edit this file to update the shown content.
- **Voting** (left panel, bottom) — Create polls by configuring `static/votes.json`. Users can select options and submit votes. Results are shown as percentages with progress bars. Users can also cancel their vote to re-vote.
- **Downloads** (right panel, top) — Lists files placed in `static/downloads/` with file size and type info. Users click to download.
- **Upload** (right panel, bottom) — Drag-and-drop or click-to-browse file upload area. Uploaded files are stored in `static/uploads/`.

### Preview Tab

An HTML editor with live preview.

- Write or paste HTML code (including CSS and JavaScript) in the editor on the left.
- Click **Show Preview** to render the code in a sandboxed iframe on the right.
- Supports Tab indentation in the editor.
- Click **Clear** to reset the editor.

### Screen Tab

A live screen-sharing viewer (only visible when the server is started with `--screen`).

- Displays a live MJPEG stream of the host's screen at `/api/screen-stream`.
- Click the fullscreen button to expand the view.
- If the stream is unavailable, an error message is shown.
