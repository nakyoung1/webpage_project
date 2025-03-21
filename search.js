$(function () {
     //토글 메뉴 플러그인 실행
     var toggle = $(".toggle");
     var menu = $(".mobile_menu");
     $(toggle).on("click", function (e) {
          e.preventDefault(); // 이벤트 기본동작 실행 막기
          menu.slideToggle();
     });
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

//한글,영어 사이트
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
     document.getElementById("menu_location").textContent = langData.menu_location;
     document.getElementById("menu_news").textContent = langData.menu_news;

     document.getElementById("menu_search2").textContent = langData.menu_search2;
     document.getElementById("menu_location2").textContent = langData.menu_location2;
     document.getElementById("menu_news2").textContent = langData.menu_news2;
}

document.addEventListener("DOMContentLoaded", function () {
     const searchForm = document.getElementById("searchForm");
     const searchBtn = document.querySelector(".searchBtn");
     const searchInput = document.getElementById("searchInput");
     const searchResult = document.querySelector(".search-result");
     const degreeFilter = document.getElementById("degreeFilter");

     // Fetch data and display it based on the current filter setting
     function fetchDataAndDisplay() {
          fetch(
               "https://api.odcloud.kr/api/15048755/v1/uddi:1037e3c8-3964-47e4-afba-b4f0dd3eeef6?page=1&perPage=1200&serviceKey=8X10qoVSgE2ytUQ%2BdWPy%2FEGus5FctvcgR9fFamJrYvXalk%2BhWRubrHyFjHyBylM83T9oNcQ7CLyiaTPsJ6IygA%3D%3D"
          )
               .then((response) => response.json())
               .then((data) => {
                    displayData(data.data || []);
               });
     }

     searchInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
               e.preventDefault(); // 엔터 키 입력 차단
               fetchDataAndDisplay(); // 데이터 검색 및 표시 함수 호출
          }
     });

     searchBtn.addEventListener("click", function (e) {
          e.preventDefault(); // 폼 제출 방지
          fetchDataAndDisplay(); // 데이터 검색 및 표시 함수 호출
     });

     // Display data based on the current degree filter
     function displayData(data) {
          let filteredData = data;

          switch (degreeFilter.value) {
               case "under10":
                    filteredData = filteredData.filter((item) => parseFloat(item.도수) <= 10);
                    break;
               case "10to20":
                    filteredData = filteredData.filter(
                         (item) => parseFloat(item.도수) > 10 && parseFloat(item.도수) <= 20
                    );
                    break;
               case "20to30":
                    filteredData = filteredData.filter(
                         (item) => parseFloat(item.도수) > 20 && parseFloat(item.도수) <= 30
                    );
                    break;
               case "30to40":
                    filteredData = filteredData.filter(
                         (item) => parseFloat(item.도수) > 30 && parseFloat(item.도수) <= 40
                    );
                    break;
               case "40to50":
                    filteredData = filteredData.filter(
                         (item) => parseFloat(item.도수) > 40 && parseFloat(item.도수) <= 50
                    );
                    break;
               case "over50":
                    filteredData = filteredData.filter((item) => parseFloat(item.도수) > 50);
                    break;
               default:
                    break;
          }

          searchResult.innerHTML = ""; // Clear previous results
          filteredData.forEach((item) => {
               searchResult.innerHTML += `
             
                 <div class="item">
                   <h4>${item.전통주명}</h4>
                   <div class="item_content">
                     <p>도수: ${item.도수}도</p>
                     <p>규격: ${item.규격}</p>
                     <p>제조사: ${item.제조사}</p>
                     <p>주원료: ${item.주원료}</p>
                     </div>
                 </div>
                 `;
          });
     }
});
