'use strict';

(function () {
  $('.floor-heater').on('change', function (e) {
    setTimeout(function () {
      var on = ($('.floor-heater .active > input').attr('id') === 'floor_heater_on');
      $.ajax({
        type: 'PUT',
        url: '/heater',
        data: {
          on: !!on
        }
      }).done(function (result) {
        if (result.on) {
          $('#floor_heater_off').parent().removeClass('focus active');
          $('#floor_heater_on').parent().addClass('focus active');
        } else {
          $('#floor_heater_off').parent().addClass('focus active');          
          $('#floor_heater_on').parent().removeClass('focus active');
        }
      });
    }, 0);
  });


  $.ajax({
    type: 'GET',
    url: '/heater',
  }).done(function (result) {
    if (result.on) {
      $('#floor_heater_off').parent().removeClass('focus active');
      $('#floor_heater_on').parent().addClass('focus active');
    } else {
      $('#floor_heater_off').parent().addClass('focus active');
      $('#floor_heater_on').parent().removeClass('focus active');
    }
  });
  
})();
