module.exports = {
  get_options: function( req ) {
    var options = req.cookies.settings;

    if ( options === undefined ) {
      options = {};
    }

    options.nino_version    = get_nino_version(req);
    options.nino_highlight  = get_nino_highlight(req);
    options.bank_version    = get_bank_version(req);

    return options;
  }
};

function get_nino_version(req) {
  var options = req.cookies.settings;

  if ( options.nino_version === undefined ) {
    options = {};
    options.nino_version = 'january/settings/auth_1';
  } else if ( options.nino_version == 1 ) {
    options.nino_version = 'january/settings/auth_1';
  } else if ( options.nino_version == 2 ) {
    options.nino_version = 'january/settings/auth_2';
  }

  return options.nino_version;
}

function get_nino_highlight(req) {
  var options = req.cookies.settings;

  if ( options.nino_highlight === undefined ) {
    options = {};
    options.nino_highlight = '<p class="form-hint">For example, QQ 12 34 <span class="span_nino">5</span> <span class="span_nino">6</span>  C</p>';
  } else if ( options.nino_highlight == 1 ) {
    options.nino_highlight = '<p class="form-hint">For example, QQ 12 34 <span class="span_nino">5</span> <span class="span_nino">6</span>  C</p>';
  } else if ( options.nino_highlight == 2) {
    options.nino_highlight = '<p class="form-hint">For example, QQ 12 34 <span class="span_nino2">56</span>  C</p>';
  }

  return options.nino_highlight;
}

function get_bank_version(req) {
  var options = req.cookies.settings;

  if (options.bank_version === undefined) {
    options = {};
    options.bank_version = 'january/settings/bank_details_1';
  } else if (options.bank_version == 1) {
    options.bank_version = 'january/settings/bank_details_1';
  } else if (options.bank_version == 2) {
    options.bank_version = 'january/settings/bank_details_2';
  }

  return options.bank_version;
}
