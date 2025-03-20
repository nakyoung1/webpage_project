fetch("link")
     .then((response) => response.json())
     .then((data) => {
          document.getElementById("searchBtn").addEventListener("clidk", (e) => {
               e.preventDefault();
          });
     });
