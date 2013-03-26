import logging
import cgi
import urllib
import urllib2
import webapp2
import json


from google.appengine.ext import db
from jinja2 import Environment, PackageLoader , FileSystemLoader

jinja_environment = Environment(loader=FileSystemLoader('templates'))

class delete1(webapp2.RequestHandler):
        def get(self):
                gestures1 = db.GqlQuery("SELECT * FROM Gesture where preDef=False")
                for g in gestures1:
                        g.delete()

class Gesture(db.Model):
        name = db.StringProperty()
        structure = db.StringProperty()
        parameters = db.StringProperty()
        keyPoints  =db.StringProperty()
        preDef =db.BooleanProperty()

def gestureList_key():
        return  db.Key.from_path("userDefList","userDefKey")


class MainPage(webapp2.RequestHandler):
        def get(self):
                gestures1 = db.GqlQuery("SELECT * FROM Gesture where preDef=False")
                for g in gestures1:
                        g.delete()

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
                <a href="https://github.com/project47/gesturelibrary"><img style="position: absolute; top: 0; right: 0; border: 0;" src="static/forkme.png" alt="Fork me on GitHub"></a>
                <div id="header">SandmanJS</div>
                <div id="helpPage"><br />Step 1: Draw a gesture in the white box.<br />Step 2: Name the gesture and click on create to add it to the list. The name should be just like a function's name (no special characters or spaces or javascript keywords)<br />Step 3: Select the gestures you want by clicking on them and click on download JS file button<br />Step 4: Include file in your working dir and add following to your html:<br /><br />&#60;script src=" path to sandman.js file "&#62;&#60;/script&#62;<br /><br />Step 5: Write functions with the same names as those of the gestures. When a gesture is detected, the library calls a function with the same name as that of the gesture.<br /><br />eg: if you name a gesture "myGesture", then function "myGesture()" will be called when it is detected.<br />                </div>
                <div id="aboutPage">We are: <br /><br />Partha Veerkar - partha.veerkar@gmail.com<br />Ajay Nair - ajaynair59@gmail.com<br />Anuj Gandhi - anujvgandhi@gmail.com<br />Shreyas Panigrahi - shreyaspanigrahi@gmail.com<br /><br />Our guides:<br /><br />Prof. Mukta Takalikar<br />Prajwalit Bhopale<br />Kiran Kulkarni</div>
                <ul id="menu">
                <li id="home" class="menubar">Creator</li>
                <li id="howItWorks" class="menubar">How does it Work?</li>
                <li id="about" class="menubar">About Us</li>
                </ul>
                <div id="wrapper">
                <canvas id="canv">Hope you
                dont see this.</canvas>
                <br />
                Draw Gesture; Then name it:<br />
                Name: <input type="text" name="gestureName" id="gestureName" /><br />
                <button id="createButton" >Create</button ><br />
                The box clears itself when you start drawing a new gesture



<form id = "downloadForm" enctype="application/json;charset=UTF-8" action="/download" method="post" onsubmit="sandman.downloadLibrary()">
                <input type="submit" id="downloadButton"  value ="Download" />
<input type="hidden" id="json" value="" name="json" ></input>
</form>

<div id="gesturesList">
                """


                htmlString = htmlString + """
</div>
<div id="temp" ></div>
</div>
</body>
<script src="static/sandman.js">

</script>
<script>

  window.onload=function () {

  sandman.doFirst("canv");
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
  sandman.drawGesture ('"""+ g.name+ """', """+ g.structure+ """ );


sandman.gestures[sandman.gestures.length] = {name:'"""+ g.name+ """',selected:0 };
document.getElementById('div""" +g.name+ """' ).addEventListener("click", function () {var ptr = sandman.clicked('div"""+ g.name+ """');
if (sandman.gestures[ptr].selected===1) {
this.style.background="#404040";
 sandman.gestures [ptr].selected=0;
} else if (sandman.gestures[ptr].selected===0) {

this.style.background="#FF0000";
 sandman.gestures [ptr].selected=1;
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
                gesture.preDef=False
                gesture.put()

class DownloadPage(webapp2.RequestHandler):

         def post(self):
                jsonObj = json.loads(urllib.unquote(self.request.get("json")))

                downloadFile = '''var sandman = {
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
