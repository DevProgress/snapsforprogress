/**
    Run with npm start

    Whenever this file changes, you must stop and restart the server to pick up changes:
        Type Ctrl-C to stop, then type npm start to restart.
*/
var nunjucks = require("nunjucks");
var lessMiddleware = require('less-middleware'); // TODO get this working
var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));  // For our CSS, images, and Javascript

// Strip trailing space for pngs
app.use(function(req, res, next) {
   if(req.url.substr(-1) == "/" && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

// See http://stackoverflow.com/questions/19912389/how-to-use-html-in-express-framework-with-nunjucks-no-jade for examples
nunjucks.configure("templates", {
  // Do some configuration
  autoescape: true,
  watch: true,
  nocache: true,
  express: app
});

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( "html", nunjucks.render ) ;
app.set( "view engine", "html" ) ;

app.get("/", function(request, response) {
  response.render("index.html");
});

app.get( "/:page.html", function(request, response) {
    response.render(request.params.page + ".html");
});

app.listen(app.get("port"), function() {
  console.log("We're up and running! Open localhost:" + app.get("port") + " in your browser." +
    "\nBe sure to stop (Ctrl-C) and rerun this command whenever you add new files or change the index.js code.");
});
