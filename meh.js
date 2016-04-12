var $;
var document;

$(document).ready(function () {
  // List of countries
  var countries = [
    {name: "Afghanistan", value: "afghanistan", tokens: ["afghanistan"]},
    {name: "Albania", value: "albania", tokens: ["albania"]},
    {name: "Alderney", value: "alderney", tokens: ["alderney"]},
    {name: "Algeria", value: "algeria", tokens: ["algeria"]},
    {name: "American Samoa", value: "american samoa", tokens: ["american samoa"]},
    {name: "Andorra", value: "andorra", tokens: ["andorra"]},
    {name: "Angola", value: "angola", tokens: ["angola"]},
    {name: "Anguilla", value: "anguilla", tokens: ["anguilla"]},
    {name: "Antartic Territories (British)", value: "antartic territories (british)", tokens: ["antartic territories british"]},
    {name: "Antigua", value: "antigua", tokens: ["antigua"]},
    {name: "Barbuda", value: "barbuda", tokens: ["barbuda"]},
    {name: "Argentina", value: "argentina", tokens: ['argentina', 'argentine nation', 'argentine confederation', 'united provinces of the rio de la plata']},
    {name: "Armenia", value: "armenia", tokens: ["armenia", "hayastan"]},
    {name: "Aruba", value: "aruba", tokens: ["aruba"]},
    {name: "Ascencion Island", value: "ascencion island", tokens: ["ascencion island"]},
    {name: "Australia", value: "australia", tokens: ["commonwealth of australia"]},
    {name: "Austria", value: "austria", tokens: ["austria"]},
    {name: "Azerbaijan", value: "azerbaijan", tokens: ["azerbaijan"]},
    {name: "Bahamas", value: "bahamas", tokens: ["bahamas"]},
    {name: "Bahrain", value: "bahrain", tokens: ["bahrain"]},
    {name: "Bangladesh", value: "bangladesh", tokens: ["bangladesh", "bengal"]},
    {name: "Barbados", value: "barbados", tokens: ["barbados"]},
    {name: "Belarus", value: "belarus", tokens: ["belarus", "byelorussia"]},
    {name: "Belgium", value: "belgium", tokens: ["belgium"]},
    {name: "Belize", value: "belize", tokens: ["belize", "british honduras"]},
    {name: "Benin", value: "benin", tokens: ["benin", "dahomey"]},
    {name: "Bermuda", value: "bermuda", tokens: ["bermuda"]},
    {name: "Bhutan", value: "bhutan", tokens: ["bhutan"]},
    {name: "Bissau", value: "bissau", tokens: ["bissau"]},
    {name: "Bolivia", value: "bolivia", tokens: ["bolivia"]},
    {name: "Bonaire / St Eustatius / Saba", value: "bonaire/st eustatius/saba", tokens: ["bonaire/st eustatius/saba"]},
    {name: "Bosnia and Herzegovina", value: "bosnia and herzegovina", tokens: ["bosnia and herzegovina"]},
    {name: "Botswana", value: "botswana", tokens: ["botswana", "bechuanaland"]},
    {name: "Brazil", value: "brazil", tokens: ["brazil", "brasil"]},
    {name: "British indian ocean territory", value: "british indian ocean territory", tokens: ["british indian ocean territory"]},
    {name: "Brunei", value: "brunei", tokens: ["brunei"]},
    {name: "Bulgaria", value: "bulgaria", tokens: ["bulgaria"]},
    {name: "Burkina", value: "burkina faso", tokens: ["burkina faso, upper volta"]},
    {name: "Burma", value: "burma", tokens: ["burma"]},
    {name: "Burundi", value: "burundi", tokens: ["burundi"]},
    {name: "Cambodia", value: "cambodia", tokens: ["cambodia", "khmer republic", "democratic kampuchea"]},
    {name: "Cameroon", value: "cameroon", tokens: ["cameroon"]},
    {name: "Canada", value: "canada", tokens: ["canada"]},
    {name: "Cape verde", value: "cape verde", tokens: ["cape verde"]},
    {name: "Cayman islands", value: "cayman islands", tokens: ["cayman islands"]},
    {name: "Central African Republic", value: "central african republic", tokens: ["central african republic"]},
    {name: "Chad", value: "chad", tokens: ["chad"]},
    {name: "Chile", value: "chile", tokens: ["chile"]},
    {name: "China", value: "china", tokens: ["peoples republic of china"]},
    {name: "Colombia", value: "colombia", tokens: ["colombia"]},
    {name: "Comoros", value: "comoros", tokens: ["comoros"]},
    {name: "Congo", value: "congo", tokens: ["congo"]},
    {name: "Cook Islands", value: "cook islands", tokens: ["cook islands"]},
    {name: "Costa rica", value: "costa rica", tokens: ["costa rica"]},
    {name: "Cote d'ivoire", value: "cote d’ivoire", tokens: ["cote d’ivoire, the ivory coast"]},
    {name: "Croatia", value: "croatia", tokens: ["croatia", "hrvatska"]},
    {name: "Cuba", value: "cuba", tokens: ["cuba"]},
    {name: "Curaçao", value: "curaçao", tokens: ["curaçao, curacao"]},
    {name: "Cyprus", value: "cyprus", tokens: ["cyprus"]},
    {name: "Czechoslovakia", value: "czechoslovakia", tokens: ["czechoslovakia"]},
    {name: "Czech republic", value: "czech republic", tokens: ["czech republic"]},
    {name: "Democratic republic of Congo", value: "democratic republic of congo", tokens: ["democratic republic of congo, zaire"]},
    {name: "Denmark", value: "denmark", tokens: ["denmark"]},
    {name: "Djibouti", value: "djibouti", tokens: ["djibouti"]},
    {name: "Dominica", value: "dominica", tokens: ["dominica", "commonwealth of dominica"]},
    {name: "Dominican republic", value: "dominican republic", tokens: ["dominican republic"]},
    {name: "Ecuador", value: "ecuador", tokens: ["ecuador"]},
    {name: "Egypt", value: "egypt", tokens: ["egypt"]},
    {name: "Eire (Irish Republic)", value: "eire (irish republic)", tokens: ["eire irish republic"]},
    {name: "El salvador", value: "el salvador", tokens: ["el salvador"]},
    // {name: "England", value: "england", tokens: ["england"]},
    {name: "Equatorial guinea", value: "equatorial guinea", tokens: ["equatorial guinea"]},
    {name: "Eritrea", value: "eritrea", tokens: ["eritrea"]},
    {name: "Estonia", value: "estonia", tokens: ["estonia"]},
    {name: "Ethiopia", value: "ethiopia", tokens: ["ethiopia", "abyssinia"]},
    {name: "Falkland islands", value: "falkland islands", tokens: ["falkland islands"]},
    {name: "Faroe Islands", value: "faroe islands", tokens: ["faroe islands"]},
    {name: "Fiji", value: "fiji", tokens: ["fiji"]},
    {name: "Finland", value: "finland", tokens: ["finland"]},
    {name: "Former Yug Rep of Macedonia", value: "former yug rep of macedonia", tokens: ["former yuguslavian republic of macedonia", "former yugoslavian republic of macedonia"]},
    {name: "France", value: "france", tokens: ["france"]},
    {name: "French guiana", value: "french guiana", tokens: ["french guiana"]},
    {name: "French polynesia", value: "french polynesia", tokens: ["french polynesia"]},
    {name: "Gabon", value: "gabon", tokens: ["gabon"]},
    {name: "Gambia", value: "gambia", tokens: ["gambia"]},
    {name: "Georgia", value: "georgia", tokens: ["georgia"]},
    {name: "Germany", value: "germany", tokens: ["germany"]},
    {name: "Ghana", value: "ghana", tokens: ["ghana", "gold coast"]},
    {name: "Gibraltar", value: "gibraltar", tokens: ["gibraltar"]},
    // {name: "Great Britain", value: "great britain", tokens: ["great britain"]},
    {name: "Greece", value: "greece", tokens: ["greece", "hellas"]},
    {name: "Greenland", value: "greenland", tokens: ["greenland"]},
    {name: "Grenada", value: "grenada", tokens: ["grenada"]},
    {name: "Guadeloupe", value: "guadeloupe", tokens: ["guadeloupe"]},
    {name: "Guam", value: "guam", tokens: ["guam"]},
    {name: "Guatemala", value: "guatemala", tokens: ["guatemala"]},
    {name: "Guernsey", value: "guernsey", tokens: ["guernsey"]},
    {name: "Guinea", value: "guinea", tokens: ["guinea"]},
    {name: "Guinea-bissau", value: "guinea-bissau", tokens: ["guinea-bissau"]},
    {name: "Guyana", value: "guyana", tokens: ["guyana"]},
    {name: "Haiti", value: "haiti", tokens: ["haiti"]},
    {name: "Holy see", value: "holy see", tokens: ["holy see"]},
    {name: "Honduras", value: "honduras", tokens: ["honduras"]},
    {name: "Hong Kong", value: "hong kong", tokens: ["hong kong"]},
    {name: "Hungary", value: "hungary", tokens: ["hungary"]},
    {name: "Iceland", value: "iceland", tokens: ["iceland"]},
    {name: "India", value: "india", tokens: ["india"]},
    {name: "Indonesia", value: "indonesia", tokens: ["indonesia"]},
    {name: "Iran", value: "iran", tokens: ["iran"]},
    {name: "Iraq", value: "iraq", tokens: ["iraq", "mesopotamia"]},
    {name: "Ireland", value: "ireland", tokens: ["ireland"]},
    {name: "Isle of man", value: "isle of man", tokens: ["isle of man"]},
    {name: "Isreal", value: "israel", tokens: ["israel"]},
    {name: "Italy", value: "italy", tokens: ["italy"]},
    {name: "Jamaica", value: "jamaica", tokens: ["jamaica"]},
    {name: "Japan", value: "japan", tokens: ["japan"]},
    {name: "Jersey", value: "jersey", tokens: ["jersey"]},
    {name: "Jordan", value: "jordan", tokens: ["jordan"]},
    {name: "Kampuchea", value: "kampuchea", tokens: ["kampuchea"]},
    {name: "Kazakhstan", value: "kazakhstan", tokens: ["kazakhstan"]},
    {name: "Kenya", value: "kenya", tokens: ["kenya"]},
    {name: "Kiribati", value: "kiribati", tokens: ["kiribati"]},
    {name: "Kosovo", value: "kosovo", tokens: ["kosovo"]},
    {name: "Kuwait", value: "kuwait", tokens: ["kuwait"]},
    {name: "Kyrgyzstan", value: "kyrgyzstan", tokens: ["kyrgyzstan"]},
    {name: "Laos", value: "laos", tokens: ["laos"]},
    {name: "Latvia", value: "latvia", tokens: ["latvia"]},
    {name: "Lebanon", value: "lebanon", tokens: ["lebanon"]},
    {name: "Lesotho", value: "lesotho", tokens: ["lesotho", "basutoland"]},
    {name: "Liberia", value: "liberia", tokens: ["liberia"]},
    {name: "Libya", value: "libya", tokens: ["libya"]},
    {name: "Liechtenstein", value: "liechtenstein", tokens: ["liechtenstein"]},
    {name: "Lithuania", value: "lithuania", tokens: ["lithuania"]},
    {name: "Luxembourg", value: "luxembourg", tokens: ["luxembourg"]},
    {name: "Macao", value: "macao", tokens: ["macao"]},
    {name: "Madagascar", value: "madagascar", tokens: ["madagascar"]},
    {name: "Malagasy Republic", value: "malagasy republic", tokens: ["malagasy republic"]},
    {name: "Malawi", value: "malawi", tokens: ["malawi", "nyasaland"]},
    {name: "Malaysia", value: "malaysia", tokens: ["malaysia", "sabah and sarawak"]},
    {name: "Maldives", value: "maldives", tokens: ["maldives"]},
    {name: "Mali", value: "mali", tokens: ["mali"]},
    {name: "Malta", value: "malta", tokens: ["malta"]},
    {name: "Marshall Islands", value: "marshall islands", tokens: ["marshall islands"]},
    {name: "Martinique", value: "martinique", tokens: ["martinique"]},
    {name: "Mauritania", value: "mauritania", tokens: ["mauritania"]},
    {name: "Mauritius", value: "mauritius", tokens: ["mauritius"]},
    {name: "Mayotte", value: "mayotte", tokens: ["mayotte"]},
    {name: "Mexico", value: "mexico", tokens: ["mexico"]},
    {name: "Micronesia", value: "micronesia", tokens: ["micronesia"]},
    {name: "Moldova", value: "moldova", tokens: ["moldova"]},
    {name: "Monaco", value: "monaco", tokens: ["monaco"]},
    {name: "Mongolia", value: "mongolia", tokens: ["mongolia"]},
    {name: "Montenegro", value: "montenegro", tokens: ["montenegro"]},
    {name: "Montserrat", value: "montserrat", tokens: ["montserrat"]},
    {name: "Morocco", value: "morocco", tokens: ["morocco"]},
    {name: "Mozambique", value: "mozambique", tokens: ["mozambique"]},
    {name: "Namibia", value: "namibia", tokens: ["namibia"]},
    {name: "Nauru", value: "nauru", tokens: ["nauru"]},
    {name: "Nepal", value: "nepal", tokens: ["nepal"]},
    {name: "Netherlands", value: "netherlands", tokens: ["netherlands", "the netherlands, holland"]},
    {name: "Netherlands Antilles", value: "netherlands antilles", tokens: ["netherlands", "antilles"]},
    {name: "New caledonia", value: "new caledonia", tokens: ["new caledonia"]},
    {name: "New Zealand", value: "new zealand", tokens: ["new zealand"]},
    {name: "Nicaragua", value: "nicaragua", tokens: ["nicaragua"]},
    {name: "Niger", value: "niger", tokens: ["niger"]},
    {name: "Nigeria", value: "nigeria", tokens: ["nigeria"]},
    {name: "Norfolk Island", value: "norfolk island", tokens: ["norfolk island"]},
    {name: "North Korea", value: "north korea", tokens: ["north korea"]},
    // {name: "Northern Ireland", value: "northern ireland", tokens: ["northern ireland"]},
    {name: "Norway", value: "norway", tokens: ["norway"]},
    {name: "Oman", value: "oman", tokens: ["oman"]},
    {name: "Pakistan", value: "pakistan", tokens: ["pakistan"]},
    {name: "Palau", value: "palau", tokens: ["palau"]},
    {name: "Panama", value: "panama", tokens: ["panama"]},
    {name: "Papua New Guinea", value: "papua new guinea", tokens: ["papua new guinea"]},
    {name: "Paraguay", value: "paraguay", tokens: ["paraguay"]},
    {name: "Peru", value: "peru", tokens: ["peru"]},
    {name: "Philippines", value: "philippines", tokens: ["philippines"]},
    {name: "Pitcairn Island", value: "pitcairn island", tokens: ["pitcairn island"]},
    {name: "Poland", value: "poland", tokens: ["poland"]},
    {name: "Portugal", value: "portugal", tokens: ["portugal"]},
    {name: "Qatar", value: "qatar", tokens: ["qatar"]},
    {name: "Republic of Croatia", value: "republic of croatia", tokens: ["republic of croatia"]},
    {name: "Republic of Slovenia", value: "republic of slovenia", tokens: ["republic of slovenia"]},
    {name: "Réunion", value: "réunion", tokens: ["réunion, reunion"]},
    {name: "Romania", value: "romania", tokens: ["romania"]},
    {name: "Russia", value: "russia", tokens: ["russia"]},
    {name: "Rwanda", value: "rwanda", tokens: ["rwanda"]},
    {name: "Sabah", value: "sabah", tokens: ["sabah"]},
    {name: "Samoa", value: "samoa", tokens: ["samoa"]},
    {name: "San marino", value: "san marino", tokens: ["san marino"]},
    {name: "Sarawak", value: "sarawak", tokens: ["sarawak"]},
    {name: "Sark", value: "sark", tokens: ["sark"]},
    {name: "São tomé and principe", value: "são tomé and principe", tokens: ["são tomé and principe, sao tomé and principe"]},
    {name: "Saudi Arabia", value: "saudi arabia", tokens: ["saudi arabia"]},
    // {name: "Scotland", value: "scotland", tokens: ["scotland"]},
    {name: "Senegal", value: "senegal", tokens: ["senegal"]},
    {name: "Serbia", value: "serbia", tokens: ["serbia"]},
    {name: "Seychelles", value: "seychelles", tokens: ["seychelles"]},
    {name: "Sharjah", value: "sharjah", tokens: ["sharjah"]},
    {name: "Sierra Leone", value: "sierra leone", tokens: ["sierra leone"]},
    {name: "Singapore", value: "singapore", tokens: ["singapore"]},
    {name: "Slovakia", value: "slovakia", tokens: ["slovakia"]},
    {name: "Slovenia", value: "slovenia", tokens: ["slovenia"]},
    {name: "Solomon Islands", value: "solomon islands", tokens: ["solomon islands"]},
    {name: "Somalia", value: "somalia", tokens: ["somalia"]},
    {name: "South Africa", value: "south africa", tokens: ["south africa"]},
    {name: "South Georgia", value: "south georgia and the south sandwich islands", tokens: ["south georgia and the south sandwich islands"]},
    {name: "South Korea", value: "south korea", tokens: ["south korea"]},
    {name: "South Sudan", value: "south sudan", tokens: ["south sudan"]},
    {name: "Spain", value: "spain", tokens: ["spain"]},
    {name: "Sri Lanka", value: "sri lanka", tokens: ["sri lanka, ceylon"]},
    {name: "St Helena", value: "st helena, ascension and tristan da cunha", tokens: ["st helena, ascension and tristan da cunha"]},
    {name: "St Kitts and Nevis", value: "st kitts and nevis", tokens: ["st kitts and nevis"]},
    {name: "St Lucia", value: "st lucia", tokens: ["st lucia"]},
    {name: "St Maarten", value: "st maarten", tokens: ["st maarten"]},
    {name: "St Pierre and Miquelon", value: "st pierre & miquelon", tokens: ["st pierre and miquelon, st pierre and miquelon"]},
    {name: "St Vincent and the grenadines", value: "st vincent and the grenadines", tokens: ["st vincent and the grenadines"]},
    {name: "Sudan", value: "sudan", tokens: ["sudan"]},
    {name: "Suriname", value: "suriname", tokens: ["suriname", "dutch guiana"]},
    {name: "Swaziland", value: "swaziland", tokens: ["swaziland"]},
    {name: "Sweden", value: "sweden", tokens: ["sweden"]},
    {name: "Switzerland", value: "switzerland", tokens: ["switzerland"]},
    {name: "Syria", value: "syria", tokens: ["syria"]},
    {name: "Tahiti", value: "tahiti", tokens: ["tahiti"]},
    {name: "Taiwan", value: "taiwan", tokens: ["taiwan", "formosa"]},
    {name: "Tajikistan", value: "tajikistan", tokens: ["tajikistan"]},
    {name: "Tanzania", value: "tanzania", tokens: ["tanzania"]},
    {name: "Thailand", value: "thailand", tokens: ["thailand"]},
    {name: "The occupied Palestinian Territories", value: "the occupied palestinian territories", tokens: ["the occupied palestinian territories"]},
    {name: "Timor Leste", value: "timor leste", tokens: ["timor leste"]},
    {name: "Togo", value: "togo", tokens: ["togo"]},
    {name: "Tonga", value: "tonga", tokens: ["tonga"]},
    {name: "Trinidad and Tobago", value: "trinidad and tobago", tokens: ["trinidad and tobago"]},
    {name: "Tristan de Cuhna", value: "tristan de cuhna", tokens: ["tristan de cuhna"]},
    {name: "Tunisia", value: "tunisia", tokens: ["tunisia"]},
    {name: "Turkey", value: "turkey", tokens: ["turkey", "ottoman empire"]},
    {name: "Turkmenistan", value: "turkmenistan", tokens: ["turkmenistan"]},
    {name: "Turks and Caicos Islands", value: "turks and caicos islands", tokens: ["turks and caicos islands"]},
    {name: "Tuvalu", value: "tuvalu", tokens: ["tuvalu"]},
    {name: "Uganda", value: "uganda", tokens: ["uganda"]},
    {name: "Ukrain", value: "ukraine", tokens: ["ukraine", "the ukraine"]},
    {name: "United Arab Emirates", value: "united arab emirates", tokens: ["united arab emirates"]},
    {name: "Uruguay", value: "uruguay", tokens: ["uruguay"]},
    {name: "United Kingdom", value: "united kingdom", tokens: ["united kingdom", "uk"]},
    {name: "United States of America", value: "united states of america", tokens: ["united states of america", "usa", "u.s.a"]},
    {name: "USSR", value: "ussr", tokens: ["ussr"]},
    {name: "Uzbekistan", value: "uzbekistan", tokens: ["uzbekistan"]},
    {name: "Vanuatu", value: "vanuatu", tokens: ["vanuatu"]},
    {name: "Vatican City State", value: "vatican city state", tokens: ["vatican city state"]},
    {name: "Venezuela", value: "venezuela", tokens: ["venezuela"]},
    {name: "Vietnam", value: "vietnam", tokens: ["vietnam"]},
    {name: "Virgin Islands (British)", value: "virgin islands (british)", tokens: ["british virgin islands"]},
    {name: "Virgin Islands (USA)", value: "virgin islands (usa)", tokens: ["virgin islands"]},
    // {name: "Wales", value: "wales", tokens: ["wales"]},
    {name: "Wallis and Futuna", value: "wallis and futuna", tokens: ["wallis and futuna"]},
    {name: "Western Sahara", value: "western sahara", tokens: ["western sahara"]},
    {name: "Yemen", value: "yemen", tokens: ["yemen arab republic"]},
    {name: "Yugoslavia", value: "yugoslavia", tokens: ["federal republic of yugoslavia"]},
    {name: "Zaire", value: "zaire", tokens: ["republic of zaire"]},
    {name: "Zambia", value: "zambia", tokens: ["zambia", "rhodesia"]},
    {name: "Zimbabwe", value: "zimbabwe", tokens: ["zimbabwe", "rhodesia"]}
  ];

  // Set the last active input to the first input to avoid errors
  var lastActiveInput = $('.country-name:first');

  // When an input is focussed, hide any country lists that are showing
  $(document).on('focus', 'input', function () {
    $('.country-list').hide();
  });

  // When an input is blurred, set the last active input to that one
  $(document).on('blur', 'input', function () {
    lastActiveInput = $(this);
  });

  // When a key is pressed inside an input field
  $(document).on('keyup', 'input', function () {
    // Find the country list for this input field
    var countryList = $(this).parent().find('.country-list');
    // Match any text typed to the country array
    var matched = countryMatch($(this).val());
    // Format the html for the matched countries
    countryList.html(matched);
    // If there is more than 1 character in the input and there is
    // more than one matched country
    if ($(this).val().length > 0 && matched.length > 0) {
      // Show the country list
      countryList.show();
    } else {
      // Hide the country list
      countryList.hide();
    }
  });

  // When a mouse is clicked or the screen is touched
  $(document).on('click touchend', function (e) {
    // If what was clicked was not a country field
    if (!$(e.target).hasClass('country-name')) {
      // Find the country list for the last ative input
      var countryList = $(lastActiveInput).parent().find('.country-list');

      // If the thing clicked was the add-another-country button
      if (e.target.id === 'add-another-country') {
        // Stop the link being clicked
        e.preventDefault();
        // Run the removeLinks function
        addRemoveLinks();
        // Run the sortLinks function
        sortRemoveLinks();
      // Else if the thing clicked was the remove-link button
      } else if (e.target.className === 'remove-link') {
        // Stop the link being clicked
        e.preventDefault();
        // Find and remove this block at its parent form-group
        $(e.target).parents('.form-group').remove();
        // Run the sort links functions
        sortRemoveLinks();
      // Else if the thing clicked was a country-link button
      } else if ($(e.target).hasClass('country-link')) {
        // Set link to the thing clicked
        var link = $(e.target);
        // Set input to the country input field attached to this
        var input = link.parents('.form-group').find('.country-name');
        // Change the value of the input to the value of the country-link clicked
        input.val(link.text());
        // Hide the country list
        countryList.hide();
      } else {
        // Find the top hit in the country list
        var topHit = $(countryList).children('span').first().text();
        // If there is more than 3 characters in the input field
        if ($(lastActiveInput).val().length >= 3) {
          var matched = 0;
          for (var i = 0; i < countries.length; i++) {
            // If the text in the input matches a country
            // push it into the valid array
            if (countries[i].name.toLowerCase() === $(lastActiveInput).val().toLowerCase()) {
              matched = 1;
              break;
            }
          }
          if (matched === 0) {
            // Change the input to match the top hit
            $(lastActiveInput).val(topHit);
          }
        }
        // Hide the country list
        countryList.hide();
      }
    }
  });

  // When you submit the form
  $('#countries').on('submit', function (e) {
    // Run the validation function
    validateForm(e);
  });

  // Functions
  function validateForm(e) {
    // Set up variables
    var valid = [];
    var errorMessage = ['Check you have entered a valid country', ''];
    var invalid = 0;
    // Check each field for validation
    $('.country-name').each(function () {
      // Get the text from the field
      var input = $(this).val();
      // if the input is not empty
      if (input.length > 0) {
        // Loop through each country in the list
        for (var i = 0; i < countries.length; i++) {
          // If the text in the input matches a country
          // push it into the valid array
          if (countries[i].name.toLowerCase() === input.toLowerCase()) {
            valid.push($(this).attr('id'));
          }
        }
      // If there is no text in the field and it is not the first field
      // on the page, then mark it as valid
      } else if (input.length === 0 && $(this).attr('id') !== 'country-name-1') {
        valid.push($(this).attr('id'));
      }
    });
    // If any of the fields are not valid, stop the submit and validate
    if (valid.length !== $('.country-name').length) {
      e.preventDefault();
      $('.country-name').each(function () {
        // if this country field is not in the valid array
        // add to the count of invalid fields and add error to this field
        if (valid.indexOf($(this).attr('id')) < 0) {
          invalid++;
          $(this).parent().addClass('error');
          // if the first field has no text in the field, create an error
          // message to say that it is empty
          if ($('.country-name:first').val().length === 0) {
            errorMessage[1] = 'You have not typed anything';
          // else if there is invalid country names, create an error
          // to explain this
          } else if (invalid > 0) {
            errorMessage[1] = 'We could not find a country with this name';
          }
          // Remove any existing error messages
          $('#error-message').remove();
          // Add the new error message
          $('#country-type-ahead').prepend(
            String(`
              <div class="form-group error" id="error-message">
                <span class="form-label-bold">
                  ${errorMessage[0]}
                </span>
                <span class="error-message">
                  ${errorMessage[1]}
                </span>
              </div>
            `)
          );
        }
        // else reduce the count of invalid fields and remove error from
        // this field
        else {
          invalid--;
          $(this).parent().removeClass('error');
        }
      });
    }
  }

  function countryMatch(text) {
    var input = text.toLowerCase();
    var matched = [];
    var html = '';
    var i;

    for (i = 0; i < countries.length; i++) {
      var tokens = countries[i].tokens.toString();

      if (tokens.toLowerCase().indexOf(input) > -1) {
        matched.push(countries[i].name);
        if (matched.length === 4) {
          break;
        }
      }
    }

    for (i = 0; i < matched.length; i++) {
      html += '<span class="country-link">' + matched[i] + '</span>';
    }

    return html;
  }

  function addRemoveLinks() {
    var elementNum = $('.country-name').length + 1;

    $('#country-type-ahead').append(
      String(`
        <div class="form-group">
          <label class="form-label" for="country-name-${elementNum}">
            Country name <span class="remove-link"></span>
          </label>
          <input class="form-control country-name" id="country-name-${elementNum}" type="text" name="country-name-${elementNum}" autocomplete="off">
          <div class="country-list" style="display:none;"></div>
        </div>`)
    );
  }

  function sortRemoveLinks() {
    var id = 1;

    if ($('.country-name').length > 1) {
      $('.form-label').each(function () {
        $(this).html('Country name <a href="#" class="remove-link">Remove</a>');
      });
    } else {
      $('.form-label').each(function () {
        $(this).html('Country name');
      });
    }

    $('.country-name').each(function () {
      $(this).parent().find('label').attr('for', 'country-name-' + id);
      $(this).attr('id', 'country-name-' + id);
      $(this).attr('name', 'country-name-' + id);
      id++;
    });
  }
});
