(function($) {
  "use strict"; // Start of use strict
  // Mailchimp validation hack
  // $(window).fnames = new Array();
  // $(window).ftypes = new Array();
  // $('fnames')[0]='EMAIL';
  // $('ftypes')[0]='email';
  // $('fnames')[1]='FNAME';
  // $('ftypes')[1]='text';
  // $('fnames')[2]='LNAME';
  // $('ftypes')[2]='text';
  // var $mcj = jQuery.noConflict(true)

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  var openModal = function() {
    $('#exampleModal').modal('show')
  }

  // mailchimp submit form without redirect
  // $('#mc-embedded-subscribe-form').submit(function() {
    $('#mc-embedded-subscribe-form').on('submit', function(e){
      e.preventDefault();
      const prohibited = {
        www: ' ',
        http: ' ',
        https: ' ',
      }
      $('#mce-FNAME')[0].value = $('#mce-FNAME')[0].value.replace(/www|http|https/gi, function(matched){
        return prohibited[matched];
      });
      $('#mce-FNAME')[0].value = $('#mce-FNAME')[0].value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
      $.ajax({
        async: false,
        crossDomain: true,
        dataType: 'jsonp',
        url:'https://gmail.us3.list-manage.com/subscribe/post?u=1b96598454816ce11d174a3b7&amp;id=2334dc6542',
        type:'post',
        data:$('#mc-embedded-subscribe-form').serialize(),
        success: openModal()
      });
      $('#mce-FNAME')[0].value = '';
      $('#mce-EMAIL')[0].value = ''
  });

})(jQuery); // End of use strict
