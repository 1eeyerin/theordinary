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
      url: '../include/header.html',
      success: function(data) {
        $('header').append(data);
        gnbUI();
      }
    });
  } else {
    $.ajax({
      url: '../include/sub_header.html',
      success: function(data) {
        $('header').append(data);
        gnbUI();
      }
    });
  }
  //sub-page
  $.ajax({
    url: '../include/footer.html',
    success: function(data) {
      $('footer').append(data);
      fixbtn();
    }
  });
  //close ajax
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
  //login no-member tab menu
  $('.tab-box li').on('click', function() {
    var tabId = $(this).attr('data-tab');
    $('.tab-box li').removeClass('block');
    $('.form-tab').removeClass('on');
    $(this).addClass('block');
    $("#" + tabId).addClass('on');
  });
  //close login no-member tab menu
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
  //close faq tab menu
  //login input
  $('.login-box').find('input').on('focusin', function() {
    $(this).parent().find('.login-label').addClass('on');
  }).on('focusout', function() {
    if ($('.login-box').find('input').val() === '') {
      $(this).parent().find('.login-label').removeClass('on');
    }
  });
  //close login input
  //store img click focus function
  $('.store-img a').on('click', function() {
    $('.store-img a').removeClass('current');
    $(this).addClass('current');
    var num = $(this).parent().find('img').attr('data-num');
    var subject = $(this).parent().parent().find('article').html();
    $('#sub-page').append('<div class="overlay" tabIndex="0"><img src="../img/store-' + num + '.jpg" alt="매장 원본 이미지" />' + subject + '<a href="#">닫기</a></div>');
    $('.overlay').attr('tabindex', 0).focus();
    $('.overlay').on('focus', function() {
      $(this).find('a').focus();
    });
    $('.overlay a').on('click', function() {
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
  //close store img click focus function
  //ul select button
  $('.product-select').on('click', function() {
    $('.product-select ul').toggle();
    $(this).find('li').focus();
  });
  $('.product-select').find('li').on('click', function() {
    var num = $(this).attr('data-desc');
    var text = $(this).text();
    $(this).parent().siblings('div').find('a').empty().append(text);
  });
  $('.product-select').on('mouseleave', function() {
    $('.product-select ul').hide();
  });
  //close ul select button
  //product order btn
  $('.product-item').find('a').on('mouseenter', function() {
    var text = $(this).html();
    $(this).empty().append('구매하기').css({'background':'#ce995c'});
    $(this).on('mouseleave', function(){
      $(this).empty().append(text).css({'background':'#777'});
    });
  });
  $('.product-item').find('a').on('focusin', function() {
    var text = $(this).html();
    $(this).empty().append('구매하기').css({'background':'#ce995c'});
    $(this).on('focusout', function(){
      $(this).empty().append(text).css({'background':'#777'});
    });
  });
  //close product order btn
});