// jshint unused:false
// jslint unparm:false

// Smooth scrolling for navigation anchor links
var $root = $('html, body'),
  mastHeadHeight = $('.masthead').outerHeight();
$('.nav-left a, .nav-right a').on('click', function () {
  var href = $.attr(this, 'href');
  $root.animate({
    scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - mastHeadHeight
  }, 250, function () {
    window.location.hash = href;
  });
  return false;
});

// Sticky menu on scroll 
var stickyNavigationTop = $('.masthead').offset().top;
function sticky() {
  var scrolled = $(window).scrollTop();
  if (scrolled > stickyNavigationTop) {
    $('.masthead').addClass('scrolled sticky');
    $('.social').addClass('sticky');
  } else {
    $('.masthead').removeClass('scrolled sticky');
    $('.social').removeClass('sticky');
  }
}
sticky();
$(window).on('scroll', function () {
  sticky();
});

// Configuration for video lightbox
$('.lightbox').magnificPopup({
  disableOn: 700,
  type: 'iframe',
  mainClass: 'mfp-fade',
  removalDelay: 160,
  preloader: false,
  fixedContentPos: false
});

// Configuration for Convicts carousel
$('.carousel').slick({
  centerMode: true,
  dots: true,
  initialSlide: 0,
  mobileFirst: true,
  nextArrow: '<button type="button" class="slick-next">Convicted Prisoner</button>',
  prevArrow: '<button type="button" class="slick-prev">Convicted Prisoner</button>',
  slidesToShow: 3
});

// Help us form validation and ajax
$('.letter-form form').validate({
  rules: {
    firstname: {
      minlength: 1,
      required: true
    },
    lastname: {
      minlength: 1,
      required: true
    },
    email: {
      email: true,
      required: true
    }
  },
  errorPlacement: function (error, element) {
    // intenionally blank so the script does not 
    // insert error messages into the DOM
  },
  submitHandler: function (form) {
    $.ajax({
      data: $(form).serialize(),
      dataType: 'json',
      error: function (response, textStatus, errorThrown) {
        console.log('ajax error : ' + errorThrown);
        console.dir('response : ' + response);
      },
      type: 'POST',
      url: 'formprocess.php',
      success: function (response, textStatus, jqXHR) {
        console.log('ajax success');
        var letterFormHeight = $('.letter-form').outerHeight(),
          letterFormWidth = $('.letter-form').outerWidth();
        // Reset form values
        $(this).get(0).reset();

        $('.thankyou').css({
          'display': 'block',
          'height': letterFormHeight,
          'width': letterFormWidth
        }).addClass('visible');
      }
    });
    return false;
  }
});

// Allow thank you modal to fade out on click
$('.thankyou').on('click', function () {
  if ($('.thankyou').hasClass('visible')) {
    $(this).fadeOut('fast');
  }
});
