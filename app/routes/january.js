var express = require('express');
var router = express.Router();

Array.prototype.getRandom = function(num, cut) {
  var A = cut ? this : this.slice(0);
  A.sort(function() {
    return 0.5 - Math.random();
  });
  return A.splice(0, num);
};

// Change from 1 to 2 for different NINO inputs
var jan = 'secure/auth_january_2';

router.get('/secure', function(req, res) {

  res.render(jan);
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
      res.render(jan);
    }
  }
});


/* work or lived aboard */

router.all('/work-or-lived-aboard', function(req, res) {
  if (req.body.workedOutsideUk === "Yes") {
    req.session.figure = false;
    res.redirect("work-or-lived-aboard-more");
  } else if (req.body.workedOutsideUk === "No") {
    res.redirect("relationship-status");
  }else if(req.body.workedOutsideUk !== "Yes" && req.body.workedOutsideUk !== "No"){
  res.render('demo/work-or-lived-aboard');
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
  res.render('demo/relationship-status');
}
});

router.all('/work-or-lived-aboard-more', function(req, res) {
  if (req.body.submit === "Continue") {
    res.redirect("relationship-status");
  }else{
  res.render('demo/work-or-lived-aboard-more');
}
});




router.all('/relationship-status-date/:type', function(req, res) {

  if (req.body.submit === "Continue") {
    res.redirect("/demo/relationship-status-more/"+req.params.type);
  }else{

    if(req.params.type === "Widowed"){
        res.redirect("/demo/relationship-status-more/"+req.params.type);
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
  res.render('demo/relationship-status-date', {
    eventText: eventText,
    type: req.params.type,
    isEnded: isEnded,
    isMarried: isMarried
  });

}}
});

router.all('/relationship-status-more/:type', function(req, res) {

  if (req.body.submit === "Continue") {
    res.redirect("/demo/info");
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

 res.render('demo/relationship-status-more',{type: req.params.type,pageHeader: pageHeader,isEnded: isEnded, isMarried: isMarried });

}


});


router.get('/calculation', function(req, res) {
  /* catch to redirect if value is set*/
    res.redirect("/demo/info");
  /*  always redirect */
  //res.render('demo/calculated');
});

router.get('/info', function(req, res) {
  /* catch to redirect if value is set*/
    res.redirect("/demo/contact");
  /*  always redirect */
  //res.render('demo/calculated');
});

router.get('/unhappy-ending', function(req, res) {
  req.session.view = null;
  res.render('demo/unhappy-ending');
});

router.get('/end', function(req, res) {
      res.render('demo/end');
  // if (req.session.figure === false) {
  //   res.render('demo/end-no-figure');
  // } else {
  //   res.render('demo/end');
  // }
});

router.get('/reset', function(req, res) {

  req.session.destroy();

  res.redirect("start");

});

router.get('/download', function(req,res){

res.download('./public/images/download.pdf', 'download.pdf');

});


module.exports = router;
