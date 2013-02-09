from flask import Flask, request
from flask import render_template


app=Flask(__name__)

@app.route("/")
def home_page():
    return render_template('main.html')

@app.route("/index", methods=['GET', 'POST'])
def createGesture():
    print request.form['gestureName']
    print request.form['gestureStructure']
    print request.form['parameters']
    return render_template('main.html')

if __name__=="__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
