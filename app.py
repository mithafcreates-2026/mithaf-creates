from flask import Flask, render_template_string, send_from_directory
import os

app = Flask(__name__, static_folder='assets')

@app.route('/')
def home():
    with open("index.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    return render_template_string(html_content)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)

if __name__ == '__main__':
    print("Mithaf Creates Server Running on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)