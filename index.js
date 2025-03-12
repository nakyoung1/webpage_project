// $(document).ready(function () {
//      $(".bxslider").bxSlider({
//           minSlides: 2, // 최소 2개 보이게
//           maxSlides: 4, // 최대 4개 보이게
//           slideWidth: 500, // 각 슬라이드 너비 설정 (반응형으로 적용됨)
//           slideMargin: 30,
//           moveSlides: 1, // 한 번에 한 장씩 이동
//           auto: true, // 자동 슬라이드 활성화
//           pause: 2000, // 1초에 한 번씩 넘어감
//           speed: 2000, // 슬라이드 넘어가는 속도 (2초)
//           easing: "easeOutQuad",
//           infiniteLoop: true,
//           ticker: true,
//           controls: false, // 이전/다음 버튼 숨기기 (원하는 경우 true로 변경)
//           pager: false, // 하단 페이지 네비게이션 숨기기 (필요하면 true)
//           responsive: true,
//      });
// });
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
                    breakpoint: 1024, // 태블릿 이하
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
               {
                    breakpoint: 480, // 작은 모바일 화면
                    settings: {
                         slidesToShow: 1, // 1장만 표시
                    },
               },
          ],
     });
});
