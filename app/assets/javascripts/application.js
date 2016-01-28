function ShowHideContent() {
  var self = this;
  self.showHideRadioToggledContent = function () {
    $(".block-label input[type='radio']").each(function () {

      var $radio = $(this);
      var $radioGroupName = $radio.attr('name');
      var $radioLabel = $radio.parent('label');

      var dataTarget = $radioLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (dataTarget) {

        // Set aria-controls
        $radio.attr('aria-controls', dataTarget);

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $radio.closest('form').find(".block-label input[name=" + $radioGroupName + "]").each(function () {
            var $this = $(this);

            var groupDataTarget = $this.parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $this.attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

          var $dataTarget = $('#' + dataTarget);
          $dataTarget.show();
          // Set aria-expanded and aria-hidden for clicked radio
          $radio.attr('aria-expanded', 'true');
          $dataTarget.attr('aria-hidden', 'false');

        });

      } else {
        // If the data-target attribute is undefined for a radio button,
        // hide visible data-target content for radio buttons in the same group

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $(".block-label input[name=" + $radioGroupName + "]").each(function () {

            var groupDataTarget = $(this).parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $(this).attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

        });
      }

    });
  };
  self.showHideCheckboxToggledContent = function () {

    $(".block-label input[type='checkbox']").each(function() {

      var $checkbox = $(this);
      var $checkboxLabel = $(this).parent();

      var $dataTarget = $checkboxLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

        // Set aria-controls
        $checkbox.attr('aria-controls', $dataTarget);

        // Set aria-expanded and aria-hidden
        $checkbox.attr('aria-expanded', 'false');
        $('#'+$dataTarget).attr('aria-hidden', 'true');

        // For checkboxes revealing hidden content
        $checkbox.on('click', function() {

          var state = $(this).attr('aria-expanded') === 'false' ? true : false;

          // Toggle hidden content
          $('#'+$dataTarget).toggle();

          // Update aria-expanded and aria-hidden attributes
          $(this).attr('aria-expanded', state);
          $('#'+$dataTarget).attr('aria-hidden', !state);

        });
      }

    });
  };
}

$(document).ready(function() {

  // Turn off jQuery animation
  jQuery.fx.off = true;

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Details/summary polyfill
  // See /javascripts/vendor/details.polyfill.js

  // Where .block-label uses the data-target attribute
  // to toggle hidden content
  var toggleContent = new ShowHideContent();
  toggleContent.showHideRadioToggledContent();
  toggleContent.showHideCheckboxToggledContent();

  $('#dob-day').on('keyup', function(e) {
    if ( !/37|38|39|40/.test(e.keyCode) ) {
      if ( $(this).val().length === 2 ) {
        $('#dob-month').focus();
        var tmpmn = $('#dob-month').val();
        $('#dob-month').val('');
        $('#dob-month').val(tmpmn);
      }
    }
  });

  $('#dob-month').on('keyup', function(e) {
    if ( /8|46/.test(e.keyCode) ) {
      if ( $(this).val().length === 0 ) {
        $('#dob-day').focus();
        var tmpdy = $('#dob-day').val();
        $('#dob-day').val('');
        $('#dob-day').val(tmpdy);
      }
    } else if ( $(this).val().length === 2 ) {
      $('#dob-year').focus();
      var tmpyr = $('#dob-year').val();
      $('#dob-year').val('');
      $('#dob-year').val(tmpyr);
    }
  });

  $('#dob-year').on('keyup', function(e) {
    if ( /8|46/.test(e.keyCode) ) {
      if ( $(this).val().length === 0 ) {
        $('#dob-month').focus();
        var tmpmn = $('#dob-day').val();
        $('#dob-month').val('');
        $('#dob-month').val(tmpmn);
      }
    }
  });

  if(window.location.href.indexOf("bank-details") > -1) {
    var sc_inputs = [];
    var focus_disable = 1;
    var sort_code_reg = /(bs|ba)(-sort)([1-3])/;

    $('input').each(function() {
      if ( sort_code_reg.test($(this).attr('id')) ) {
        sc_inputs.push( $(this).attr('id') );
      }
    });

    $('input').on('keyup', function(e) {
      var count = 0;
      var id = e.target.id;
      var prefix = e.target.id.slice(0, 2);

      if ( focus_disable > 0 ) {
        if ( $.inArray(id, sc_inputs) > -1 ) {
          $('input').each(function() {
            if ( sort_code_reg.test($(this).attr('id')) ) {
              count += $(this).val().length;
            }
          });

          if ( e.keyCode >= 48 && e.keyCode <= 57 ) {
            if ( count === 2 ) {
              $('#' + prefix + '-sort' + 2).focus();
            } else if ( count === 4 ) {
              $('#' + prefix + '-sort' + 3).focus();
            }
          } else if ( e.keyCode === 8 || e.keyCode === 46 ){
            if ( count === 2 ) {
              $('#' + prefix + '-sort' + 1).focus();
            } else if ( count === 4 ) {
              $('#' + prefix + '-sort' + 2).focus();
            }
          }
        }
      }
    });

    $('input').on('click', function(e) {
      var id = e.target.id;
      var count = 0;

      if ( $.inArray(id, sc_inputs) > -1 ) {
        $('input').each(function() {
          if ( sort_code_reg.test($(this).attr('id')) ) {
            count += $(this).val().length;
          }
        });

        if ( count > 0 ) {
          focus_disable--;
        }
      }
    });

    $('.block-label').on('click', function() {
      if ( !$(this).hasClass('selected') ) {
        $('input[type="text"]').each(function() {
          $(this).val('');
        });
        focus_disable = 1;
      }
    });

    $('#ba-sort-code, #bs-sort-code').on('keyup', function(e) {
      formatter(e, $(this));
    });

    $('#ba-sort-code, #bs-sort-code').on('paste', function(e) {
      var looping = true;
      var el_id = $(this);
      if(looping === true) {
        setTimeout(function () {
          paster(e, el_id);
          looping = false;
        }, 100);
      }
    });

    var selected = 0;
    if ( $('.error-summary').length > 0 && selected === 0 ) {
      if( $('.error-summary:first').attr('data-banktype') == 'bank' ) {
        $('#building_1').trigger('click');
        selected = 1;
      } else if( $('.error-summary:first').attr('data-banktype') == 'building' ) {
        $('#building_2').trigger('click');
        selected = 1;
      }
    }
  }

  function formatter(e, element) {
    var string = '';
    string += element.val();
    count = string.length;

    if(e.keyCode == 8 || e.keyCode == 46) {
      if (count !== 0) {
        if (count == 5 || count == 10) {
          string = string.slice(0, -3);
          count --;
        }
      }
    } else {
      if(count == 2 || count == 7) {
        string = string += ' - ';
      }
    }

    count = string.length;

    element.val(string);
  }

  function paster(e, element) {
    var string = element.val();
        string = string.replace(/ |-|\./g,'');
    var p1 = string.slice(0,2),
        p2 = string.slice(2,4),
        p3 = string.slice(4,6),
        formatted = p1 + ' - ' + p2 + ' - ' + p3;
    count = formatted.length;

    element.val(formatted);
  }
});
