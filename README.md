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

## Usage

- Update the content in `static/content.md`.
- Put files for students to download in `static/downloads`.
- Get the uploaded files in `static/uploads`.
