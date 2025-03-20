// JSON 데이터 불러오기
fetch("translations.json")
     .then((response) => response.json())
     .then((data) => {
          console.log("🌍 현재 언어:", savedLang);
          // 저장된 언어 가져오기 (없으면 기본값 "kor")
          let savedLang = localStorage.getItem("lang") || "kor";

          // JSON 데이터에서 해당 언어의 데이터가 있는지 확인 후 업데이트
          if (data[savedLang]) {
               updateText(data[savedLang]);
          } else {
               console.error("🚨 저장된 언어 데이터가 JSON 파일에 없음:", savedLang);
               updateText(data.kor); // 기본값으로 한국어 설정
               localStorage.setItem("lang", "kor"); // 기본값 저장
          }

          // KOR 버튼 클릭 시
          document.getElementById("kor").addEventListener("click", (event) => {
               event.preventDefault();
               updateText(data.kor);
               localStorage.setItem("lang", "kor");
          });

          // ENG 버튼 클릭 시
          document.getElementById("eng").addEventListener("click", (event) => {
               event.preventDefault();
               updateText(data.eng);
               localStorage.setItem("lang", "eng");
          });

          console.log("🌍 현재 언어:", savedLang);
     })
     .catch((error) => console.error("❌ JSON 파일 로드 오류:", error));

// 텍스트 변경 함수
function updateText(langData) {
     console.log("📢 언어 변경:", langData); // 변경되는 값 확인용

     // 제목 변경
     document.title = langData.title;

     // 메뉴 변경
     document.getElementById("menu_search").textContent = langData.menu_search;
     document.getElementById("menu_location").textContent = langData.menu_location;
     document.getElementById("menu_news").textContent = langData.menu_news;
     document.getElementById("menu_search2").textContent = langData.menu_search2;
     document.getElementById("menu_location2").textContent = langData.menu_location2;
     document.getElementById("menu_news2").textContent = langData.menu_news2;

     // "전통주란?" 제목 변경
     const titleEl = document.getElementById("what_is");
     if (titleEl) titleEl.textContent = langData.what_is;

     // 법적 정의 및 설명 변경
     document.getElementById("legal_definition").textContent = langData.legal_definition;
     document.getElementById("definition_1").textContent = langData.definition_1;
     document.getElementById("definition_2").textContent = langData.definition_2;
     document.getElementById("definition_3").textContent = langData.definition_3;
     document.getElementById("definition_4").textContent = langData.definition_4;
     document.getElementById("definition_5").textContent = langData.definition_5;
     document.getElementById("definition_6").textContent = langData.definition_6;
     document.getElementById("definition_7").textContent = langData.definition_7;
}
