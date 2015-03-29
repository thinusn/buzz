var express = require('express')

var router = express.Router();


/**
 * All pages
 */
    router.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

/**
 * GET home page.
 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'D3' });
});

router.post('/login', function(req, res, next) {
    res.render('index', { title: 'D3' });
});


router.get('/spaces',  isLoggedIn, function(req, res) {
    res.render('spaces', { title: 'D3', content: 'spaces' });
});

router.param("moduleCode", function (req, res, next, moduleCode) {
    console.log("Validating " + moduleCode);
    next();
})
router.param("threadID", function (req, res, next, threadID) {
    console.log("Validating 2+" + threadID);
    next();
})
router.get('/spaces/:moduleCode', isLoggedIn, function (req, res) {
    res.render('threads', {title: 'D3', content: 'This is the module code for a thread'});
});
router.get('/spaces/:moduleCode/:threadID', isLoggedIn, function (req, res) {
    res.render('index', {title: 'D3', content: 'index'});
});
/*
 * This function will route through the isLoggedIn function before sending the page
 */
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', { title: 'D3', content: 'Profile & Settings' });
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("In function isLoggedIn: \tREQ:");
    console.log(req.body);
    // if user is authenticated in the session, carry on
    if (req)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
