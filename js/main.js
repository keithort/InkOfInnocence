// jshint unused:false, maxlen:false
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
    $('body').css({
      'padding-top' : $('.masthead').outerHeight()
    });
    $('.masthead').addClass('sticky');
    $('.social').addClass('sticky');
  } else {
    $('body').css({
      'padding-top' : '0px'
    });
    $('.masthead').removeClass('sticky');
    $('.social').removeClass('sticky');
  }
}
sticky();
$(window).on('scroll', function () {
  sticky();
});

// Social media
$('.socicon').on('click', function () {
  if ($(this).hasClass('facebook')) {
    ga('send', 'event', 'Navigation', 'Share', 'FB');
    window.open('https://www.facebook.com/dialog/share?app_id=911788002215384&display=popup&href=https%3A%2F%2Fwww.inkofinnocence.org&redirect_uri=https%3A%2F%2Fwww.inkofinnocence.org', 'sharer', 'top=20,left=50,toolbar=0,status=0,width=626,height=305'); 
  }
  else if ($(this).hasClass('twitter')) {
    ga('send', 'event', 'Navigation', 'Share', 'Twitter');
    window.open('https://twitter.com/intent/tweet?text=Up%20to%20100,000%20people%20in%20US%20prisons%20are%20innocent.%20Put%20DNA%20that%20could%20set%20them%20free%20directly%20in%20front%20of%20lawmakers.%20https://inkofinnocence.org', 'sharer', 'top=20,left=50,toolbar=0,status=0,width=626,height=305');    
  }
  else if ($(this).hasClass('googleplus')) {
    ga('send', 'event', 'Navigation', 'Share', 'Google+');
    window.open('https://plus.google.com/share?url=https%3A//www.inkofinnocence.org', 'sharer', 'top=20,left=50,toolbar=0,status=0,width=626,height=305');    
  }
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
  console.log('slide ' + currentSlide);
  changeText(currentSlide);
});

// Modifcations to carousel library
var topText = [
  "They’ve taken my name. They’ve taken my family.",
  "They’ve taken my freedom. They’ve taken my dignity.",
  "They’ve taken my friends. They’ve taken my children.",
  "They’ve taken my name. They’ve taken my family.",
  "They’ve taken my reputation. They’ve taken my credibility."
];
var bottomText = [
  "They’ve taken my life.",
  "They’ve taken everything.",
  "They haven’t taken my hope.",
  "They’ve taken everyone.",
  "They’ve taken my future."
];
function changeText(currentSlide) {
  console.log('function currentSlide ' + currentSlide);
  console.log(topText[currentSlide]);
  console.log(bottomText[currentSlide]);
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
