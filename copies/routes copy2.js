
'use strict';

var express = require('express');
var router = express.Router();
var models = require('./models');
var Sequelize = require('sequelize');

// TODO: Show spreadsheets on the main page.
router.get('/', function(req, res, next) {
  var options = {
    order: [['createdAt', 'DESC']]
  };
  models.Audit.findAll(options)
  .then(function(audits) {
    res.render('index', {
      audits: audits
    });
  }, function(err) {
    next(err);
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


router.post('/upsert', function(req, res, next) {
  models.Audit.upsert(req.body).then(function() {
    res.redirect('/');
  }, function(err) {
    next(err);
  });
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





module.exports = router;
