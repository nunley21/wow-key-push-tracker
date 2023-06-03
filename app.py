
import puller
from flask import Flask, render_template, jsonify


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')




@app.route('/api/get_all')
def api_scanner_count():
    return jsonify(puller.main())

@app.route('/debug')
def debug():
    return "asd"

