document.addEventListener("DOMContentLoaded", function () {
     var imgBox = document.querySelector(".cardnews-img-box");
     var sections = document.querySelectorAll(".cardnews section");
     var backButtons = document.querySelectorAll(".back-button");

     var thumbnails = document.querySelectorAll(".cardnews-img-box img");
     thumbnails.forEach(function (thumbnail, index) {
          thumbnail.addEventListener("click", function () {
               //썸네일을 클릭했을때 스크롤 상단으로 올림
               window.scrollTo(0, 0);

               // 이미지 박스 숨김
               imgBox.style.display = "none";

               // 모든 섹션을 숨김
               sections.forEach(function (section) {
                    section.style.display = "none";
               });

               // 해당 섹션 표시
               var sectionId = "cardnews" + (index + 1);
               var activeSection = document.getElementById(sectionId);
               if (activeSection) {
                    activeSection.style.display = "flex";
               }
          });
     });

     // 뒤로가기 버튼 이벤트 처리
     backButtons.forEach(function (button) {
          button.addEventListener("click", function () {
               // 모든 섹션 숨김
               sections.forEach(function (section) {
                    section.style.display = "none";
               });

               // 이미지 박스 표시
               imgBox.style.display = "flex";
          });
     });
});

//메인페이지에서 cardnews 썸네일 눌렀을 때 section을 보여주는 함수
document.addEventListener("DOMContentLoaded", function () {
     var imgBox = document.querySelector(".cardnews-img-box");
     var sections = document.querySelectorAll(".cardnews section");
     var backButtons = document.querySelectorAll(".back-button");
     var thumbnails = document.querySelectorAll(".cardnews-img-box img");

     // URL 해시 확인하여 해당 섹션 표시
     function displaySectionFromHash() {
          const hash = window.location.hash;
          if (hash) {
               const targetSection = document.querySelector(hash);
               if (targetSection) {
                    imgBox.style.display = "none"; // 이미지 박스 숨김
                    sections.forEach(
                         (section) => (section.style.display = "none")
                    ); // 모든 섹션 숨김
                    targetSection.style.display = "flex"; // 해당 섹션만 표시
               }
          }
     }

     // 페이지 로드 시 해시 기반 섹션 표시
     displaySectionFromHash();

     // 썸네일 클릭 이벤트
     thumbnails.forEach(function (thumbnail, index) {
          thumbnail.addEventListener("click", function () {
               window.scrollTo(0, 0);
               imgBox.style.display = "none";
               sections.forEach(function (section) {
                    section.style.display = "none";
               });
               var sectionId = "cardnews" + (index + 1);
               var activeSection = document.getElementById(sectionId);
               if (activeSection) {
                    activeSection.style.display = "flex";
               }
          });
     });

     // 뒤로가기 버튼 이벤트 처리
     backButtons.forEach(function (button) {
          button.addEventListener("click", function () {
               sections.forEach(function (section) {
                    section.style.display = "none";
               });
               imgBox.style.display = "flex";
          });
     });

     // 해시 변경 감지
     window.addEventListener("hashchange", displaySectionFromHash);
});
