var express = require('express');
var router = express.Router();

// Have you lived abroad?
router.get('/have-you-lived-abroad', function(req, res) {
  res.render('ovsea-test/have-you-lived-abroad');
});

router.post('/have-you-lived-abroad', function(req, res) {
  if ( req.body['lived-outside-select'] === 'Yes' ) {
    res.redirect('what-countries-have-you-lived-in');
  } else {
    res.redirect('have-you-worked-abroad');
  }
});

// Have you worked abroad?
router.get('/have-you-worked-abroad', function(req, res) {
  res.render('ovsea-test/have-you-worked-abroad');
});

router.post('/have-you-worked-abroad', function(req, res) {
  if ( req.body['worked-outside-select'] === 'Yes' ) {
    res.redirect('what-countries-have-you-worked-in');
  } else {
    res.redirect('/');
  }
});

// Which countries have you lived in?
router.get('/what-countries-have-you-lived-in', function(req, res) {
  res.render('ovsea-test/what-countries-have-you-lived-in');
});

router.post('/what-countries-have-you-lived-in', function(req, res) {
  var countries = [];

  for ( var country in req.body ) {
    countries.push(req.body[country]);
  }
  res.cookie('c-lived-count', countries.length);
  res.cookie('c-lived-list', countries);

  res.redirect('tell-us-about-lived');
});

// Tell us about the country?
router.get('/tell-us-about-lived', function(req, res) {
  var countries = req.cookies['c-lived-list'];
  var country = countries.shift();

  res.render('ovsea-test/tell-us-about-lived', {country: country});
});

router.post('/tell-us-about-lived', function(req, res) {
  var countries = req.cookies['c-lived-list'];
  var country = '';
  if ( countries !== undefined ) {
    country = countries.shift();
  }
  res.cookie('c-lived-count', countries.length);
  res.cookie('c-lived-list', countries);

  if ( countries.length > 0 ) {
    res.redirect('tell-us-about-lived');
  } else {
    res.redirect('have-you-worked-anywhere-else');
  }
});

// Have you worked anywhere else?
router.get('/have-you-worked-anywhere-else', function(req, res) {
  res.render('ovsea-test/have-you-worked-anywhere-else');
});

router.post('/have-you-worked-anywhere-else', function(req, res) {
  if ( req.body['worked-outside-select'] === 'Yes' ) {
    res.redirect('what-countries-have-you-worked-in');
  } else {
    res.redirect('/');
  }
});

// Which countries have you worked in?
router.get('/what-countries-have-you-worked-in', function(req, res) {
  res.render('ovsea-test/what-countries-have-you-worked-in');
});

router.post('/what-countries-have-you-worked-in', function(req, res) {
  var countries = [];

  for ( var country in req.body ) {
    countries.push(req.body[country]);
  }
  res.cookie('c-worked-count', countries.length);
  res.cookie('c-worked-list', countries);

  res.redirect('tell-us-about-worked');
});

// Tell us about the country you worked in?
router.get('/tell-us-about-worked', function(req, res) {
  var countries = req.cookies['c-worked-list'];
  var country = '';
  if ( countries !== undefined ) {
    country = countries.shift();
  }

  res.render('ovsea-test/tell-us-about-worked', {country: country});
  });

router.post('/tell-us-about-worked', function(req, res) {
  var countries = req.cookies['c-worked-list'];
  var country = '';
  if ( countries !== undefined ) {
    country = countries.shift();
  }

  res.cookie('c-worked-count', countries.length);
  res.cookie('c-worked-list', countries);

  if ( countries.length > 0 ) {
    res.redirect('tell-us-about-worked');
  } else {
    for (var cookie in req.cookies) {
      if ( cookie !== 'seen_cookie_message' ) {
        res.clearCookie(cookie);
      }
    }
    res.redirect('/');
  }
});


module.exports = router;
