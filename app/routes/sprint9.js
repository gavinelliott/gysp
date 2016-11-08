var express = require('express');
var router = express.Router();
var get_countries = require('../views/sprint9/scripts/countries.js');

var forceFail = true;

// Secure page with invite code
router.get('/secure', function(req, res) {
  res.render('sprint9/secure');
});

router.post('/secure', function(req, res) {
  res.locals.error = true;

  if ( req.cookies.sp3_fail_attempts ) {
    res.cookie('sp3_fail_attempts', 0);
  }

  if (req.body.reference.toLowerCase() === 'EDMO435HN3'.toLowerCase()) {
    res.redirect('/sprint9/dob-check?fail=true');
  } else {
    res.redirect('/sprint9/dob-check');
  }
});

router.post('/secure', function(req, res) {
  res.locals.error = true;

  if ( req.cookies.sp3_fail_attempts ) {
    res.cookie('sp3_fail_attempts', 0);
  }

  if ((req.body.reference.replace(/\s/g, "") === "EDMO435HN3" || req.body.reference.replace(/\s/g, "").toLowerCase() === "qyx5ychpnrjv")) {
    req.session.view = null;
    res.redirect("unhappy-ending");
  } else {
    req.session.view++;

    if (req.session.view > 2) {
      res.redirect("unhappy-ending");
    } else {
      res.render('sprint9/secure');
    }
  }
});

// DOB check
router.post('/dob-check', function(req, res) {
  if (req.query.fail) {
    res.redirect('dob-fail');
  } else {
    res.redirect('pension-age');
  }
});

// Have you ever lived outside the UK?
router.get('/have-you-lived-abroad', function(req, res) {
  res.render('sprint9/have-you-lived-abroad');
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
  res.render('sprint9/what-countries-have-you-lived-in');
});

router.post('/what-countries-have-you-lived-in', function(req, res) {
  var countries = [];

  for ( var country in req.body ) {
    countries.push(req.body[country].toLowerCase());
  }
  res.cookie('c-lived-count', countries.length);
  res.cookie('c-lived-list', countries);
  res.cookie('c-lived-all', countries);
  res.cookie('c-lived-step', 1);

  res.redirect('tell-us-about-lived');
});

// Tell us about the country?
router.get('/tell-us-about-lived', function(req, res) {
  var countries = req.cookies['c-lived-list'];
  var all_countries = req.cookies['c-lived-all'];
  var resident = get_countries.resident();
  var insurance = get_countries.insurance();

  if ( countries.length === 0 ) {
    res.redirect('what-countries-have-you-lived-in');
  } else {
    for ( var c in all_countries ) {
      if ( resident.indexOf(all_countries[c]) < 0 && insurance.indexOf(all_countries[c]) < 0 ) {
        delete all_countries[c];
      }
    }

    var step = {'on': req.cookies['c-lived-step'], 'of': Object.keys(all_countries).length};

    var country = countries.shift();
    var countryType = get_countries.type(country);

    if ( countryType.resident || countryType.insurance ) {
      res.render('sprint9/tell-us-about-lived', {country: country, countryType: countryType, step: step});
    } else {
      res.cookie('c-lived-count', countries.length);
      res.cookie('c-lived-list', countries);

      if ( countries.length > 0 ) {
        res.redirect('tell-us-about-lived');
      } else {
        res.redirect('have-you-worked-abroad');
      }
    }
  }
});

router.post('/tell-us-about-lived', function(req, res) {
  if ( req.body['worked-outside-select'] == 'Yes' ) {
    res.cookie('equiv_nino', 'yes');
  } else {
    res.cookie('equiv_nino', 'no');
  }

  var countries = req.cookies['c-lived-list'];
  var country = '';
  var step = req.cookies['c-lived-step'];
  step++;

  if ( countries !== undefined ) {
    country = countries.shift();
  }
  res.cookie('c-lived-count', countries.length);
  res.cookie('c-lived-list', countries);
  res.cookie('c-lived-step', step);

  if ( countries.length > 0 ) {
    res.redirect('tell-us-about-lived');
  } else {
    res.redirect('have-you-worked-abroad');
  }
});

// Have you worked abroad?
router.get('/have-you-worked-abroad', function(req, res) {
  var equiv_nino = req.cookies.equiv_nino;
  var title = '';

  if ( equiv_nino == 'yes' ) {
    title = 'Have you worked anywhere else outside of the UK?';
  } else {
    title = 'Have you worked outside of the UK?';
  }
  res.render('sprint9/have-you-worked-abroad', {title: title});
});

router.post('/have-you-worked-abroad', function(req, res) {
  if ( req.body['worked-outside-select'] === 'Yes' ) {
    res.redirect('what-countries-have-you-worked-in');
  } else {
    res.redirect('relationship-status');
  }
});

// Which countries have you worked in?
router.get('/what-countries-have-you-worked-in', function(req, res) {
  res.render('sprint9/what-countries-have-you-worked-in');
});

router.post('/what-countries-have-you-worked-in', function(req, res) {
  var countries = [];

  for ( var country in req.body ) {
    countries.push(req.body[country].toLowerCase());
  }
  res.cookie('c-worked-count', countries.length);
  res.cookie('c-worked-list', countries);
  res.cookie('c-worked-all', countries);
  res.cookie('c-worked-step', 1);

  res.redirect('tell-us-about-worked');
});

// Tell us about the country you worked in?
router.get('/tell-us-about-worked', function(req, res) {
  var countries = req.cookies['c-worked-list'];
  var all_countries = req.cookies['c-worked-all'];
  var resident = get_countries.resident();
  var insurance = get_countries.insurance();

  if ( countries.length === 0 ) {
    res.redirect('what-countries-have-you-worked-in');
  } else {
    for ( var c in all_countries ) {
      if ( resident.indexOf(all_countries[c]) < 0 && insurance.indexOf(all_countries[c]) < 0 ) {
        delete all_countries[c];
      }
    }

    var step = {'on': req.cookies['c-worked-step'], 'of': Object.keys(all_countries).length};

    var country = '';
    if ( countries !== undefined ) {
      country = countries.shift();
    }
    var countryType = get_countries.type(country);

    if ( countryType.insurance ) {
      res.render('sprint9/tell-us-about-worked', {country: country, step: step});
    } else {
      res.cookie('c-worked-count', countries.length);
      res.cookie('c-worked-list', countries);

      if ( countries.length > 0 ) {
        res.redirect('tell-us-about-worked');
      } else {
        res.redirect('relationship-status');
      }
    }
  }
});

router.post('/tell-us-about-worked', function(req, res) {
  var countries = req.cookies['c-worked-list'];
  var country = '';
  var step = req.cookies['c-worked-step'];
  step++;

  if ( countries !== undefined ) {
    country = countries.shift();
  }

  res.cookie('c-worked-count', countries.length);
  res.cookie('c-worked-list', countries);
  res.cookie('c-worked-step', step);
  if ( countries.length > 0 ) {
    res.redirect('tell-us-about-worked');
  } else {
    res.redirect('relationship-status');
  }
});

// Relationship Status
router.all('/relationship-status', function(req, res) {
  if (req.body.relationship === "Never been married") {
    res.redirect("contact");
  } else if ( req.body.relationship === "Married" ||
              req.body.relationship === "Divorced" ||
              req.body.relationship === "Civil" ||
              req.body.relationship === "Dissolved") {

    res.redirect("relationship-status-date/" + req.body.relationship);
  } else if ( req.body.relationship === "Widowed" ) {
    res.redirect("relationship-status-more/" + req.body.relationship);
  } else {
    res.render('sprint9/relationship-status');
  }
});

// Relationship date
router.all('/relationship-status-date/:type', function(req, res) {
  if (req.body.submit === "Continue") {
    res.redirect("/sprint9/relationship-status-more/"+req.params.type);
  }else{
    var isMarried = false,
        isEnded = false;

    if (req.params.type == "Married" || req.params.type == "Civil") {
      isMarried = true;
    }

    if (req.params.type == "Divorced" || req.params.type == "Widowed") {
      isEnded = true;
    }

    var eventText = "";

    switch (req.params.type) {
      case "Married":
        eventText = "When did you get married?";
        break;
      case "Civil":
        eventText = "What date was your civil partnership registered?";
        break;
      case "Divorced":
        eventText = "What date did you get divorced?";
        break;
      case "Dissolved":
        eventText = "What date was your civil partnership dissolved?";
        break;
      case "Widowed":
        eventText = "What date were you widowed?";
        break;
    }
    res.render('sprint9/relationship-status-date', {
      eventText: eventText,
      type: req.params.type,
      isEnded: isEnded,
      isMarried: isMarried
    });
  }
});

// Relationship status more
router.all('/relationship-status-more/:type', function(req, res) {
  if (req.body.submit === "Continue") {
    res.redirect("/sprint9/contact");
  }else{
    var isMarried = false,
        isEnded = false,
        widowed = false;

    if (req.params.type == "Married" || req.params.type == "Civil") {
      isMarried = true;
    }

    if (req.params.type == "Divorced" || req.params.type == "Widowed") {
      isEnded = true;
    }

    if (req.params.type == "Widowed") {
      widowed = true;
    }

    var pageHeader = "";

    switch (req.params.type) {
      case "Married":
        pageHeader = "About your spouse";
        break;
      case "Civil":
        pageHeader = "About your civil partner";
        break;
      case "Divorced":
        pageHeader = "About your ex-spouse";
        break;
      case "Dissolved":
        pageHeader = "About your ex-partner";
        break;
      case "Widowed":
        pageHeader = "About your late spouse";
        break;
    }

    res.render('sprint9/relationship-status-more',{type: req.params.type,pageHeader: pageHeader,isEnded: isEnded, isMarried: isMarried, widowed: widowed });
  }
});

// Contact page
router.get('/contact', function(req, res) {
  res.render('sprint9/contact');
});

router.post('/contact', function(req, res) {
  res.redirect('bank-details');
});

// Bank details
router.get('/bank-details', function(req, res) {
  res.render('sprint9/bank-details');
});

router.post('/bank-details', function(req, res) {
  var fields = req.body,
      fieldLimit = get_field_limit(req),
      blank_fields = get_blank_fields(req),
      fail_attempts = get_fail_attempts(req);

  for (var object in fields) {
    if ( fields[object] === '') {
      blank_fields++;
    }
  }

  blank_fields = blank_fields - fieldLimit;

  if ( blank_fields === 0 && forceFail === false) {
    res.redirect('declaration');
  } else {
    fail_attempts++;
    res.cookie('sp3_fail_attempts', fail_attempts);
    if ( fail_attempts >= 2 ) {
      res.redirect('cant-continue');
    } else {
      var errors = {
        'title':"There's a problem",
        'text':"Check that you've entered your bank account details correctly.",
        'bank_type': req.body.building
      };
      res.render('sprint9/bank-details', {errors: errors});
    }
  }
});

router.get('/unhappy-ending', function(req, res) {
  req.session.view = null;
  res.render('sprint9/unhappy-ending');
});

router.get('/end', function(req, res) {
  var completeDate = get_todays_date();

  res.render('sprint9/end', {completeDate: completeDate});
});

router.get('/download', function(req,res){
  res.download('./public/images/download.pdf', 'download.pdf');
});

router.get('/reset', function(req, res) {
  for (var cookie in req.cookies) {
    if ( cookie !== 'seen_cookie_message' ) {
      res.clearCookie(cookie);
    }
  }
  res.redirect('/');
});

router.get('/settings', function(req, res) {
  res.render('sprint9/settings');
});

router.post('/settings', function(req, res) {
  var settings = {
    "day": req.body['spa-day'],
    "month": req.body['spa-month'],
    "year": req.body['spa-year']
  };
  res.cookie("options", settings);
  res.redirect('start');
});

module.exports = router;


function get_fail_attempts(req) {
  if ( req.cookies.sp3_fail_attempts ) {
    fail_attempts = req.cookies.sp3_fail_attempts;
  } else {
    fail_attempts = 0;
  }
  return fail_attempts;
}

function get_field_limit(req) {
  var fieldLimit;
  if ( req.body.building == 'bank' ) {
    fieldLimit = 5;
  } else  if ( req.body.building == 'building' ) {
    fieldLimit = 6;
  }
  return fieldLimit;
}

function get_blank_fields(req) {
  var blank_fields = 0;
  if ( req.body.building == 'bank' ) {
    blank_fields--;
  } else  if ( req.body.building == 'building' ) {
    blank_fields++;
  }
  return blank_fields;
}

// Get todays date and format it in nth format
function get_todays_date() {
  var date    = new Date(),
      monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ],
      day     = date.getDate(),
      month   = date.getMonth(),
      year    = date.getFullYear(),
      suffix  = get_nth_suffix(day);
      date = day + ' ' + monthNames[month] + ' ' + year;

  return date;

  function get_nth_suffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
      case 23:
        return 'rd';
      default:
        return 'th';
    }
  }
}
