
import puller
import gen
from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/team_gen')
def gener():
    teams = gen.gen_teams()
    print(teams)
    return render_template('teams.html', data= teams)


def allowed_file(filename):
    allowed_extensions = {'yaml'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/uploader', methods = ['GET','POST'])
def loader():
    if request.method == 'POST':
        if request.method == 'POST':
            # Check if the post request has the file part
            if 'file' not in request.files:
                return 'No file part'

            file = request.files['file']

            # If the user does not select a file, the browser submits an empty file without a filename
            if file.filename == '':
                return 'No selected file'

            if file and allowed_file(file.filename):
                # Save the file to the upload folder
                filename = os.path.join("./", file.filename)
                file.save(filename)
                return 'File uploaded successfully!'
            else:
                return 'File type not allowed'

    return render_template('uploader.html')





@app.route('/api/get_all')
def api_scanner_count():
    return jsonify(puller.main())

@app.route('/debug')
def debug():
    return "asd"


if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True, port=8080)