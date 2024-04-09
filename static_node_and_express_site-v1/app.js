const express = require('express');
const bodyParser = require('body-parser'); 
const {projects} = require('./data.json'); 

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug'); 
app.use('/static', express.static('public'));

// set routes 
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
app.get('/projects/:id', (req, res, next) => {
    const project = projects.find(({id}) => id === +req.params.id);

    if (project) {
        res.render('project', {project});
    } else {
        res.render('error');   
    } 
});

//-----------------
// handle errors
app.use((req, res, next) => {
    const err = new Error('Oops! No luck finding that page...');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status)
    res.render('page-not-found');
  });  

//-----------------
// listen on port 3000 
// log a string to the console stating which port it's listening to 
app.listen(3000, () => {
    console.log('This application is running on localhost:3000!')
});