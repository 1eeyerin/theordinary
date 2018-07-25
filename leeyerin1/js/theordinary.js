/* ==============================

= 디 오디너리 메인 스크립트

현재 자바스크립트 및 제이쿼리 코드는
코드를 쉽고 빠르게 볼 수 있도록 실행 로직을 자세히 설명하고 있습니다.

모든 주석은 본인이 작성하였으며 코드의 이해가 바탕이 되어 구현이 이루어졌습니다

비전공자 혹은 전공자라도 해당 프로젝트의 html의 작성 구조를 파악하지 않았다면
이해가 어려울 수도 있습니다... 죄송합니다...!

이 사이트는 취업 포트폴리오 목적으로 리뉴얼 제작된 사이트입니다.

============================== */


//문서가 모두 준비가 되면 실행해주세요
$(document).ready(function() {
  'use strict';
  var header = $('header');
  //a 기본 이벤트 취소
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
  //ajax를 이용한 상단 하단 파일 붙이기
  $.ajax({
    url: 'include/header.html',
    success: function(data) {
      $('header').append(data);
      gnbUI();
    }
  });
  $.ajax({
    url: 'include/footer.html',
    success: function(data) {
      $('footer').append(data);
      fixbtn();
    }
  });
  //윈도우창에서 스크롤 이벤트가 일어나면 실행할 함수
  $(window).on('scroll', function() {
    //만약 윈도우의 스크롤 양이 700이상이라면 top버튼 및 bottom버튼을 보여줍니다
    if (700 < $(window).scrollTop()) {
      //하지만 'm-open' => 모바일에서 메뉴가 열렸을때는 이프문을 빠져나갑니다
      if ($('header').hasClass('m-open')) return false;
      $('#fix-box').fadeIn();
    } else {
      $('#fix-box').stop().hide();
    }
    //스크롤이 0 이상 이루어진다면 무조건 고정헤더를 실행합니다
    if (0 < $(window).scrollTop()) {
      $(header).addClass('on');
    } else {
      $(header).removeClass('on');
    }
  });
  //top버튼 및 bottom버튼 실행 함수
  function fixbtn() {
    //top버튼이 클릭된다면
    $('.top-btn').click(function() {
      $('html, body').animate({
        //스크롤을 0 => 가장 위로 올려주세요!
        scrollTop: 0
      }, 600);  //0.6초동안 부드럽게요!
      return false;
    });
    //bottom버튼이 클릭된다면
    $('.down-btn').click(function() {
      //문서 body의 스크롤 높이를 측정하여 변수에 저장합니다
      var scrollHeight = document.body.scrollHeight;
      $('html, body').animate({
        //그리고 스크롤값이 문서 위 부분을 기준으로 문서의 높이만큼 내려주세요!
        scrollTop: scrollHeight
      }, 600);
    });
  }
  //슬라이드 메뉴 함수 실행
  function gnbUI() {
    //menu라는 변수에 1차적인 대메뉴를 저장하였습니다
    var menu = $('#gnb > li > a');
    //그리고 header 전체 부분이 아닌 대메뉴에 마우스가 들어왔다면
    //그때 메뉴를 열어주는 클래스를 추가시킵니다
    $(menu).on('mouseenter', function() {
      $(header).addClass('open');
    });
    //또한 마우스가 나간다면 this에 (header) 클래스를 지워 닫아줍니다
    $(header).on('mouseleave', function() {
      $(this).removeClass('open');
    });
    //마찬가지로 키보드 이동이 들어왔을때 :focus
    $('#gnb').on('focusin', function() {
      $(header).addClass('open');
    }).on('focusout', function() {
      $(header).removeClass('open');
    });
    //모바일에서 보여지는 메뉴를 클릭했을때에는 모바일전용 메뉴를 토글로 열고 닫습니다
    $('.mobile-menu').on('click', function() {
      $(header).toggleClass('m-open');
    });
  }
  //메인 이미지 슬라이드
  //변수화 시켜서 가장 위 applyImageSlide 함수의 괄호값만 수정하면 아래는 자동으로 바뀌어 유지보수가 쉽습니다
  //(선택자::이건 첫번째 슬라이드의 인자값 설정입니다, 먼저 보여질 슬라이드, 4초동안 돌아가요, 지금은 자동재생 상태입니다 )
  applyImageSlide('.img-slide:eq(0) .content', 1, 4000, 'play');

  function applyImageSlide(selector, first, speed, status) {
    var numSlide = $(selector).find('ul.slide li').length;  //li의 갯수를 세면 총 슬라이드의 갯수가 됩니다
    var slideNow = 0;
    var slideNext = 0;
    var slidePrev = 0;
    var onPlaying = 0; // 0은 정지 , 1은 실행중입니다
    var timerId = '';
    var timerSpeed = speed;
    var timerStatus = status;

    /* =================================
      인디케이터 주석 처리 (설명, 이유)

      1. li가 있는 만큼 각각 반복합니다 (each)
      2. 총 슬라이드 갯수만큼 비주얼 버튼이 생성되지만 li가 적어 비활성화 시켰습니다
      3. css를 변경하면 보입니다

    ================================= */

    $(selector).find('ul.slide li').each(function(i){
      $(selector).find('ul.indicator').append('<li><a href="#">'+ ( i + 1 ) +'번 비주얼</a></li>\n');
    });

    showSlide(first); //처음 슬라이드부터 실행하게 됩니다

    //만약 타이머의 상태가 play라고 지정되어 있다면
    if (timerStatus === 'play') {
      //기존 span의 글씨를 지우고 PAUSE라고 써줍니다
        $(this).find('span').empty().append('PAUSE');
    } else {
      //일시정지 상태라면 PLAY의 글씨를 써줍니다
        $(this).find('span').empty().append('PLAY');
    }
    //인디케이터 버튼을 누를때 해당하는 순서의 li를 보여줍니다
    $(selector).find('ul.indicator li a').on('click', function() {
      var index = $(selector).find('ul.indicator li').index($(this).parent());
      showSlide(index + 1);
    });
    //이전버튼을 누를때 showSlide함수 아래에 변수 slidePrev의 값에 위치한 li를 보여줍니다
    //== 요약, 이전 슬라이드를 보여줍니다
    $(selector).find('div.control a.prev').on('click', function() {
      showSlide(slidePrev);
    });
    //== 요약, 다음 슬라이드를 보여줍니다
    $(selector).find('div.control a.next').on('click', function() {
      showSlide(slideNext);
    });

    //플레이버튼을 누를때
    $(selector).find('div.control a.play').on('click', function() {
      //재생중이면
      if (timerStatus === 'play') {
        //setrTimeout 함수가 담겨진 timeid를 찾아 실행을 제거합니다
        clearTimeout(timerId);
        //그리고 상태를 stop으로 바꿔줍니다
        timerStatus = 'stop';
        //버튼을 다시누르면 play로 바뀌기 때문에 버튼의 글씨는 play입니다
        $(this).find('span').empty().append('PLAY');
      } else {
        //stop인 경우에는
        timerStatus = 'play';
        //setTimeout 함수 생성
        timerId = setTimeout(function() {
          //재생시 다음 슬라이드 노출
          showSlide(slideNext);
        }, timerSpeed);
        //글씨 pause
        $(this).find('span').empty().append('PAUSE');
      }
    });

    function showSlide(n) {
      //현재 슬라이드가 n이거나 onplaying의 함수가 1이라면 <<- 아직 모든 애니메이션이 끝나지 않았음
      // return 시켜서 모든애니메이션이 끝날때까지 밑에 함수가 중복으로 실행되지 않습니다
      if (slideNow === n || onPlaying === 1) return false;
      clearTimeout(timerId);
      onPlaying = 1;
      //이전슬라이드는 숨겨줍니다
      //stop true는 애니메이션이 실행되기 전에 모든 실행을 지우고 애니메이션이 실행되어 오류를 막아줍니다
      $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').stop(true).animate({
        'opacity': '0'
      }, 500, function() {
        $(this).css({
          'display': 'none'
        });
        //애니메이션이 끝나면 onplaying는 0으로 변수값이 변경됩니다.
        onPlaying = 0;
      });
      //해당 슬라이드는 보여집니다
      //n은 사용자가 선택한 숫자이기 때문에 eq안에 값을 넣을 때에는 -1을 해줍니다 eq(0)은 첫번째입니다
      $(selector).find('ul.slide li:eq(' + (n - 1) + ')').css({
        'display': 'block',
        'opacity': '0'
      }).stop(true).animate({
        'opacity': '1'
      }, 500);
      //모든 인디케이터는 클래스를 지워주고 해당 li만 클래스를 주게됩니다
      $(selector).find('ul.indicator li').removeClass('on');
      $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
      slideNow = n;
      //만약 다음 슬라이드가 최대 슬라이드갯수보다 크다면 1로 돌아갑니다 아니면 그대로 n+1을 해줍니다
      slideNext = (n + 1 > numSlide) ? 1 : (n + 1);
      slidePrev = (n - 1 < 1) ? numSlide : (n - 1);
      //다음 슬라이드로 이동시킵니다 (자동 슬라이드)
      if (timerStatus === 'play') {
        timerId = setTimeout(function() {
          showSlide(slideNext);
        }, timerSpeed);
      }
    }
  }
  //#section02 hover focus trigger
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

  showContents();

  function showContents() {
    var scrollTop = 0;
    var offsetTop = 0;  //document all
    var startEffect = 0;  //event start
    var endEffect = 0;

    checkScroll();
    $(window).on('scroll resize', function() {
      checkScroll();
    });
    
    function checkScroll() {
      scrollTop = $(document).scrollTop();
      $('.content.scroll').each(function() {  //each
        offsetTop = $(this).offset().top;
        startEffect = offsetTop - $(window).height();   //event start = offset - window height
        endEffect = offsetTop + $(this).outerHeight();  //event end = document height + this outer height
        if (scrollTop > startEffect && scrollTop < endEffect) {
          $(this).addClass('on');
        } else {
          $(this).removeClass('on');
        }
      });
    }
  }
});