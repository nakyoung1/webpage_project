$(function () {
     //토글 메뉴 플러그인 실행
     var toggle = $(".toggle");
     var menu = $(".mobile_menu");
     $(toggle).on("click", function (e) {
          e.preventDefault(); // 이벤트 기본동작 실행 막기
          menu.slideToggle();
     });
});

$(document).ready(function () {
     $(".slider").slick({
          slidesToShow: 3, // 기본적으로 4장 표시
          slidesToScroll: 1, // 한 번에 1장씩 이동
          dots: true,
          autoplay: true,
          autoplaySpeed: 1000,
          speed: 1000,
          infinite: true,
          centerMode: true,
          prevArrow: false /* 이전 버튼 비활성화 */,
          nextArrow: false,
          variableWidth: false, // 동일한 크기로 정렬
          responsive: [
               {
                    breakpoint: 1200, // 태블릿 이하
                    settings: {
                         slidesToShow: 3, // 3장 표시
                    },
               },
               {
                    breakpoint: 768, // 모바일 (가로 모드)
                    settings: {
                         slidesToShow: 2, // 2장 표시
                    },
               },
          ],
     });

     $(window).on("scroll", function () {
          if ($(this).scrollTop() > 50) {
               $("#topButton").fadeIn(); // 버튼 나타남
          } else {
               $("#topButton").fadeOut(); // 버튼 사라짐
          }
     });
     // 버튼 클릭 시 최상단으로 이동
     $("#topButton").on("click", function () {
          $("html, body").animate({ scrollTop: 0 }, 300); // 0.5초(500ms) 동안 스크롤 업
     });
     $("header p").on("click", function () {
          $("html, body").animate({ scrollTop: 0 }, 300); // 0.5초(500ms) 동안 스크롤 업
     });
});
