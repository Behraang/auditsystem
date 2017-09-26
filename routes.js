
'use strict';

var express = require('express');
var router = express.Router();
var models = require('./models');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


// router.get('/', function(req, res, next) {
//   var options = {
//     order: [['createdAt', 'DESC']]
//   };
//   models.Audit.findAll(options)
//   .then(function(audits) {
//     //console.log(typeof(audits));
//     res.render('index', {
//       audits: audits
//     });
//   }, function(err) {
//     next(err);
//   });
// });

/* GET index page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('response');
    collection.find({},{},function(e,audits){
        res.render('', {
            audits : audits
        });
    });
});



router.get('/create', function(req, res, next) {
  res.render('upsert');
});

router.get('/edit/:id', function(req, res, next) {
  models.Audit.findById(req.params.id).then(function(audit) {
    if (audit) {
      res.render('upsert', {
        audit: audit
      });
    } else {
      next(new Error('Audit not found: ' + req.params.id));
    }
  });
});

router.get('/delete/:id', function(req, res, next) {
  models.Audit.findById(req.params.id)
    .then(function(audit) {
      if (!audit) {
        throw new Error('Audit not found: ' + req.params.id);
      }
      return audit.destroy();
    })
    .then(function() {
      res.redirect('/');
    }, function(err) {
      next(err);
    });
});


// router.post('/upsert', function(req, res, next) {
//   models.Audit.upsert(req.body).then(function() {
//     res.redirect('/');
//   }, function(err) {
//     next(err);
//   });
// });

router.post('/upsert', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    
    var username = req.body.username;
    var advertiser = req.body.advertiser_name;
    var locale = req.body.locale;
    var environment = req.body.environment;
    var a1 = req.body.q1;
    var a2 = req.body.q2;
    var a3 = req.body.q3;


    // Set our collection
    var collection = db.get('response');
    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });

    // Submit to the DB
    // collection.insert({
    //     "survey_v": "1.0",
    //     "timestamp" : new Date(),
    //     "username": username,
    //     "adv_name" : advertiser,
    //     "locale": locale,
    //     "environment": environment,
    //     "question": [{"number": "1", "answer": a1}, {"number": "2", "answer": a2}, {"number": "3", "answer": a3}]
    // }, function (err, doc) {
    //     if (err) {
    //         // If it failed, return error
    //         res.send("There was a problem adding the information to the database.");
    //     }
    //     else {
    //         // And forward to success page
    //         res.redirect("/");
    //     }
    // });
});

// Search result page
router.get('/search/', function(req, res, next) {
  var options = {
    where: 
    {
      $or:
      [
        { advertiser_name: req.query.q},
        { username: req.query.q },
        { advertiser_id: req.query.q },
        { environment: req.query.q }
      ]
    }
  };
  models.Audit.findAll(options)
  .then(function(results) {
    results.q = req.query.q;
    res.render('search', {
      results: results
    });
  }, function(err) {
    next(err);
  });
});

// Stats
router.get('/stats', function(req, res, next) {
  res.render('stats');
});

// Data Analysis
router.get('/daan', function(req, res, next) {
  res.render('daan');
});

// MAQM
router.get('/maqm', function(req, res, next) {
  res.render('maqm');
});

//Kanban Board
router.get('/kanban', function(req, res, next) {
  res.render('kanban');
});

//Newsboard
router.get('/newsboard', function(req, res, next) {
  res.render('newsboard');
});

// Newsletter
router.get('/newsletter', function(req, res, next) {
  res.render('newsletter');
});

// Help
router.get('/help', function(req, res, next) {
  res.render('help');
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,users){
        res.render('userlist', {
            users : users
        });
    });
});

// to just load the page
router.get('/adduser', function(req, res, next) {
  res.render('adduser');
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    // Set our collection
    var collection = db.get('user');

    // Submit to the DB
    collection.insert({
        "name" : {"firstName":firstName, "lastName":lastName},
        "username":username,
        "email" : email,
        "password": password,
        "role": "tester"

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});




module.exports = router;
