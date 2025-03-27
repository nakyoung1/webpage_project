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

// JSON 데이터 불러오기
fetch("translations.json")
     .then((response) => response.json())
     .then((data) => {
          const savedLang = localStorage.getItem("lang") || "kor"; // 저장된 언어가 있으면 불러오고, 없으면 기본값(KOR)
          updateText(data[savedLang]);

          // KOR 버튼 클릭 시
          document.getElementById("kor").addEventListener("click", (event) => {
               event.preventDefault(); // 새로고침 방지
               updateText(data.kor);
               localStorage.setItem("lang", "kor");
          });

          // ENG 버튼 클릭 시
          document.getElementById("eng").addEventListener("click", (event) => {
               event.preventDefault(); // 새로고침 방지
               updateText(data.eng);
               localStorage.setItem("lang", "eng");
          });
     })
     .catch((error) => console.error("JSON 파일 로드 중 오류 발생:", error));

// 텍스트 변경 함수
function updateText(langData) {
     console.log("현재 선택된 언어 데이터:", langData); // 확인용 로그

     // 제목 변경
     document.title = langData.title;

     // 메뉴 변경
     document.getElementById("menu_search").textContent = langData.menu_search;
     document.getElementById("menu_location").textContent =
          langData.menu_location;
     document.getElementById("menu_news").textContent = langData.menu_news;

     document.getElementById("menu_search2").textContent =
          langData.menu_search2;
     document.getElementById("menu_location2").textContent =
          langData.menu_location2;
     document.getElementById("menu_news2").textContent = langData.menu_news2;

     // 메인 텍스트 변경
     document.querySelector(".title h3").textContent = langData.title;
     document.querySelector(".title p:nth-of-type(1)").textContent =
          langData.intro_desc;
     document.querySelector(".title p:nth-of-type(2)").textContent =
          langData.intro_subdesc;

     // 메인 페이지 링크 변경
     document.querySelector(".main-page li:nth-child(1) p").textContent =
          langData.what_is;
     document.querySelector(".main-page li:nth-child(2) p").textContent =
          langData.search;
     document.querySelector(".main-page li:nth-child(3) p").textContent =
          langData.food_pairing;
     document.querySelector(".main-page li:nth-child(4) p").textContent =
          langData.liquor_of_the_month;

     // 지도 안내 제목 변경
     document.querySelector(".map h4").textContent = langData.location_guide;
     document.querySelector(".map .link li:nth-child(1) p").textContent =
          langData.brewery;
     document.querySelector(".map .link li:nth-child(2) p").textContent =
          langData.sales_location;
     document.querySelector(".map .link li:nth-child(3) p").textContent =
          langData.tavern;
}
