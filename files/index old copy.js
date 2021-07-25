const frontendUrl = "https://multshareapp.herokuapp.com";
const ApiUrl = "https://multshare.herokuapp.com";
const acceptExtentions = [
  "7z",
  "a",
  "apk",
  "ar",
  "bz2",
  "cab",
  "cpio",
  "deb",
  "dmg",
  "egg",
  "gz",
  "iso",
  "jar",
  "lha",
  "mar",
  "pea",
  "rar",
  "rpm",
  "s7z",
  "shar",
  "tar",
  "tbz2",
  "tgz",
  "tlz",
  "war",
  "whl",
  "xpi",
  "zip",
  "zipx",
  "xz",
  "pak",
  "aac",
  "aiff",
  "ape",
  "au",
  "flac",
  "gsm",
  "it",
  "m3u",
  "m4a",
  "mid",
  "mod",
  "mp3",
  "mpa",
  "pls",
  "ra",
  "s3m",
  "sid",
  "wav",
  "wma",
  "xm",
  "mobi",
  "epub",
  "azw1",
  "azw3",
  "azw4",
  "azw6",
  "azw",
  "cbr",
  "cbz",
  "eot",
  "otf",
  "ttf",
  "woff",
  "woff2",
  "3dm",
  "3ds",
  "max",
  "bmp",
  "dds",
  "gif",
  "jpg",
  "jpeg",
  "png",
  "psd",
  "xcf",
  "tga",
  "thm",
  "tif",
  "tiff",
  "yuv",
  "ai",
  "eps",
  "ps",
  "svg",
  "dwg",
  "dxf",
  "gpx",
  "kml",
  "kmz",
  "webp",
  "ods",
  "xls",
  "xlsx",
  "csv",
  "ics",
  "vcf",
  "ppt",
  "odp",
  "doc",
  "docx",
  "ebook",
  "log",
  "md",
  "msg",
  "odt",
  "org",
  "pages",
  "pdf",
  "rtf",
  "rst",
  "tex",
  "txt",
  "wpd",
  "wps",
  "3g2",
  "3gp",
  "aaf",
  "asf",
  "avchd",
  "avi",
  "drc",
  "flv",
  "m2v",
  "m4p",
  "m4v",
  "mkv",
  "mng",
  "mov",
  "mp2",
  "mp4",
  "mpe",
  "mpeg",
  "mpg",
  "mpv",
  "mxf",
  "nsv",
  "ogg",
  "ogv",
  "ogm",
  "qt",
  "rm",
  "rmvb",
  "roq",
  "srt",
  "svi",
  "vob",
  "webm",
  "wmv",
  "yuv",
];

//fetch function
async function checkCookie(url) {
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
  if (data.cookie === "not-valid") {
    window.location.replace(frontendUrl + "/auth.html");
  } else {
    document.querySelector(".app-container").style.opacity = "1";
  }

  //Session Time ------------------------------
  const cookie_Expiry = data.cookieExpiry;
  // Set the date we're counting down to
  var countDownDate = new Date(cookie_Expiry * 1000).getTime();

  //3 dot Loader after 3 seconds
  setTimeout(function () {
    document.querySelector(".ball-loader").style.display = "none";
    document.querySelector(".circle.blink.blue").style.display = "block";
    document.getElementById("expire").style.display = "block";
  }, 1000);

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="expire"
    document.getElementById("expire").innerHTML =
      hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("expire").innerHTML = "EXPIRED";
      alert("Session Expired please login again");
      // window.location.replace(frontendUrl + "/auth.html");
    }
  }, 1000);
  //Session Time End------------------------------
}

document.addEventListener("DOMContentLoaded", () => {
  //calling fetch function
  checkCookie(ApiUrl + "/CheckCookie");
  getUserData(ApiUrl + "/getData");
});

const mobileMenuShowBtn = document.querySelector(".btn-show-left-area");
const mobileMenuLeftArea = document.querySelector(".left-area");

const mobileMenuHideBtn = document.querySelector(".btn-close-left");

const menuBtnFiles = document.querySelector(".menu-btn-files");
const menuBtnUpload = document.querySelector(".menu-btn-upload");
const menuBtnSetting = document.querySelector(".menu-btn-setting");
const menuBtnLogout = document.querySelector(".btn-logout");

const contectSection = document.querySelector(".content-section");
const uploadSection = document.querySelector(".upload");
const settingSection = document.querySelector(".setting");

const showUploadsBtn = document.querySelector(".show-uploads");

// to hide unkown oerflow in files page when it is displayed first time
uploadSection.style.height = "0%";
uploadSection.style.display = "none";
settingSection.style.height = "0%";
contectSection.style.height = "100%";
// to hide unkown oerflow in files page when it is displayed first time end

mobileMenuShowBtn.addEventListener("click", () => {
  mobileMenuLeftArea.classList.add("show");
});
mobileMenuHideBtn.addEventListener("click", () => {
  mobileMenuLeftArea.classList.remove("show");
});

menuBtnFiles.addEventListener("click", () => {
  checkCookie(ApiUrl + "/CheckCookie");
  uploadSection.style.height = "0%";
  uploadSection.style.display = "none";
  settingSection.style.height = "0%";
  contectSection.style.height = "100%";
});

menuBtnUpload.addEventListener("click", () => {
  // checkCookie(ApiUrl + "/CheckCookie");
  contectSection.style.height = "0%";
  settingSection.style.height = "0%";
  uploadSection.style.overflow = "hidden";
  uploadSection.style.display = "flex";
  uploadSection.style.height = "100%";
});
// setting button disabled
// menuBtnSetting.addEventListener("click", () => {
//   // checkCookie(ApiUrl + "/CheckCookie");
//   contectSection.style.height = "0%";
//   uploadSection.style.height = "0%";
//   // uploadSection.style.display = "none";
//   settingSection.style.overflow = "hidden";
//   settingSection.style.height = "100%";
// });

menuBtnLogout.addEventListener("click", () => {
  // document.cookie = "login_to_app=" + "123";
  document.cookie = "login_to_app=" + "123;domain=;path=/;";

  window.location.replace(frontendUrl + "/auth.html");
});

//Active Menu
const items = document.querySelectorAll(".item-link");
items.forEach((item) => {
  item.addEventListener("click", function () {
    items.forEach((a) => {
      a.classList.remove("active");
    });
    mobileMenuLeftArea.classList.remove("show"); // Hide menu when click on menu items
    item.classList.add("active");
  });
});
//Active Menu End

// loader
const loader = document.querySelector(".lds-roller");
// loader end

// Get user data
//convert bytes to kb, mb, gb
function formatBytes(a, b = 2, k = 1024) {
  with (Math) {
    let d = floor(log(a) / log(k));
    return 0 == a
      ? "0 Bytes"
      : parseFloat((a / pow(k, d)).toFixed(max(0, b))) +
          " " +
          ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d];
  }
}
//convert bytes to kb, mb, gb end
var called = 0;
//calling this function from domcontentloaded
async function getUserData(url) {
  called += 1;
  console.log("getUserData function called = " + called);
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
  try {
    var data = await response.json();
    loader.style.display = "none";
    document.querySelector(".app-container").style.display = "flex";
    console.log(data);
    let filesTableDiv = document.querySelector(".files-table");
    filesTableDiv.innerHTML = `<div class="files-table-header">
  <div class="column-header table-cell">Name</div>
  <div class="column-header table-cell size-cell">Size</div>
  <div class="column-header table-cell">Last Modified</div>
  <div class="column-header table-cell">Action</div>
</div>`;

    for (let index = 0; index < data.length; index++) {
      let fileExtention = data[index].originalfilename.split(".").pop();
      if (fileExtention == "7z") fileExtention = "sevenz";
      if (fileExtention == "3dm") fileExtention = "threedm";
      if (fileExtention == "3ds") fileExtention = "threeds";
      if (fileExtention == "3g2") fileExtention = "threeg2";
      if (fileExtention == "3gp") fileExtention = "threegp";
      filesTableDiv.innerHTML += `<div class="files-table-row">
  <div class="table-cell name-cell ${fileExtention}">${
        data[index].originalfilename
      }</div>
  <div class="table-cell">${formatBytes(data[index].size)}</div>
  <div class="table-cell">${data[index].modifieddate}</div>
  <div class="table-cell action-cell">
      <a href="#" class="download-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000"
              class="bi bi-download svgs svg-download" viewBox="0 0 16 16">
              <title>Download</title>
              <path
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path
                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>
      </a>
      <a href="#" class="share-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-share svgs svg-share" viewBox="0 0 16 16">
              <title>Share</title>
              <path
                  d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
      </a>
      <a href="#" class="rename-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000"
              class="bi bi-pencil-sq	Actionuare svgs svg-edit" viewBox="0 0 16 16">
              <title>Rename</title>
              <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
      </a>
      <a href="#" class="delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000"
              class="bi bi-trash svgs svg-trash" viewBox="0 0 16 16">
              <title>Delete</title>
              <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
      </a>
  </div>
</div>`;
    }

    //function for action button to talk to server
    async function modifyUserData(url, filename, toast = "Success") {
      const cookie = document.cookie;
      try {
        // Storing response
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ cookie, filename }),
        });
        // Storing data in form of JSON
        try {
          var data = await response.json();
          getUserData.call(this, ApiUrl + "/getData");
          console.log(data);
          toastText.innerHTML = toast;
          toastFunction("cornflowerblue");
          return data;
        } catch (error) {
          console.log(error);
          toastText.innerHTML = "Something wrong!";
          toastFunction();
        }
      } catch (error) {
        toastText.innerHTML = "Something wrong!";
        toastFunction();
      }
    }

    // enter key variables
    let sharePopup = false;
    let renamePopup = false;
    // enter key variables end

    const actionButtonFunction = (searching = false, searchIndex) => {
      //Download btn
      const downloadButtons = document.querySelectorAll(
        ".action-cell a.download-btn"
      );
      console.log(downloadButtons);
      for (let index = 0; index < downloadButtons.length; index++) {
        downloadButtons[index].addEventListener("click", () => {
          console.log("Download button called");
          console.log("searching = " + searching);
          console.log("index = " + searchIndex);
          let downloadFileName;
          if (searching) {
            downloadFileName = data[searchIndex[index]].modifiedfilename;
          } else {
            downloadFileName = data[index].modifiedfilename;
          }
          const cookie = document.cookie;
          const urlParam = JSON.stringify({ cookie, downloadFileName });
          window.open(ApiUrl + "/actionBtns/download/" + urlParam);
        });
      }

      //Share btn
      const shareDialog = document.querySelector(".share");
      const shareLink = document.querySelector(".share-link");
      const shareCloseBtn = document.querySelector(".share-link-close");
      const shareCopyBtn = document.querySelector(".copy-link");
      const shareButtons = document.querySelectorAll(
        ".action-cell a.share-btn"
      );

      console.log(shareButtons);
      for (let index = 0; index < shareButtons.length; index++) {
        const i = index;
        const outputData = data;
        shareButtons[index].addEventListener("click", () => {
          console.log(searching);

          sharePopup = true;
          let selectedFile_id;
          if (searching) {
            selectedFile_id = data[searchIndex[index]].file_id;
          } else {
            selectedFile_id = data[index].file_id;
          }
          shareLink.innerHTML = ApiUrl + "/file/" + selectedFile_id;
          shareDialog.style.zIndex = "5";
          shareDialog.style.top = "50%";

          shareCloseBtn.addEventListener(
            "click",
            () => {
              sharePopup = false;
              shareDialog.style.top = "-5%";
              shareDialog.style.zIndex = "-1";
            },
            { once: true }
          );

          shareCopyBtn.addEventListener(
            "click",
            (event) => {
              sharePopup = false;
              let range = document.createRange();
              range.selectNode(shareLink);
              window.getSelection().addRange(range);
              try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                console.log("Copying text command was " + msg);
                toastText.innerHTML = "Copied"; //green
                toastFunction("cornflowerblue");
                shareDialog.style.top = "-5%";
                shareDialog.style.zIndex = "-1";
              } catch (err) {
                console.log("Oops, unable to copy");
                toastText.innerHTML = "Copy error"; //green
                toastFunction();
              }
            },
            { once: true }
          );
        });
      }

      //Rename btn
      const renameButtons = document.querySelectorAll(
        ".action-cell a.rename-btn"
      );
      const renameDialog = document.querySelector(".rename");
      const renameInput = document.querySelector(".rename-input");
      const renameCancelBtn = document.querySelector(".rename-link-close");
      const renameBtn = document.querySelector(".renameBtn");
      console.log(renameButtons);
      for (let index = 0; index < renameButtons.length; index++) {
        renameButtons[index].addEventListener("click", () => {
          renamePopup = true;
          let renameFile;
          if (searching) {
            renameFile = data[searchIndex[index]].originalfilename;
          } else {
            renameFile = data[index].originalfilename;
          }
          renameInput.value = renameFile;
          renameDialog.style.zIndex = "5";
          renameDialog.style.top = "50%";

          renameCancelBtn.addEventListener(
            "click",
            () => {
              renameDialog.style.zIndex = "-5";
              renameDialog.style.top = "-5%";
              renamePopup = false;
            },
            { once: true }
          );

          renameBtn.addEventListener(
            "click",
            () => {
              renamePopup = false;
              renameDialog.style.zIndex = "-5";
              renameDialog.style.top = "-5%";
              const renameFilename = {
                rename: renameInput.value,
                originalfilename: renameFile,
              };
              const renameResult = modifyUserData(
                ApiUrl + "/actionBtns/rename",
                renameFilename,
                "File Renamed"
              );
              toastText.innerHTML = "Renaming..."; //green
              toastFunction("cornflowerblue");
              //renamed
            },
            { once: true }
          );
        });
      }

      //Delete btn
      const deleteButtons = document.querySelectorAll(
        ".action-cell a.delete-btn"
      );
      console.log(deleteButtons);
      for (let index = 0; index < deleteButtons.length; index++) {
        deleteButtons[index].addEventListener("click", () => {
          const deleteFileName = data[index].modifiedfilename;
          console.log(deleteFileName);
          const deleteResult = modifyUserData(
            ApiUrl + "/actionBtns/delete",
            deleteFileName,
            "File Deleted"
          );
          toastText.innerHTML = "Deleting..."; //green
          toastFunction("cornflowerblue");
        });
      }

      // Enter key
      document.addEventListener("keyup", function (event) {
        event.preventDefault();
        // Enter key
        if (event.keyCode === 13) {
          if (renamePopup) renameBtn.click();
          if (sharePopup) shareCopyBtn.click();
          // if (searching) searchBtn.click();
        }

        // Esc key
        if (event.keyCode === 27) {
          if (renamePopup) renameCancelBtn.click();
          if (sharePopup) shareCloseBtn.click();
          // if (searching) searchBtn.click();
        }
      });
      // Enter key end

      //Search nav
      const searchInput = document.querySelector(".search-input");
      searchInput.addEventListener("keyup", (event) => {
        const files = document.querySelectorAll(".files-table-row");
        if (!searchInput.value) {
          for (let index = 0; index < files.length; index++) {
            if (files[index].classList.contains("display-none")) {
              files[index].classList.remove("display-none");
            }
          }
        } else {
          for (let index = 0; index < files.length; index++) {
            if (files[index].classList.contains("display-none")) {
              files[index].classList.remove("display-none");
            }
          }
          for (let index = 0; index < files.length; index++) {
            const fileHTML = files[index].childNodes[1].innerHTML;
            if (
              fileHTML.toLowerCase().includes(searchInput.value.toLowerCase())
            ) {
            } else {
              files[index].classList.add("display-none");
            }
          }
        }
      });

      //Search nav end
    };
    actionButtonFunction();
  } catch (error) {
    console.log(error);
    let filesTableDiv = document.querySelector(".files-table");
    filesTableDiv.innerHTML = `<div class="no-data-div"><p class="no-data">No files Found</p class="no-data"></div>`;
    loader.style.display = "none";
    document.querySelector(".app-container").style.display = "flex";
  }
}
// Get user data end

// Toast
const toastText = document.querySelector(".toast-text");
const toast = document.querySelector(".toasts");
const toastFunction = (bg_color = "#dd4b39") => {
  // red
  toastText.style.backgroundColor = bg_color;
  toast.style.zIndex = "10";
  toast.style.top = "27%";
  setTimeout(function () {
    toast.style.zIndex = "-1";
    toast.style.top = "-5%";
  }, 2000);
};
// Toast end

//Upload section
var queued = 0;
var statusCompleted = false;
const uploadFiles = (() => {
  const fileRequests = new WeakMap();
  const ENDPOINTS = {
    UPLOAD: "https://multshare.herokuapp.com/upload",
    UPLOAD_STATUS: "https://multshare.herokuapp.com/upload/status",
    UPLOAD_REQUEST: "https://multshare.herokuapp.com/upload/request",
  };
  const defaultOptions = {
    url: ENDPOINTS.UPLOAD,
    startingByte: 0,
    fileId: "",
    onAbort() {},
    onProgress() {},
    onError() {},
    onComplete() {},
  };

  const uploadFileChunks = (file, options) => {
    const formData = new FormData();
    const req = new XMLHttpRequest();
    const chunk = file.slice(options.startingByte);

    formData.append("chunk", chunk, file.name);
    formData.append("fileId", options.fileId);

    req.open("POST", options.url, true);
    req.setRequestHeader(
      "Content-Range",
      `bytes=${options.startingByte}-${options.startingByte + chunk.size}/${
        file.size
      }`
    );
    req.setRequestHeader("X-File-Id", options.fileId);
    req.setRequestHeader("cookies", document.cookie);

    req.onload = (e) => {
      // it is possible for load to be called when the request status is not 200
      // this will treat 200 only as success and everything else as failure
      if (req.status === 200) {
        options.onComplete(e, file);
      } else {
        options.onError(e, file);
      }
    };

    req.upload.onprogress = (e) => {
      const loaded = options.startingByte + e.loaded;
      options.onProgress(
        {
          ...e,
          loaded,
          total: file.size,
          percentage: (loaded * 100) / file.size,
        },
        file
      );
    };

    req.ontimeout = (e) => options.onError(e, file);

    req.onabort = (e) => options.onAbort(e, file);

    req.onerror = (e) => options.onError(e, file);

    fileRequests.get(file).request = req;

    req.send(formData);
  };
  const uploadFile = (file, options) => {
    return fetch(ENDPOINTS.UPLOAD_REQUEST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        cookie: document.cookie,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        options = { ...options, ...res };
        fileRequests.set(file, { request: null, options });

        uploadFileChunks(file, options);
      })
      .catch((e) => {
        options.onError({ ...e, file });
      });
  };

  const abortFileUpload = async (file) => {
    const fileReq = fileRequests.get(file);

    if (fileReq && fileReq.request) {
      fileReq.request.abort();
      return true;
    }

    return false;
  };

  const retryFileUpload = (file) => {
    const fileReq = fileRequests.get(file);

    if (fileReq) {
      // try to get the status just in case it failed mid upload
      return fetch(
        `${ENDPOINTS.UPLOAD_STATUS}?fileName=${file.name}&fileId=${fileReq.options.fileId}`
      )
        .then((res) => res.json())
        .then((res) => {
          // if uploaded we continue
          uploadFileChunks(file, {
            ...fileReq.options,
            startingByte: Number(res.totalChunkUploaded),
          });
        })
        .catch(() => {
          // if never uploaded we start
          uploadFileChunks(file, fileReq.options);
        });
    }
  };

  const clearFileUpload = async (file) => {
    const fileReq = fileRequests.get(file);

    if (fileReq) {
      await abortFileUpload(file);
      fileRequests.delete(file);

      return true;
    }

    return false;
  };

  const resumeFileUpload = (file) => {
    const fileReq = fileRequests.get(file);

    if (fileReq) {
      return fetch(
        `${ENDPOINTS.UPLOAD_STATUS}?fileName=${file.name}&fileId=${fileReq.options.fileId}`
      )
        .then((res) => res.json())
        .then((res) => {
          uploadFileChunks(file, {
            ...fileReq.options,
            startingByte: Number(res.totalChunkUploaded),
          });
        })
        .catch((e) => {
          fileReq.options.onError({ ...e, file });
        });
    }
  };

  return (files, options = defaultOptions) => {
    [...files].forEach((file) =>
      uploadFile(file, { ...defaultOptions, ...options })
    );

    return {
      abortFileUpload,
      retryFileUpload,
      clearFileUpload,
      resumeFileUpload,
    };
  };
})();

const uploadAndTrackFiles = (() => {
  // const files = new Map();
  const files = new Map();
  const progressBox = document.createElement("div");
  const FILE_STATUS = {
    PENDING: "pending",
    UPLOADING: "uploading",
    PAUSED: "paused",
    COMPLETED: "completed",
    FAILED: "failed",
  };
  let uploader = null;

  progressBox.className = "upload-progress-tracker";
  progressBox.innerHTML = `
				<h3>Uploading 0 Files Queued 0 Files</h3>
				<p class="upload-progress">
					<span class="uploads-percentage">0%</span>
					<span class="success-count">0</span>
					<span class="failed-count">0</span>
					<span class="paused-count">0</span>
				</p>
				<button type="button" class="maximize-btn">Maximize</button>
				<div class="uploads-progress-bar" style="width: 0;"></div>
				<div class="file-progress-wrapper"></div>
			`;
  showUploadsBtn.addEventListener("click", (e) => {
    const maximizeBtn = document.querySelector(".maximize-btn");
    const uploadProgressTracker = document.querySelector(
      ".upload-progress-tracker"
    );
    // progressBox.querySelector(".maximize-btn").addEventListener("click", (e) => {
    // e.currentTarget.classList.toggle("expanded");
    try {
      maximizeBtn.classList.add("expanded");
    } catch (error) {
      toastText.innerHTML = "No Uploads Found!";
      toastFunction();
    }
    // progressBox.classList.toggle("expanded");
    uploadProgressTracker.classList.add("expanded");
    uploadProgressTracker.style.display = "block";
    uploadProgressTracker.style.height = "80%";

    maximizeBtn.addEventListener("click", () => {
      uploadProgressTracker.style.display = "none";
      uploadProgressTracker.style.height = "0";
    });
  });

  const updateProgressBox = () => {
    const [title, uploadProgress, expandBtn, progressBar] =
      progressBox.children;

    if (files.size > 0) {
      let totalUploadedFiles = 0;
      let totalUploadingFiles = 0;
      let totalFailedFiles = 0;
      let totalPausedFiles = 0;
      let totalChunkSize = 0;
      let totalUploadedChunkSize = 0;
      const [uploadedPerc, successCount, failedCount, pausedCount] =
        uploadProgress.children;

      files.forEach((fileObj) => {
        if (fileObj.status === FILE_STATUS.FAILED) {
          totalFailedFiles += 1;
        } else {
          if (fileObj.status === FILE_STATUS.COMPLETED) {
            totalUploadedFiles += 1;
          } else if (fileObj.status === FILE_STATUS.PAUSED) {
            totalPausedFiles += 1;
          } else {
            totalUploadingFiles += 1;
          }

          totalChunkSize += fileObj.size;
          totalUploadedChunkSize += fileObj.uploadedChunkSize;
        }
      });

      const percentage =
        totalChunkSize > 0
          ? Math.min(
              100,
              Math.round((totalUploadedChunkSize * 100) / totalChunkSize)
            )
          : 0;

      title.textContent =
        percentage === 100
          ? `Uploaded ${totalUploadedFiles} File${
              totalUploadedFiles !== 1 ? "s" : ""
            }`
          : `Uploading ${totalUploadingFiles}/${files.size} File${
              files.size !== 1 ? "s" : ""
            } | Queued files ${queued}`;
      uploadedPerc.textContent = `${percentage}%`;
      successCount.textContent = totalUploadedFiles;
      failedCount.textContent = totalFailedFiles;
      pausedCount.textContent = totalPausedFiles;
      progressBar.style.width = `${percentage}%`;
      progressBox.style.backgroundSize = `${percentage}%`;
      expandBtn.style.display = "inline-block";
      uploadProgress.style.display = "block";
      progressBar.style.display = "block";
    } else {
      title.textContent = "No Upload in Progress";
      // expandBtn.style.display = "none";
      uploadProgress.style.display = "none";
      progressBar.style.display = "none";
    }
  };

  const updateFileElement = (fileObject) => {
    const [
      {
        children: [
          {
            children: [status],
          },
          progressBar,
        ],
      }, // .file-details
      {
        children: [retryBtn, pauseBtn, resumeBtn, clearBtn],
      }, // .file-actions
    ] = fileObject.element.children;

    requestAnimationFrame(() => {
      status.textContent =
        fileObject.status === FILE_STATUS.COMPLETED
          ? fileObject.status
          : `${Math.round(fileObject.percentage)}%`;
      status.className = `status ${fileObject.status}`;
      progressBar.style.width = fileObject.percentage + "%";
      progressBar.style.background =
        fileObject.status === FILE_STATUS.COMPLETED
          ? "#00C44B"
          : fileObject.status === FILE_STATUS.FAILED
          ? "red"
          : "#222";

      pauseBtn.style.display =
        fileObject.status === FILE_STATUS.UPLOADING ? "inline-block" : "none";
      retryBtn.style.display =
        fileObject.status === FILE_STATUS.FAILED ? "inline-block" : "none";
      resumeBtn.style.display =
        fileObject.status === FILE_STATUS.PAUSED ? "inline-block" : "none";
      clearBtn.style.display =
        fileObject.status === FILE_STATUS.COMPLETED ||
        fileObject.status === FILE_STATUS.PAUSED
          ? "inline-block"
          : "none";
      updateProgressBox();
    });
  };

  const setFileElement = (file) => {
    const extIndex = file.name.lastIndexOf(".");
    const fileElement = document.createElement("div");
    fileElement.className = "file-progress";
    fileElement.innerHTML = `
			<div class="file-details" style="position: relative">
				<p>
					<span class="status">pending</span>
					<span class="file-name">${file.name.substring(0, extIndex)}</span>
					<span class="file-ext">${file.name.substring(extIndex)}</span>
				</p>
				<div class="progress-bar" style="width: 100%;"></div>
			</div>
			<div class="file-actions">
				<button type="button" class="retry-btn" style="display: none">Retry</button>
				<button type="button" class="cancel-btn" style="display: none">Pause</button>
				<button type="button" class="resume-btn" style="display: none">Resume</button>
				<button type="button" class="clear-btn" style="display: none">Clear</button>
			</div>
		`;
    files.set(file, {
      element: fileElement,
      size: file.size,
      status: FILE_STATUS.PENDING,
      percentage: 0,
      uploadedChunkSize: 0,
    });

    const [
      _,
      {
        children: [retryBtn, pauseBtn, resumeBtn, clearBtn],
      },
    ] = fileElement.children;

    clearBtn.addEventListener("click", () => {
      uploader.clearFileUpload(file);
      files.delete(file);
      fileElement.remove();
      updateProgressBox();
    });
    retryBtn.addEventListener("click", () => uploader.retryFileUpload(file));
    pauseBtn.addEventListener("click", () => uploader.abortFileUpload(file));
    resumeBtn.addEventListener("click", () => uploader.resumeFileUpload(file));
    progressBox
      .querySelector(".file-progress-wrapper")
      .appendChild(fileElement);
  };

  const onComplete = (e, file) => {
    const fileObj = files.get(file);
    getUserData(ApiUrl + "/getData");
    fileObj.status = FILE_STATUS.COMPLETED;
    fileObj.percentage = 100;

    updateFileElement(fileObj);
  };

  const onProgress = (e, file) => {
    const fileObj = files.get(file);

    fileObj.status = FILE_STATUS.UPLOADING;
    fileObj.percentage = e.percentage;
    fileObj.uploadedChunkSize = e.loaded;

    updateFileElement(fileObj);
  };

  const onError = (e, file) => {
    console.log("error");
    const fileObj = files.get(file);

    fileObj.status = FILE_STATUS.FAILED;
    fileObj.percentage = 100;

    updateFileElement(fileObj);
  };

  const onAbort = (e, file) => {
    const fileObj = files.get(file);

    fileObj.status = FILE_STATUS.PAUSED;

    updateFileElement(fileObj);
  };

  return (uploadedFiles) => {
    [...uploadedFiles].forEach(setFileElement);

    document.body.appendChild(progressBox);

    uploader = uploadFiles(uploadedFiles, {
      onProgress,
      onError,
      onAbort,
      onComplete,
    });
  };
})();

const fileInput = document.getElementById("file-upload-input");

fileInput.addEventListener("change", (e) => {
  console.log(e.currentTarget.files[0].name);
  if (e.currentTarget.files.length === 1) {
    const extension = e.currentTarget.files[0].name.split(".").pop();
    if (!acceptExtentions.includes(extension)) {
      toastText.innerHTML = "File not supported";
      return toastFunction();
    }
    toastText.innerHTML = "1 File Added";
  } else {
    for (let index = 0; index < e.currentTarget.files.length; index++) {
      console.log(e.currentTarget.files[index].name.split(".").pop());
      const extension = e.currentTarget.files[index].name.split(".").pop();
      if (!acceptExtentions.includes(extension)) {
        toastText.innerHTML = "Extention '." + extension + "' Not supported";
        return toastFunction();
      }
    }
    toastText.innerHTML = `${e.currentTarget.files.length} Files Added`;
  }
  showUploadsBtn.style.backgroundColor = "cornflowerblue"; //green
  toastFunction("cornflowerblue");
  uploadAndTrackFiles(e.currentTarget.files[index]);
  e.currentTarget.value = "";
});

//upload Section end
