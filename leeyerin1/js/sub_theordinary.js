$(document).ready(function() {
  'use strict';
  var header = $('header');
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
  //ajax
  $.ajax({
    url: '../include/sub_header.html',
    success: function(data) {
      $('header').append(data);
      gnbUI();
    }
  });
  $.ajax({
    url: '../include/footer.html',
    success: function(data) {
      $('footer').append(data);
      fixbtn();
    }
  });
  $.ajax({
    url: '../include/error.html',
    success: function(data) {
      $('.content.error').append(data);
    }
  });
  //fix
  $(window).on('scroll', function() {
    if (700 < $(window).scrollTop()) {
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
  //login tab menu
  $('.tab li').on('click', function() {
    var tabId = $(this).attr('data-tab');
    $('.tab li').removeClass('block');
    $('.form-tab').removeClass('on');
    $(this).addClass('block');
    $("#" + tabId).addClass('on');
  });
  //login input
  $('p.login').find('input').on('focusin', function() {
    $(this).parent().find('label').addClass('on');
  }).on('focusout', function() {
    if ( $(this).val().length == 0 ) {
      $(this).parent().find('label').removeClass('on');
    }
  });
  //faq tab menu
  $('.faq-menu li').on('click', function() {
    var tabId = $(this).attr('data-tab');
    $('.faq-menu li').removeClass('on');
    $(this).addClass('on');
    $('.faq-article').removeClass('block');
    $("#" + tabId).addClass('block');
  });
  $('.faq-article label a').on('click', function() {
    $(this).parent().trigger('click');
  });
  //store img click focus function
  $('.store-img a').on('click', function() {
    //now focus
    $('.store-img a').removeClass('current');
    $(this).addClass('current');
    var num = $(this).parent().find('img').attr('data-num');
    var subject = $(this).parent().parent().find('article').html();
    //overlay append
    $('#sub-page').append('<div class="overlay" tabIndex="0"><img src="../img/store-' + num + '.jpg" alt="매장 원본 이미지" />' + subject + '<a href="#" class="pop-close">닫기</a><a href="#" class="return"></a></div>');
    //overlay tabindex=0, focus
    $('.overlay').attr('tabindex', 0).focus();
    //if overlay focus on -> close btn focus
    $('.overlay').on('focus', function() {
      $(this).find('.pop-close').focus();
    });
    //if return focus on -> close btn focus = infinite focus
    $('.return').on('focus', function() {
      $('.pop-close').focus();
    });
    //pop-close btn click -> div remove -> now focus move
    $('.pop-close').on('click', function() {
      $(this).parent().remove();
      $('.current').focus();
    });
  });
  $('.store-img a').on('mouseenter', function() {
    $(this).css({
      'opacity': 1
    });
  }).on('mouseleave', function() {
    $(this).css({
      'opacity': 0
    });
  });
  $('.store-img a').on('focusin', function() {
    $(this).css({
      'opacity': 1
    });
  }).on('focusout', function() {
    $(this).css({
      'opacity': 0
    });
  });
  //vitamin select button
  $('.vitamin .content > div').on('click', function() {
    $('.vitamin .content > div ul').toggle();
    $(this).find('li').focus();
  });
  $('.vitamin .content > div').find('li').on('click', function() {
    var num = $(this).attr('data-desc');
    var text = $(this).text();
    $(this).parent().siblings('div').find('a').empty().append(text);
  });
  $('.vitamin .content > div').on('mouseleave', function() {
    $('.vitamin .content > div ul').hide();
  });
  //vitamin order btn
  $('.vit-product li').find('a').on('mouseenter', function() {
    var text = $(this).html();
    $(this).empty().append('구매하기').css({
      'background': '#ce995c'
    });
    $(this).on('mouseleave', function() {
      $(this).empty().append(text).css({
        'background': '#777'
      });
    });
  });
  $('.vit-product li').find('a').on('focusin', function() {
    var text = $(this).html();
    $(this).empty().append('구매하기').css({
      'background': '#ce995c'
    });
    $(this).on('focusout', function() {
      $(this).empty().append(text).css({
        'background': '#777'
      });
    });
  });
  //placeholder ie9 issue
  $('input, textarea').placeholder();
});