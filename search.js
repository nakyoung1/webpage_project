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

//전통주 검색
// document.addEventListener("DOMContentLoaded", function () {
//      const searchForm = document.getElementById("searchForm");
//      const searchBtn = document.querySelector(".searchBtn");
//      const searchInput = document.getElementById("searchInput");
//      const searchResult = document.querySelector(".search-result");
//      const degreeFilter = document.getElementById("degreeFilter");
//      const sortByNameBtn = document.getElementById("sortByNameBtn");
//      const sortByAlcoholBtn = document.getElementById("sortByAlcoholBtn");
//      const total = document.querySelector(".total");
//      let currentData = [];

//      // Fetch data and update the display based on the current filter setting
//      function fetchDataAndDisplay() {
//           fetch(
//                "https://api.odcloud.kr/api/15048755/v1/uddi:1037e3c8-3964-47e4-afba-b4f0dd3eeef6?page=1&perPage=1200&serviceKey=8X10qoVSgE2ytUQ%2BdWPy%2FEGus5FctvcgR9fFamJrYvXalk%2BhWRubrHyFjHyBylM83T9oNcQ7CLyiaTPsJ6IygA%3D%3D"
//           )
//                .then((response) => response.json())
//                .then((data) => {
//                     currentData = data.data || [];
//                     displayData(currentData);
//                });
//      }

//      function displayData(data) {
//           let searchText = searchInput.value.trim();
//           let filteredData = searchLiquor(data, searchText);

//           switch (degreeFilter.value) {
//                case "all":
//                     break;
//                case "under10":
//                     filteredData = filteredData.filter((item) => parseFloat(item.도수) <= 10);
//                     break;
//                case "10to20":
//                     filteredData = filteredData.filter(
//                          (item) => parseFloat(item.도수) > 10 && parseFloat(item.도수) <= 20
//                     );
//                     break;
//                case "20to30":
//                     filteredData = filteredData.filter(
//                          (item) => parseFloat(item.도수) > 20 && parseFloat(item.도수) <= 30
//                     );
//                     break;
//                case "30to40":
//                     filteredData = filteredData.filter(
//                          (item) => parseFloat(item.도수) > 30 && parseFloat(item.도수) <= 40
//                     );
//                     break;
//                case "40to50":
//                     filteredData = filteredData.filter(
//                          (item) => parseFloat(item.도수) > 40 && parseFloat(item.도수) <= 50
//                     );
//                     break;
//                case "over50":
//                     filteredData = filteredData.filter((item) => parseFloat(item.도수) > 50);
//                     break;

//                default:
//                     break;
//           }

//           updateDisplay(filteredData);

//           function sortByName(filteredData) {
//                return [...filteredData].sort((a, b) => a.전통주명.localeCompare(b.전통주명));
//           }

//           function sortByAlcoholContent(filteredData) {
//                return [...filteredData].sort((a, b) => parseFloat(a.도수) - parseFloat(b.도수));
//           }
//           sortByNameBtn.addEventListener("click", () => {
//                updateDisplay(sortByName(filteredData));
//           });

//           sortByAlcoholBtn.addEventListener("click", () => {
//                updateDisplay(sortByAlcoholContent(filteredData));
//           });
//      }

//      function searchLiquor(data, searchText) {
//           return data.filter((item) =>
//                item.전통주명.toLowerCase().includes(searchText.toLowerCase())
//           );
//      }

//      function updateDisplay(data) {
//           searchResult.innerHTML = ""; // Clear previous results
//           data.forEach((item) => {
//                searchResult.innerHTML += `
//                  <div class="item">
//                      <h4>${item.전통주명}</h4>
//                      <div class="item_content">
//                          <p>도수: ${item.도수}도</p>
//                          <p>규격: ${item.규격}</p>
//                          <p>제조사: ${item.제조사}</p>
//                          <p>주원료: ${item.주원료}</p>
//                      </div>
//                  </div>`;
//           });
//           total.innerHTML = `총 ${data.length}개`;
//      }

//      // Sorting functions

//      // Event listeners for sorting

//      // Event listeners for form interaction
//      searchForm.addEventListener("submit", function (e) {
//           e.preventDefault();
//           fetchDataAndDisplay();
//      });

//      searchInput.addEventListener("keydown", function (e) {
//           if (e.key === "Enter") {
//                e.preventDefault();
//                fetchDataAndDisplay();
//           }
//      });

//      searchBtn.addEventListener("click", function (e) {
//           e.preventDefault();
//           fetchDataAndDisplay();
//      });

//      degreeFilter.addEventListener("change", fetchDataAndDisplay);
// });

document.addEventListener("DOMContentLoaded", function () {
     const searchForm = document.getElementById("searchForm");
     const searchBtn = document.querySelector(".searchBtn");
     const searchInput = document.getElementById("searchInput");
     const searchResult = document.querySelector(".search-result");
     const degreeFilter = document.getElementById("degreeFilter");
     const sortByNameBtn = document.getElementById("sortByNameBtn");
     const sortByAlcoholBtn = document.getElementById("sortByAlcoholBtn");
     const total = document.querySelector(".total");
     let currentData = [];
     let filteredData = []; // 현재 필터링된 데이터 저장
     let isNameAscending = true; // 가나다 정렬 상태
     let isAlcoholAscending = true; // 도수 정렬 상태

     function fetchDataAndDisplay() {
          fetch(
               "https://api.odcloud.kr/api/15048755/v1/uddi:1037e3c8-3964-47e4-afba-b4f0dd3eeef6?page=1&perPage=1200&serviceKey=8X10qoVSgE2ytUQ%2BdWPy%2FEGus5FctvcgR9fFamJrYvXalk%2BhWRubrHyFjHyBylM83T9oNcQ7CLyiaTPsJ6IygA%3D%3D"
          )
               .then((response) => response.json())
               .then((data) => {
                    currentData = data.data || [];
                    displayData(currentData);
               });
     }

     function searchLiquor(data, searchText) {
          return data.filter((item) =>
               item.전통주명.toLowerCase().includes(searchText.toLowerCase())
          );
     }

     function displayData(data) {
          let searchText = searchInput.value.trim();
          filteredData = searchLiquor(currentData, searchText);

          switch (degreeFilter.value) {
               case "all":
                    break;
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
          }

          updateDisplay(filteredData);
     }

     function updateDisplay(data) {
          searchResult.innerHTML = ""; // Clear previous results
          data.forEach((item) => {
               searchResult.innerHTML += `
                 <div class="item">
                     <h4>${item.전통주명}</h4>
                     <div class="item_content">
                         <p>도수: ${item.도수}도</p>
                         <p>규격: ${item.규격}</p>
                         <p>제조사: ${item.제조사}</p>
                         <p>주원료: ${item.주원료}</p>
                     </div>
                 </div>`;
          });
          total.innerHTML = `총 ${data.length}개`;
     }

     sortByNameBtn.addEventListener("click", () => {
          isNameAscending = !isNameAscending;
          const sortedData = sortByName(filteredData, isNameAscending);
          updateDisplay(sortedData);
     });

     sortByAlcoholBtn.addEventListener("click", () => {
          isAlcoholAscending = !isAlcoholAscending;
          const sortedData = sortByAlcoholContent(filteredData, isAlcoholAscending);
          updateDisplay(sortedData);
     });

     function sortByName(data, ascending) {
          if (ascending) {
               return [...data].sort((a, b) => b.전통주명.localeCompare(a.전통주명));
          } else {
               return [...data].sort((a, b) => a.전통주명.localeCompare(b.전통주명));
          }
     }

     function sortByAlcoholContent(data, ascending) {
          if (ascending) {
               return [...data].sort((a, b) => parseFloat(b.도수) - parseFloat(a.도수));
          } else {
               return [...data].sort((a, b) => parseFloat(a.도수) - parseFloat(b.도수));
          }
     }

     searchForm.addEventListener("submit", function (e) {
          e.preventDefault();
          fetchDataAndDisplay();
     });

     searchInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
               e.preventDefault();
               fetchDataAndDisplay();
          }
     });

     searchBtn.addEventListener("click", function (e) {
          e.preventDefault();
          fetchDataAndDisplay();
     });

     degreeFilter.addEventListener("change", fetchDataAndDisplay);
});
