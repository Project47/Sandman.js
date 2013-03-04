import logging
import cgi
import urllib
import urllib2
import webapp2
import json

from google.appengine.ext import db
from jinja2 import Environment, PackageLoader , FileSystemLoader

jinja_environment = Environment(loader=FileSystemLoader('templates'))

class Gesture(db.Model):
        name = db.StringProperty()
        structure = db.StringProperty()
        parameters = db.StringProperty()
        keyPoints  =db.StringProperty()

def gestureList_key():
        return db.Key.from_path('GestureList',"gestureKey")

class MainPage(webapp2.RequestHandler):
        def get(self):
                '''
                self.response.headers['Content-Type'] = 'text/csv'
                self.response.out.write(','.join("asdfghjgfdsasdfghjk"))
                self.response.headers['Content-Disposition'] = 'attachment; filename=%s' % 'styles.css'
                '''


                htmlString="""<!doctype html>
                <html>
                <head>
                <title>SandmanJS</title>
                <link rel="stylesheet" type="text/css" href="static/styles.css" />
                </head>
                <body id="body">
                <div id="header">SandmanJS</div>
                <ul id="menu">
                  <li id="home" class="menubar">Menu</li>
                  <li id="howItWorks" class="menubar">How this it work?</li>
                  <li id="about" class="menubar">About Us</li>
                </ul>
                <div id="wrapper">
                <div id="creator">
                <canvas id="canv">Hope you
                dont see this.</canvas>
                <br />
                <span style="padding: 20px;color:white">Draw Gesture; Then name it:<br />
                Name: </span><input type="text" name="gestureName" id="gestureName" /><br />
                <button id="createButton" >Create</button >



<form id = "downloadForm" enctype="application/json;charset=UTF-8" action="/download" method="post" onsubmit="Sandman.downloadLibrary()">

                <input type="submit" style="border-radius:5px;" id="downloadButton"  value ="Download" />
<input type="hidden" id="json" value="" name="json" ></input>
</form>
   </div>
<div id="gesturesList">
                """


                htmlString = htmlString + """
</div>
</div>
</body>
<script src="static/sandman.js">

</script>
<script>

  window.onload=function () {

  Sandman.doFirst("canv");
var gestObj;
var newDiv;
var divCanvas;
 """



                gestures = db.GqlQuery("SELECT * FROM Gesture")
                i=0;
                jsonObj = None
                if(gestures.count >0):
                        for g in gestures:
                                htmlString = htmlString+ """
newDiv = document.createElement ('div');
newDiv.setAttribute ('class','predefined');
newDiv.setAttribute ('id','div"""+ g.name+ """');
document.getElementById ('gesturesList').appendChild (newDiv);

divCanvas = document.createElement ('canvas');
divCanvas.setAttribute ('id','"""+ g.name+ """');

divCanvas.setAttribute ('class','smallCanv');
document.getElementById ('div"""+ g.name+ """').innerHTML = '"""+ g.name+ """'+"<br />";
document.getElementById ('div"""+ g.name+ """').appendChild (divCanvas);
  Sandman.drawGesture ('"""+ g.name+ """', """+ g.structure+ """ );


Sandman.gestures[Sandman.gestures.length] = {name:'"""+ g.name+ """',selected:0 };
document.getElementById('div""" +g.name+ """' ).addEventListener("click", function () {var ptr = Sandman.clicked('div"""+ g.name+ """');
if (Sandman.gestures[ptr].selected===1) {
this.style.background="#404040";
 Sandman.gestures [ptr].selected=0;
} else if (Sandman.gestures[ptr].selected===0) {

this.style.background="maroon";
 Sandman.gestures [ptr].selected=1;
}

}, false);



"""
                                i=i+1
                htmlString = htmlString + """



  }
  function defaultFunc() {

  }
</script>
</html>
"""
                self.response.out.write(htmlString)

        def post(self):
                jsonObj = json.loads(self.request.body)
                self.response.out.write(json.dumps(jsonObj))
                '''

                template = jinja_environment.get_template('main.html')
                self.response.out.write(template.render())
                '''

                gesture = Gesture(parent = gestureList_key())
                gesture.name = jsonObj['name']
                gesture.keyPoints = str(jsonObj['keyPoints'])
                gesture.structure = str(jsonObj['structure'])
                gesture.parameters = jsonObj['parameters']
                gesture.put()

class DownloadPage(webapp2.RequestHandler):

         def post(self):
                jsonObj = json.loads(urllib.unquote(self.request.get("json")))



                downloadFile = '''var Sandman = {
  context: null,
  gesture: null,
  gestPtr: null,
  keyPoints: [],
domElements:null,
  scrollX:0,
  scrollY:0,
  isTouchDevice:0,
  drawDiv: null,
  currentGesture: [],
  imageData: null,
  drawRatioX: document.body.scrollLeft,
  drawRatioY:document.body.scrollTop,
  currentParameters: [],
  gestures: [],
  domElement: null,
  set: null,
  //No. of points to represent each  gesture
  samplePoints: 32,
  gestureArray: [
'''


                setArray = []
                counter=0
                flag=0
                gestures = db.GqlQuery("SELECT * FROM Gesture")
                for j in jsonObj["namesList"]:
                        for g in gestures:
                                if(j == g.name):
                                        struc = g.structure[1:]
                                        downloadFile = downloadFile + '''\n
                                        {name:"''' +g.name+'''",points:['''+struc[:-1]+'''],keyPoints:'''+g.keyPoints+'''},'''
                                        flag=0
                                        for s in setArray:
                                                if(s[0] == g.parameters):
                                                        s[1] = s[1] + str(counter)+","
                                                        flag = 1
                                        if(flag == 0):
                                                setArray.append([g.parameters,"["+str(counter)+","])
                                        counter=counter+1
                                        break

                downloadFile = downloadFile[:-1]
                downloadFile = downloadFile + "],"

                for s in setArray:
                        downloadFile = downloadFile + s[0]+":"+s[1][:-1] +"],"



                self.response.out.write(downloadFile)
                template = jinja_environment.get_template('sandmanDownload.js')
                self.response.out.write(template.render())

                '''
                l = str(jsonObj['namesList'][0]
                '''
                self.response.headers['Content-Type'] = 'text/csv'
                self.response.headers['Content-Disposition'] = 'attachment; filename=%s' % "sandman.js"


app = webapp2.WSGIApplication([('/', MainPage),('/download',DownloadPage)],
                              debug=True)
