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

// Which countries have you lived in?
router.get('/what-countries-have-you-lived-in', function(req, res) {
  res.render('ovsea-test/what-countries-have-you-lived-in');
});

router.post('/what-countries-have-you-lived-in', function(req, res) {
  res.redirect('tell-us-about');
});

// Tell us about the country?
router.get('/tell-us-about', function(req, res) {
  res.render('ovsea-test/tell-us-about');
});

router.post('/tell-us-about', function(req, res) {
  res.redirect('have-you-worked-anywhere-else');
});

// Have you worked abroad?
router.get('/have-you-worked-anywhere-else', function(req, res) {
  res.render('ovsea-test/have-you-worked-anywhere-else');
});

router.post('/have-you-worked-anywhere-else', function(req, res) {
  res.redirect('/');
});

// Have you worked anywhere else?
router.get('/have-you-worked-anywhere-else', function(req, res) {
  res.render('ovsea-test/have-you-worked-anywhere-else');
});

router.post('/have-you-worked-anywhere-else', function(req, res) {
  res.redirect('/');
});


module.exports = router;
