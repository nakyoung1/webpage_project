// API 를 가져와서 전통주 검색하는 기능 구현
document.addEventListener("DOMContentLoaded", function () {
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
          // 공공데이터 가져오기
          fetch(
               "https://api.odcloud.kr/api/15048755/v1/uddi:1037e3c8-3964-47e4-afba-b4f0dd3eeef6?page=1&perPage=1200&serviceKey=8X10qoVSgE2ytUQ%2BdWPy%2FEGus5FctvcgR9fFamJrYvXalk%2BhWRubrHyFjHyBylM83T9oNcQ7CLyiaTPsJ6IygA%3D%3D"
          )
               .then((response) => response.json())
               .then((data) => {
                    //data.data가 없으면 빈 배열로 초기화
                    currentData = data.data || [];
                    displayData(currentData);
               });
     }
     // 전통주명으로 검색하기
     function searchLiquor(data, searchText) {
          return data.filter((item) =>
               item.전통주명.toLowerCase().includes(searchText.toLowerCase())
          );
     }

     // 도수별로 보여주는 함수
     function displayData(data) {
          let searchText = searchInput.value.trim();
          filteredData = searchLiquor(currentData, searchText);

          switch (degreeFilter.value) {
               case "all":
                    break;
               case "under10":
                    filteredData = filteredData.filter(
                         (item) => parseFloat(item.도수) <= 10
                    );
                    break;
               case "10to20":
                    filteredData = filteredData.filter(
                         (item) =>
                              parseFloat(item.도수) > 10 &&
                              parseFloat(item.도수) <= 20
                    );
                    break;
               case "20to30":
                    filteredData = filteredData.filter(
                         (item) =>
                              parseFloat(item.도수) > 20 &&
                              parseFloat(item.도수) <= 30
                    );
                    break;
               case "30to40":
                    filteredData = filteredData.filter(
                         (item) =>
                              parseFloat(item.도수) > 30 &&
                              parseFloat(item.도수) <= 40
                    );
                    break;
               case "40to50":
                    filteredData = filteredData.filter(
                         (item) =>
                              parseFloat(item.도수) > 40 &&
                              parseFloat(item.도수) <= 50
                    );
                    break;
               case "over50":
                    filteredData = filteredData.filter(
                         (item) => parseFloat(item.도수) > 50
                    );
                    break;
          }

          updateDisplay(filteredData);
     }

     // 검색된 결과 보여주는 함수
     function updateDisplay(data) {
          searchResult.innerHTML = ""; //
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
          // 총 검색된 개수는 데이터의 길이
          total.innerHTML = `Total : ${data.length}`;
     }
     //이름순으로 정렬 오름차순,내림차순
     sortByNameBtn.addEventListener("click", () => {
          isNameAscending = !isNameAscending;
          const sortedData = sortByName(filteredData, isNameAscending);
          updateDisplay(sortedData);
     });
     //도수순으로 정렬 오름차순,내림차순
     sortByAlcoholBtn.addEventListener("click", () => {
          isAlcoholAscending = !isAlcoholAscending;
          const sortedData = sortByAlcoholContent(
               filteredData,
               isAlcoholAscending
          );
          updateDisplay(sortedData);
     });
     //이름순으로 정렬
     function sortByName(data, ascending) {
          if (ascending) {
               return [...data].sort((a, b) =>
                    b.전통주명.localeCompare(a.전통주명)
               );
          } else {
               return [...data].sort((a, b) =>
                    a.전통주명.localeCompare(b.전통주명)
               );
          }
     }
     //도수순으로 정렬
     function sortByAlcoholContent(data, ascending) {
          if (ascending) {
               return [...data].sort(
                    (a, b) => parseFloat(b.도수) - parseFloat(a.도수)
               );
          } else {
               return [...data].sort(
                    (a, b) => parseFloat(a.도수) - parseFloat(b.도수)
               );
          }
     }

     // 엔터키로 검색
     searchInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
               e.preventDefault();
               fetchDataAndDisplay();
          }
     });
     //검색 버튼 눌러서 검색
     searchBtn.addEventListener("click", function (e) {
          e.preventDefault();
          fetchDataAndDisplay();
     });

     degreeFilter.addEventListener("change", fetchDataAndDisplay);
});
