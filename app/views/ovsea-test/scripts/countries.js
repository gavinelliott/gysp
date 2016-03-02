var countries = {
  type: function(country) {
    var countryType = { 'resident': false, 'insurance': false };
    var resident = functions.get_resident();
    var insurance = functions.get_insurance();

    if ( resident.indexOf(country) > -1 ) {
      countryType.resident = true;
    } else if ( insurance.indexOf(country) > -1 ){
      countryType.insurance = true;
    }

    return countryType;
  }
};

var functions = {
  get_resident: function() {
    var resident = [
      'Australia',
      'Canada',
      'New Zealand'
    ];
    return resident;
  },

  get_insurance: function() {
    var insurance = [
      'Barbados',
      'Bermuda',
      'Guernsey',
      'Israel',
      'Jamaica',
      'Mauritius',
      'Jersey',
      'Philippines',
      'Turkey',
      'United States of America',
      'Austria',
      'Belgium',
      'Bosnia and Herzegovina',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'Finland',
      'France',
      'Germany',
      'Gibraltar',
      'Greece',
      'Hungary',
      'Iceland',
      'Ireland',
      'Isle of Man',
      'Italy',
      'Latvia',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macedonia',
      'Malta',
      'Montenegro',
      'Netherlands',
      'Norway',
      'Poland',
      'Portugal',
      'Serbia',
      'Slovakia',
      'Slovenia',
      'Spain',
      'Sweden',
      'Switzerland'
    ];

    return insurance;
  }
};

module.exports = countries;
