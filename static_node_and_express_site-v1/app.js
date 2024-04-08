const express = require('express'); //good
const bodyParser = require('body-parser'); //good
const projects = require('./data.json'); 

const app = express(); //good

app.use(bodyParser.urlencoded({extended: false})); //good


app.set('view engine', 'pug'); //good 
app.use('/static', express.static('public')); //good

// set your routes 
//----------------
// index to render the home page with locals set to data.projects
app.get('/', (req, res, next) => {
    res.render('index', {projects});
});

// about to render the about page 
app.get('/about', (req, res, next) => {
    res.render('about');
});

// project (5 based on the ID's) to render a page for each project 

app.get('/project', (req, res, next) => {
    res.render('project');
});

//-----------------
// listen on port 3000 
// log a string to the console stating which port it's listening to 
app.listen(3000, () => {
    console.log('This application is running on localhost:3000!')
}); // good

//-----------------
// handle errors
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(res.status(err.status));
  });  