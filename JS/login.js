var passInput = document.querySelector("#passInput");
var emailInput = document.querySelector("#emailInput");
var errorMail = document.querySelector("#errorMail");
var errorPass = document.querySelector("#errorPass");
var form = document.querySelector("#form");
var formBox = document.querySelector("#formBox");
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

var userDataArr = JSON.parse(localStorage.getItem("users")) ?? [];

form.addEventListener("submit", function (e) {
  // e.preventDefault();
  loginValidateForm();
  clearForm();
});

function loginValidateForm() {
  var users = {
    email: emailInput.value,
    password: passInput.value,
  };

  if (emailRegex.test(emailInput.value)) {
    emailInput.style.cssText = `border:1px solid green !important`;
    formBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#008000, #008000, #008000, #008000)"
    );
    errorMail.innerHTML = "";
  } else {
    emailInput.style.cssText = `border:1px solid red !important`;
    formBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
    );
    errorMail.innerHTML = `
      <h6>Please enter valid email!</h6>
      `;
  }

  if (passInput.value.length < 8 || passInput.value.length > 20) {
    passInput.style.cssText = `border:1px solid red !important`;
    formBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
    );
    errorPass.innerHTML = `
      <h6>Please enter valid password!</h6>
      <ul>
      <li>Password should be minimum 8 and maximum 20 letters</li>
      </ul>`;
  } else {
    passInput.style.cssText = `border:1px solid green !important`;
    formBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#008000, #008000, #008000, #008000)"
    );
    errorPass.innerHTML = "";
  }

  if (
    emailRegex.test(emailInput.value) &&
    passInput.value.length >= 8 &&
    passInput.value.length <= 20
  ) {
    Swal.fire({
      title: "Done",
      text: "Your registration is successfully done",
      icon: "success",
    });
    userDataArr.push(users);
    DataUpdated();
  }
}

function clearForm() {
  emailInput.value = "";
  passInput.value = "";
}

function DataUpdated() {
  localStorage.setItem("users", JSON.stringify(userDataArr));
  usersLoop();
}

function usersLoop() {
  var usersList = "";
  for (var i = 0; i < userDataArr.length; i++) {
    usersList += `
    <tr class="text-center">
      <td>${i}</td>
      <td>${userDataArr[i].email}</td>
      <td>${userDataArr[i].password}</td>
      </tr>
    `;
  }
  console.log(userDataArr);
  document.querySelector("#usersList").innerHTML = usersList;
  console.log(usersList);
}
