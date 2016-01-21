var express = require('express');
var router = express.Router();
var jan_functions = require("../views/january/settings/functions.js");

Array.prototype.getRandom = function(num, cut) {
  var A = cut ? this : this.slice(0);
  A.sort(function() {
    return 0.5 - Math.random();
  });
  return A.splice(0, num);
};

router.get('/secure', function(req, res) {
  var options = jan_functions.get_options(req);

  res.render(options.nino_version, {options: options});
});

router.post('/secure', function(req, res) {
  res.locals.error = true;

  if ((req.body.reference.replace(/\s/g, "") === "1234567843218765" || req.body.reference.replace(/\s/g, "").toLowerCase() === "qwx5ychpnrjv")) {

    req.session.view = null;
    res.redirect("work-or-lived-aboard");
  } else {
    req.session.view++;

    if (req.session.view > 2) {
      res.redirect("unhappy-ending");
    } else {
      var options = jan_functions.get_options(req);

      res.render(options.nino_version, {options: options});
    }
  }
});

// Bank details
router.get('/bank-details', function(req, res) {
  var options = jan_functions.get_options(req);

  res.render(options.bank_version, {options: options});
});

/* work or lived aboard */

router.all('/work-or-lived-aboard', function(req, res) {
  if (req.body.workedOutsideUk === "Yes") {
    req.session.figure = false;
    res.redirect("work-or-lived-aboard-more");
  } else if (req.body.workedOutsideUk === "No") {
    res.redirect("relationship-status");
  }else if(req.body.workedOutsideUk !== "Yes" && req.body.workedOutsideUk !== "No"){
  res.render('january/work-or-lived-aboard');
}
});

router.all('/relationship-status', function(req, res) {
  if (req.body.relationship === "Never been married") {
    res.redirect("calculation");
  } else if (req.body.relationship === "Married" ||
    req.body.relationship === "Widowed" ||
    req.body.relationship === "Divorced" ||
    req.body.relationship === "Civil" ||
    req.body.relationship === "Dissolved") {
    res.redirect("relationship-status-date/" + req.body.relationship);
  }else{
  res.render('january/relationship-status');
}
});

router.all('/work-or-lived-aboard-more', function(req, res) {
  if (req.body.submit === "Continue") {
    res.redirect("relationship-status");
  }else{
  res.render('january/work-or-lived-aboard-more');
}
});


router.all('/relationship-status-date/:type', function(req, res) {

  if (req.body.submit === "Continue") {
    res.redirect("/january/relationship-status-more/"+req.params.type);
  }else{

    if(req.params.type === "Widowed"){
        res.redirect("/january/relationship-status-more/"+req.params.type);
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
      eventText = "What date did they die?";
      break;
  }
  res.render('january/relationship-status-date', {
    eventText: eventText,
    type: req.params.type,
    isEnded: isEnded,
    isMarried: isMarried
  });

}}
});

router.all('/relationship-status-more/:type', function(req, res) {

  if (req.body.submit === "Continue") {
    res.redirect("/january/info");
  }else{
  var isMarried = false,
    isEnded = false;

  if (req.params.type == "Married" || req.params.type == "Civil") {
    isMarried = true;
  }

  if (req.params.type == "Divorced" || req.params.type == "Widowed") {
    isEnded = true;
  }


  var pageHeader = "";

  switch (req.params.type) {
    case "Married":
      pageHeader = "About your partner";
      break;
    case "Civil":
      pageHeader = "About your partner";
      break;
    case "Divorced":
      pageHeader = "About your ex-partner";
      break;
    case "Dissolved":
      pageHeader = "About your ex-partner";
      break;
    case "Widowed":
      pageHeader = "About your late partner";
      break;
  }

 res.render('january/relationship-status-more',{type: req.params.type,pageHeader: pageHeader,isEnded: isEnded, isMarried: isMarried });

}


});


router.get('/calculation', function(req, res) {
  /* catch to redirect if value is set*/
    res.redirect("/january/info");
  /*  always redirect */
  //res.render('january/calculated');
});

router.get('/info', function(req, res) {
  /* catch to redirect if value is set*/
    res.redirect("/january/contact");
  /*  always redirect */
  //res.render('january/calculated');
});

router.get('/unhappy-ending', function(req, res) {
  req.session.view = null;
  res.render('january/unhappy-ending');
});

router.get('/end', function(req, res) {
      res.render('january/end');
  // if (req.session.figure === false) {
  //   res.render('january/end-no-figure');
  // } else {
  //   res.render('january/end');
  // }
});

router.get('/reset', function(req, res) {

  req.session.destroy();

  res.redirect("start");

});

router.get('/download', function(req,res){

res.download('./public/images/download.pdf', 'download.pdf');

});


// Settings

router.get('/settings', function(req, res) {
  res.render('january/settings');
});

router.post('/settings', function(req, res) {
  if (Object.keys(req.body).length) {
    var settings = {
      "nino_version": req.body.nino_version,
      "nino_highlight": req.body.nino_highlight,
      "bank_version": req.body.bank_version,
    };
    res.cookie("settings", settings);

    res.redirect('/january/start');
  } else {
    var error = "You didn't select any settings";
    res.render('january/settings', {error: error});
  }
});


module.exports = router;
