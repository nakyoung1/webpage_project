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
               console.error(
                    "🚨 저장된 언어 데이터가 JSON 파일에 없음:",
                    savedLang
               );
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

     Object.keys(langData).forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
               element.textContent = langData[id];
          } else {
               console.warn(
                    "⚠️ ID에 해당하는 HTML 요소를 찾을 수 없습니다:",
                    id
               );
          }
     });
}
