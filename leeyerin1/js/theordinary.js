$(document).ready(function() {
  'use strict';
  var header = $('header');
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
  //ajax
  //main-page
  if ($('body').hasClass('main-page')) {
    $.ajax({
      url: 'include/header.html',
      success: function(data) {
        $('header').append(data);
        gnbUI();
      }
    });
  } else {
    $.ajax({
      url: 'include/sub_header.html',
      success: function(data) {
        $('header').append(data);
        gnbUI();
      }
    });
  }
  //sub-page
  $.ajax({
    url: 'include/footer.html',
    success: function(data) {
      $('footer').append(data);
      fixbtn();
    }
  });
  //close ajax
  //fix
  $(window).on('scroll', function() {
    if (700 < $(window).scrollTop()) {
      if ($('header').hasClass('m-open')) return false;
      $('#fix-box').fadeIn();
    } else {
      $('#fix-box').stop().hide();
    }
    if (0 < $(window).scrollTop()) {
      $(header).addClass('on');
    } else {
      $(header).removeClass('on');
    }
  });

  function fixbtn() {
    $('.top-btn').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });
    $('.down-btn').click(function() {
      var scrollHeight = document.body.scrollHeight;
      $('html, body').animate({
        scrollTop: scrollHeight
      }, 600);
    });
  }
  //close fix
  //slide-menu
  function gnbUI() {
    var menu = $('#gnb > li > a');
    $(menu).on('mouseenter', function() {
      $(header).addClass('open');
    });
    $(header).on('mouseleave', function() {
      $(this).removeClass('open');
    });
    $('#gnb').on('focusin', function() {
      $(header).addClass('open');
    }).on('focusout', function() {
      $(header).removeClass('open');
    });
    $('.mobile-menu').on('click', function() {
      $(header).toggleClass('m-open');
    });
  }
  //close slide-menu
  //banner-close
  $('.top-banner-close').on('click', function(e) {
    $('#section01').css({
      'height': '0'
    }, 500);
  });
  //close banner-close
  //image-slide
  applyImageSlide('.img-slide:eq(0) .content', 1, 7000, 'play');

  function applyImageSlide(selector, first, speed, status) {
    var numSlide = $(selector).find('ul.slide li').length;
    var slideNow = 0;
    var slideNext = 0;
    var slidePrev = 0;
    var onPlaying = 0;
    var timerId = '';
    var timerSpeed = speed;
    var timerStatus = status;
    showSlide(first);
    if (timerStatus === 'play') {
      $(selector).find('p.control a.play i').attr({
        'class': 'fa fa-pause'
      });
    } else {
      $(selector).find('p.control a.play i').attr({
        'class': 'fa fa-play'
      });
    }
    $(selector).find('ul.indicator li a').on('click', function() {
      var index = $(selector).find('ul.indicator li').index($(this).parent());
      showSlide(index + 1);
    });
    $(selector).find('p.control a.prev').on('click', function() {
      showSlide(slidePrev);
    });
    $(selector).find('p.control a.next').on('click', function() {
      showSlide(slideNext);
    });
    $(selector).find('p.control a.play').on('click', function() {
      if (timerStatus === 'play') {
        clearTimeout(timerId);
        timerStatus = 'stop';
        $(this).find('i').attr({
          'class': 'fa fa-play'
        });
      } else {
        timerStatus = 'play';
        timerId = setTimeout(function() {
          showSlide(slideNext);
        }, timerSpeed);
        $(this).find('i').attr({
          'class': 'fa fa-pause'
        });
      }
    }); //play click close
    function showSlide(n) {
      if (slideNow === n || onPlaying === 1) return false;
      clearTimeout(timerId);
      onPlaying = 1;
      $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').stop(true).animate({
        'opacity': '0'
      }, 500, function() {
        $(this).css({
          'display': 'none'
        });
        onPlaying = 0;
      });
      $(selector).find('ul.slide li:eq(' + (n - 1) + ')').css({
        'display': 'block',
        'opacity': '0'
      }).stop(true).animate({
        'opacity': '1'
      }, 500);
      $(selector).find('ul.indicator li').removeClass('on');
      $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
      slideNow = n;
      slideNext = (n + 1 > numSlide) ? 1 : (n + 1);
      slidePrev = (n - 1 < 1) ? numSlide : (n - 1);
      if (timerStatus === 'play') {
        timerId = setTimeout(function() {
          showSlide(slideNext);
        }, timerSpeed);
      }
    }
  }
  //close image-slide
  //#section03,04 hover focus trigger
  $('.trigger li div').on('mouseenter', function() {
    $(this).parent().addClass('on');
  }).on('mouseleave', function() {
    if ($(this).parent().hasClass('fix-on')) return false;
    $(this).parent().removeClass('on');
  });
  $('.trigger li div').on('focusin', function() {
    $(this).parent().addClass('on');
  }).on('focusout', function() {
    if ($(this).parent().hasClass('fix-on')) return false;
    $(this).parent().removeClass('on');
  });
  //close #section03 focus trigger
});