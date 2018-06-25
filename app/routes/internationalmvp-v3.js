var express = require('express');
var router = express.Router();
var get_countries = require('../views/internationalmvp-v3/scripts/countries.js');
var {differenceInWeeks} = require('date-fns');

var forceFail = false;

// date of payment up to or over 9 weeks
router.post('/pensiondate', function(req, res) {
  if ( req.body['pension-date'] === 'before' ) {
    res.redirect('letter');
  } else {
    res.redirect('laterdate2');
  }
});

// verify or invitation code
router.post('/letter', function(req, res) {
  if ( req.body['letter-verify'] === 'invitation code' ) {
    res.redirect('secure');
  } else {
    res.redirect('verify');
  }
});


// Secure page with invite code
router.get('/secure', function(req, res) {
  res.render('internationalmvp-v3/secure');
});

router.post('/secure', function(req, res) {
  res.locals.error = true;

  if ( req.cookies.sp3_fail_attempts ) {
    res.cookie('sp3_fail_attempts', 0);
  }

  if (req.body.reference.toLowerCase() === 'EDMO435HN3'.toLowerCase()) {
    res.redirect('/internationalmvp-v3/dob-check');
  } else {
    res.redirect('/internationalmvp-v3/dob-check');
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
      res.render('internationalmvp-v3/secure');
    }
  }
});

// State pension age, this date or another date?
router.post('/pension-age', function(req, res) {
  if ( req.body['date-select'] === 'date-yes' ) {
    res.redirect('have-you-lived-abroad');
  } else {
    res.redirect('deferral');
  }
});

router.post('/deferral', function(req, res) {
  // create variables from date entered in form
  const day = req.body['deferral-day'];
  const month = req.body['deferral-month'] - 1; // take 1 off the month because arrays start from 0
  const year = req.body['deferral-year'];

  // create date objects for deferral date and state pension age (new Date() takes values backwards, yyyy, mm, dd)
  const deferralDate = new Date(year, month, day); // create a date from day, month, year
  const statePensionDate = new Date(2017, 11, 09); // create a date for 09, 04, 2018 (take 1 off because arrays start from 0, so 1 is 0)

  // get the difference in weeks between deferral date and state pension date, returns a number eg 9
  const diffInWeeks = differenceInWeeks(deferralDate, statePensionDate)

  // if more than 17 weeks from state pension age
  if (diffInWeeks > 17) {
    res.redirect('tooearly');
  } else {
    // if 17 weeks or less add commit push
    res.redirect('have-you-lived-abroad');
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

// Which countries have you lived in?
router.get('/what-countries-have-you-lived-in', function(req, res) {
  res.render('internationalmvp-v3/what-countries-have-you-lived-in');
});

router.post('/what-countries-have-you-lived-in', function(req, res) {
  const countries = req.body['country-name'].slice(0);
  req.session.data.all_countries = countries;
  req.session.data.steps = req.body['country-name'].length;
  const country = req.session.data['country-name'].shift();
  res.redirect(`/internationalmvp-v3/tell-us-about-lived/${country}`);
});

router.post('/what-countries-have-you-worked-in', function(req, res) {
  const countries = req.body['country-name'].slice(0);
  req.session.data.all_countries = countries;
  req.session.data.steps = req.body['country-name'].length;
  const country = req.session.data['country-name'].shift();
  res.redirect(`/internationalmvp-v3/tell-us-about-worked`);
});

// Tell us about the country?
router.get('/tell-us-about-lived/:country', function(req, res) {
  const countries = req.session.data['country-name'] || {}
  const country = req.params.country;
  const stepTotal = req.session.data.steps;
  const stepRemaining = countries.length;
  const stepOn = stepTotal - stepRemaining;
  if (country === 'undefined') {
    res.redirect('/internationalmvp-v3/tell-us-about-worked');
  } else {
    res.render('internationalmvp-v3/tell-us-about-lived', {country, stepOn});
  }
});

router.post('/tell-us-about-lived/:country', function(req, res) {
  const repeat = req.body['lived-more'] === 'Yes';
  if (repeat)  {
    res.redirect(`/internationalmvp-v3/tell-us-about-lived/${req.params.country}`);
  } else {
    if (req.session.data['country-name'] !== undefined && req.session.data['country-name'].length > 0) {
      req.session.data['country-name'].shift();
    }
    res.redirect('/internationalmvp-v3/tell-us-about-worked');
  }
});

// Tell us about the country you worked in?
router.get('/tell-us-about-worked', function(req, res) {
  const allCountries = req.session.data.all_countries || [];
  const otherWorked = req.session.data['worked-anywhere-else'] === 'Yes' ? true : false;
  const insuranceCountries = require('../views/internationalmvp-v3/scripts/working-countries');

  if (allCountries.length > 0) {
    const country = allCountries[0];
    allCountries.shift();
    if (insuranceCountries.includes(country)) {
      if (otherWorked) {
        res.redirect(`/internationalmvp-v3/tell-us-about-worked/${country}`);
      } else {
        res.redirect(`/internationalmvp-v3/did-you-work-in/${country}`);
      }
    } else {
      const nextCountry = allCountries[0];
      if (otherWorked) {
        allCountries.shift();
        res.redirect(`/internationalmvp-v3/tell-us-about-worked/${nextCountry}`);
      } else {
        res.redirect(`tell-us-about-lived/${nextCountry}`);
      }
    }
  } else {
    if (otherWorked) {
      res.redirect('/internationalmvp-v3/relationship-status');
    } else {
      res.redirect(`/internationalmvp-v3/have-you-worked-anywhere-else/`);
    }
  }
});

router.get('/did-you-work-in/:country', function(req, res) {
  const country = req.params.country;
  res.render('internationalmvp-v3/did-you-work-in', {country});
});

router.post('/did-you-work-in/:country', function(req, res) {
  const country = req.params.country;
  if (req.body['did-you-work-in'] === 'Yes') {
    res.redirect(`/internationalmvp-v3/tell-us-about-worked/${country}`);
  } else {
    res.redirect(`/internationalmvp-v3/have-you-worked-anywhere-else/`);
  }
});

router.get('/tell-us-about-worked/:country', function (req, res) {
  const country = req.params.country;
  res.render('internationalmvp-v3/tell-us-about-worked', {country});
});

router.post('/tell-us-about-worked/:country', function (req, res) {
  const country = req.params.country;
  const repeat = req.body['worked-more'] === 'Yes';
  const otherWorked = req.session.data['worked-anywhere-else'] === 'Yes' ? true : false;
  if (repeat)  {
    res.redirect(`/internationalmvp-v3/tell-us-about-worked/${country}`);
  } else {
    if (otherWorked) {
      res.redirect('/internationalmvp-v3/tell-us-about-worked')
    } else {
      const allCountries = req.session.data.all_countries || [];
      const nextCountry = allCountries[0];
      res.redirect(`/internationalmvp-v3/tell-us-about-lived/${nextCountry}`);
    }
  }
});

router.get('/have-you-worked-anywhere-else', function (req, res) {
  res.render('internationalmvp-v3/have-you-worked-anywhere-else');
});

router.post('/have-you-worked-anywhere-else', function (req, res) {
  if (req.body['worked-anywhere-else'] === 'Yes') {
    res.redirect('/internationalmvp-v3/what-countries-have-you-worked-in');
  } else {
    res.redirect('/internationalmvp-v3/relationship-status');
  }
});

// Relationship Status
router.get('/relationship-status', function(req, res) {
    res.render('internationalmvp-v3/relationship-status');
})
router.post('/relationship-status', function(req, res) {
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
    res.redirect('contact');
  }
});

// Relationship date
router.all('/relationship-status-date/:type', function(req, res) {
  if (req.body.submit === "Continue") {
    res.redirect("/internationalmvp-v3/relationship-status-more/"+req.params.type);
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
        eventText = "What date did you get married?";
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
    res.render('internationalmvp-v3/relationship-status-date', {
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
    res.redirect("/internationalmvp-v3/contact");
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

    res.render('internationalmvp-v3/relationship-status-more',{type: req.params.type,pageHeader: pageHeader,isEnded: isEnded, isMarried: isMarried, widowed: widowed });
  }
});

// Contact page
router.get('/contact', function(req, res) {
  res.render('internationalmvp-v3/contact');
});

router.post('/contact', function(req, res) {
  res.redirect('bank-details');
});

// Bank details
router.get('/bank-details', function(req, res) {
  res.render('internationalmvp-v3/bank-details');
});

router.post('/bank-details', function(req, res) {

    res.redirect('overview');

});

router.get('/unhappy-ending', function(req, res) {
  req.session.view = null;
  res.render('internationalmvp-v3/unhappy-ending');
});

router.get('/end', function(req, res) {
  var completeDate = get_todays_date();

  res.render('internationalmvp-v3/end', {completeDate: completeDate});
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
  res.render('internationalmvp-v3/settings');
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

router.post('/letter', function(req, res) {
  if (req.body.letter === "Yes"){
    res.redirect('invitecode')
  } else {
    res.redirect('verify')
  }
})

// router.post('/letter', function(req, res) {
//   res.redirect(req.body.letter)
// }

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
