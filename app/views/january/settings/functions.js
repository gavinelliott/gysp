module.exports = {
  build: function( req ) {
    var settings = req.cookies.settings,
        options = {};

    if (settings !== undefined) {
      if ( settings.nino_version ) {
        options.nino_version = settings.nino_version;
      }
      if ( settings.nino_highlight ) {
        options.nino_highlight = settings.nino_highlight;
      }
    } else {
      options.nino_version = '1';
      options.nino_highlight = '1';
    }

    if (options.nino_version == 2){
      options.auth = 'january/settings/auth_2';
    } else {
      options.auth = 'january/settings/auth_1';
    }

    if (options.nino_highlight == 1) {
      options.nino_highlight = '<p class="form-hint">For example, QQ 12 34 <span class="span_nino2">56</span>  C</p>';
    } else if (options.nino_highlight == 2){
      options.nino_highlight = '<p class="form-hint">For example, QQ 12 34 <span class="span_nino">5</span> <span class="span_nino">6</span>  C</p>';
    }

    return options;
  }
};
