module.exports = function(app, passport) {

    // =====================================
    // Index PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.handlebars', {title: 'Index'}); // load the index.handlebars file
    });

    // =====================================
    // HOME PAGE ===========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.handlebars', {
            title: 'Home'
        });
    });

    // =====================================
    // TOP LEFT INFO =======================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/layout', isLoggedIn, function(req, res) {
        user : req.user;
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.handlebars', { message: req.flash('loginMessage'), title: 'Login' }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.handlebars', { message: req.flash('signupMessage'), title: 'Signup' });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.handlebars', {
            user : req.user, // get the user out of session and pass to template
            title: 'Profile'
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // STAT PAGE ===========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/stats', isLoggedIn, function(req, res) {
        res.render('stats.handlebars', {
            title: 'Detailed Stats'
        });
    });

    // =====================================
    // DATA ANALYSIS =======================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/daan', isLoggedIn, function(req, res) {
        res.render('daan.handlebars', {
            title: 'Data Analysis'
        });
    });

    // =====================================
    // MAQM ================================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/maqm', isLoggedIn, function(req, res) {
        res.render('maqm.handlebars', {
            title: 'Manual AQM'
        });
    });

    // =====================================
    // KANBAN BOARD ========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/kanban', isLoggedIn, function(req, res) {
        res.render('kanban.handlebars', {
            title: 'Kanban Board'
        });
    });

    // =====================================
    // NEWS BOARD ==========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/newsboard', isLoggedIn, function(req, res) {
        res.render('newsboard.handlebars', {
            title: 'News Board'
        });
    });

    // =====================================
    // NEWSLETTER ==========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/newsletter', isLoggedIn, function(req, res) {
        res.render('newsletter.handlebars', {
            title: 'Newsletter'
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}