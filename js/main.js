// jshint unused:false, maxlen:false
// jslint unparm:false

// Mobile nav display toggling
$('a.mobile, a.close').on('click', function () {
  $('.nav, a.close').toggleClass('active');
});

// Smooth scrolling for navigation anchor links
var $root = $('html, body'),
  mastHeadHeight = $('.masthead').outerHeight();
$('.nav a').on('click', function () {
  if ($('.nav').hasClass('active')) {
    $('.nav, a.close').removeClass('active');
  }
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
    $('body').css({
      'padding-top' : $('.masthead').outerHeight()
    });
    $('.masthead').addClass('sticky');
  } else {
    $('body').css({
      'padding-top' : '0px'
    });
    $('.masthead').removeClass('sticky');
  }
}
sticky();
$(window).on('scroll', function () {
  sticky();
  $('.masthead.sticky').css('width', window.innerWidth + ('px'));
  if(navigator.platform.indexOf('iPad') > -1 || navigator.platform.indexOf('iPhone') > -1 || navigator.platform.indexOf('iPod') > -1) {
    $('.masthead.sticky').css('position', 'fixed'); 
  }
});
$(window).resize(function () {
  $('.masthead.sticky').css('width', window.innerWidth + ('px'));
});

// Configuration for Convicts carousel
$('.carousel').slick({
  centerMode: true,
  dots: true,
  infinite: true,
  initialSlide: 0,
  nextArrow: '<button type="button" class="slick-next">Another Accused</button>',
  prevArrow: '<button type="button" class="slick-prev">Another Accused</button>',
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true
});

$('.carousel button').on('click', function (event, slick){
	var currentSlide = $('.carousel').slick('slickCurrentSlide');
  changeText(currentSlide);
});

// Modifcations to carousel library
var topText = [
  "They’ve taken my name. They’ve taken my family.",
  "They’ve taken my freedom. They’ve taken my dignity.",
  "They’ve taken my friends. They’ve taken my children.",
  //"They’ve taken my name. They’ve taken my family.",
  "They’ve taken my reputation. They’ve taken my credibility."
];
var bottomText = [
  "They’ve taken my life.",
  "They’ve taken everything.",
  "They haven’t taken my hope.",
  //"They’ve taken everyone.",
  "They’ve taken my future."
];
function changeText(currentSlide) {
  $('.bottom .dek').html(topText[currentSlide]);
  $('.bottom .quote').html(bottomText[currentSlide]);
  return true;
}
function nextcopy() {
  ga('send', 'event', 'Navigation', 'Click', 'Next Button');
}
function prevcopy() {
  ga('send', 'event', 'Navigation', 'Click', 'Previous Button');
}

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
        var letterFormHeight = $('.letter-form').outerHeight(),
          letterFormWidth = $('.letter-form').outerWidth();
        $('#email, #lastname, #firstname').val("");
        ga('send', 'event', 'Submit', 'Click', 'Send A Letter');

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
