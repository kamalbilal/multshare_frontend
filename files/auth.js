const ApiUrl = "https://multshare.herokuapp.com";
const frontendUrl = "https://multshareapp.herokuapp.com/files";

//garbage

document.getElementById("email").value = "testing@gmail.com";
document.getElementById("password").value = "kamal";
//Cookie Encryption
const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};
//Cookie Decryption Remove it in production
const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

//garbage end
const loader = document.querySelector(".lds-roller");
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
    loader.style.display = "none";
    if (data.cookie === "valid") {
      window.location.replace(frontendUrl + "/index.html");
    } else {
      document.querySelector(".form-modal").style.opacity = "1";
    }
  }

  //calling fetch function
  getapi(ApiUrl + "/CheckCookie");
});

function toggleSignup() {
  document.getElementById("login-toggle").style.backgroundColor = "#fff";
  document.getElementById("login-toggle").style.color = "#222";
  document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
  document.getElementById("signup-toggle").style.color = "#fff";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
  document.getElementById("login-toggle").style.backgroundColor = "#57B846";
  document.getElementById("login-toggle").style.color = "#fff";
  document.getElementById("signup-toggle").style.backgroundColor = "#fff";
  document.getElementById("signup-toggle").style.color = "#222";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

//login button
const signBtn = document.querySelector(".login-btn");

const Credentials = document.querySelector(".Credentials");
const Credentials_heading = document.querySelector(".Credentials_heading");

signBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // Defining async function
  async function getapi(url) {
    const cookie = document.cookie;
    // Storing response
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, cookie }),
    });
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (data.login_status === "success") {
      Credentials_heading.innerHTML = "Success";
      Credentials_heading.style.backgroundColor = "#57B846"; // green
      Credentials.style.height = "20px";
      Credentials.style.margin = "15px";
      Credentials.style.opacity = "1";
      setTimeout(function () {
        const login_token = data.login_token;
        document.cookie = "login_to_app=" + login_token + ";domain=;path=/;";
        window.location.replace(frontendUrl + "/index.html");
      }, 1000);
    } else if (data.error === "invalid credentials") {
      Credentials_heading.innerHTML = "Invalid Credentials";
      Credentials_heading.style.backgroundColor = "#dd4b39"; // red
      Credentials.style.height = "20px";
      Credentials.style.margin = "15px";
      Credentials.style.opacity = "1";
      setTimeout(function () {
        Credentials.style.height = "0px";
        Credentials.style.opacity = "0";
        Credentials.style.margin = "0px";
      }, 3000);
    }
  }
  // Calling that async function
  getapi(ApiUrl + "/login");
});

// captcha

// captcha end
