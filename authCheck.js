const ApiUrl = "https://multshare.herokuapp.com";
const frontendUrl = "https://multshareapp.herokuapp.com/files";

const authBtn = document.querySelector(".authBtn");
const authBtn2 = document.querySelector(".authBtn2");

document.addEventListener("DOMContentLoaded", () => {
  async function getapi(url) {
    // alert("Dom");
    const cookie = document.cookie;
    // Storing response
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ cookie }),
    });
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (data.cookie === "valid") {
      //   window.location.replace(frontendUrl + "/index.html");
      authBtn.innerHTML = "My Account";
      authBtn.setAttribute("href", frontendUrl + "/index.html");
      authBtn2.innerHTML = "Goto my Account";
      authBtn2.setAttribute("href", frontendUrl + "/index.html");
    }
  }

  //calling fetch function
  getapi(ApiUrl + "/CheckCookie");
});
