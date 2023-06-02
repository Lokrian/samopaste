"use strict";
// Makes object "data" and writes email and option
const copyData = function () {
  let data = {};
  const email = document.getElementById("email-input");
  const option = document.getElementById("branches");

  validEmail(email, email.value);
  // Checks the object for the presence of values ​​in it, if there are, it deletes it.
  if (Object.keys(data).length > 0) {
    data = {};
  }

  data.email = email.value;
  data.option = option.value;

  return data;
};

const validEmail = function (email, value) {
  if (value == "") {
    email.classList.add("red-placeholder");
    email.placeholder = "E-mail останется пустым!";
  }
};

const sendDataToActiveWindow = function () {
  const copyButton = document.getElementById("copy-button");

  copyButton.onclick = async function (e) {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    console.log(tabs[0].id);
    // Открываем соединение
    const port = chrome.tabs.connect(tabs[0].id, {
      name: "formport",
    });

    // Take data from copyData and send it
    const data = copyData();
    console.log(data);
    port.postMessage({
      data,
    });

    port.onMessage.addListener(function (msg) {
      if (msg.exists) {
        console.log("Done");
      } else {
        console.log("Something wrong!");
      }
    });
  };
};

sendDataToActiveWindow();
