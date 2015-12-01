var express = require('express');
var router = express.Router();

Array.prototype.getRandom = function(num, cut) {
  var A = cut ? this : this.slice(0);
  A.sort(function() {
    return 0.5 - Math.random();
  });
  return A.splice(0, num);
};

router.get('/secure', function(req, res) {

  //  var values = [1, 2, 3, 4, 5, 6];
  var values = [5, 6];
  var fields = values.getRandom(2, true).sort();
  var ob = new Object;
  var text = new Object;

  if (fields.indexOf(1) > -1) {
    ob.value1 = true;
    text["field" + Object.keys(text).length] = "1st";
  }
  if (fields.indexOf(2) > -1) {
    ob.value2 = true;
    text["field" + Object.keys(text).length] = "2nd";
  }
  if (fields.indexOf(3) > -1) {
    ob.value3 = true;
    text["field" + Object.keys(text).length] = "3rd";
  }
  if (fields.indexOf(4) > -1) {
    ob.value4 = true;
    text["field" + Object.keys(text).length] = "4th";
  }
  if (fields.indexOf(5) > -1) {
    ob.value5 = true;
    text["field" + Object.keys(text).length] = "5th";
  }
  if (fields.indexOf(6) > -1) {
    ob.value6 = true;
    text["field" + Object.keys(text).length] = "6th";
  }

  res.render('secure/auth', {
    fields: ob,
    text: text
  });
});

router.post('/secure', function(req, res) {

  var ob = new Object;
  var text = new Object;
  var fields = [];

  if (req.body.value3 !== undefined) {
    fields.push(1);
    ob.value1 = true;
    text["field" + Object.keys(text).length] = "1st";
  }
  if (req.body.value4 !== undefined) {
    fields.push(2);
    ob.value2 = true;
    text["field" + Object.keys(text).length] = "2nd";
  }
  if (req.body.value5 !== undefined) {
    fields.push(3);
    ob.value3 = true;
    text["field" + Object.keys(text).length] = "3rd";
  }
  if (req.body.value6 !== undefined) {
    fields.push(4);
    ob.value4 = true;
    text["field" + Object.keys(text).length] = "4th";
  }
  if (req.body.value7 !== undefined) {
    fields.push(5);
    ob.value5 = true;
    text["field" + Object.keys(text).length] = "5th";
  }
  if (req.body.value8 !== undefined) {
    fields.push(6);
    ob.value6 = true;
    text["field" + Object.keys(text).length] = "6th";
  }

  res.locals.error = true;

  if (req.body.reference.replace(/\s/g, "") === "1234567843218765" &&
    (
      (req.body.value3 === undefined || req.body.value3 == "1") &&
      (req.body.value4 === undefined || req.body.value4 == "2") &&
      (req.body.value5 === undefined || req.body.value5 == "3") &&
      (req.body.value6 === undefined || req.body.value6 == "4") &&
      (req.body.value7 === undefined || req.body.value7 == "5") &&
      (req.body.value8 === undefined || req.body.value8 == "6")
    )) {
    req.session.view = null;
    res.redirect("declaration");
  } else {
    req.session.view++;
    if (req.session.view > 2) {
      res.redirect("unhappy-ending");
    }else{
    res.render('secure/auth', {
      fields: ob,
      text: text
    });
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
    req.body.relationship === "Civil") {
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
    res.redirect("/beta/relationship-status-more/"+req.params.type);
  }else{

    if(req.params.type === "Widowed"){
        res.redirect("/beta/relationship-status-more/"+req.params.type);
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
    res.redirect("/beta/info");
  }else{
  var isMarried = false,
    isEnded = false;

  if (req.params.type == "Married" || req.params.type == "Civil") {
    isMarried = true;
  }

  if (req.params.type == "Divorced" || req.params.type == "Widowed") {
    isEnded = true;
  }



 res.render('demo/relationship-status-more',{type: req.params.type,isEnded: isEnded, isMarried: isMarried });

}


});


router.get('/contact', function(req, res) {
  /* catch to redirect if value is set*/
    //.redirect("/beta/info");
  /*  always redirect */
  console.log(req.session.figure);
  if(req.session.figure === undefined){
    figure = true;
  }else {
    figure = false;
  }
  res.render('beta/contact',{figure:figure});
});

router.get('/calculation', function(req, res) {
  /* catch to redirect if value is set*/
  if(req.session.figure === false){
    res.redirect("/beta/info");
  }else{
  /*  always redirect */
  res.render('beta/calculated');
}
});

router.get('/bank-contact', function(req, res) {
  /* catch to redirect if value is set*/
    res.render("beta/bank-details-to-contact");
  /*  always redirect */
  //res.render('demo/calculated');
});

router.get('/info', function(req, res) {
  /* catch to redirect if value is set*/
    res.redirect("/beta/contact");
  /*  always redirect */
  //res.render('demo/calculated');
});

router.get('/unhappy-ending', function(req, res) {
  req.session.view = null;
  res.render('demo/unhappy-ending');
});

router.get('/end', function(req, res) {
  req.session.figure = null;
  if (req.session.figure === false) {
    res.render('demo/end-no-figure');
  } else {
    res.render('beta/ending-breakdown');
  }
});

router.get('/reset', function(req, res) {

  req.session.destroy();

  res.redirect("start");

});



module.exports = router;
