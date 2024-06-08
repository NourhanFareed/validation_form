var sPassInput = document.querySelector("#sPassInput");
var sEmailInput = document.querySelector("#sEmailInput");
var sErrorMail = document.querySelector("#sErrorMail");
var sErrorPass = document.querySelector("#sErrorPass");
var sForm = document.querySelector("#sForm");
var sFormBox = document.querySelector("#sFormBox");
var signUpBtn = document.querySelector("#signUpBtn");
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var email = sEmailInput.value;
var password = sPassInput.value;
var userDataArr = JSON.parse(localStorage.getItem("users")) ?? [];

sForm.addEventListener("submit", function (e) {
  // e.preventDefault();
  signupValidateForm();
  clearForm();
  // checker(email, password);
});

function signupValidateForm() {
  var users = {
    name: sNameInput.value,
    email: sEmailInput.value,
    password: sPassInput.value,
  };
  if (
    sNameInput.value == "" ||
    sNameInput.value == null ||
    sNameInput.value.length < 5 ||
    sNameInput.value.length > 20
  ) {
    sNameInput.style.cssText = `border:1px solid red !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
    );
    sErrorName.innerHTML = `
       <h6>Enter valid name,Please!</h6>`;
  } else {
    sNameInput.style.cssText = `border:1px solid green !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#008000, #008000, #008000, #008000)"
    );
    sErrorName.innerHTML = "";
  }

  if (emailRegex.test(sEmailInput.value)) {
    sEmailInput.style.cssText = `border:1px solid green !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#008000, #008000, #008000, #008000)"
    );
    sErrorMail.innerHTML = "";
  } else if (sEmailInput.value == "") {
    sEmailInput.style.cssText = `border:1px solid red !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
    );
    sErrorMail.innerHTML = `
      <h6>Your Email address is required!</h6>
      `;
  } else {
    sEmailInput.style.cssText = `border:1px solid red !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
    );
    sErrorMail.innerHTML = `
      <h6>Please enter valid email!</h6>
      `;
  }

  if (sPassInput.value.length < 8 || sPassInput.value.length > 20) {
    sPassInput.style.cssText = `border:1px solid red !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
    );
    sErrorPass.innerHTML = `
      <h6>Please enter valid password!</h6>
      <ul>
      <li>Password should be minimum 8 and maximum 20 letters</li>
      </ul>`;
  } else {
    sPassInput.style.cssText = `border:1px solid green !important`;
    sFormBox.style.setProperty(
      "--boxAfterBackColor",
      "linear-gradient(#008000, #008000, #008000, #008000)"
    );
    sErrorPass.innerHTML = "";
  }

  if (
    emailRegex.test(sEmailInput.value) &&
    sPassInput.value.length >= 8 &&
    sPassInput.value.length <= 20
  ) {
    Swal.fire({
      title: "Done",
      text: "Your registration is successfully done",
      icon: "success",
    });
    userDataArr.push(users);
    DataUpdated();
  } else {
    // If the checker function returns false, alert the user and prevent registration
    Swal.fire({
      title: "Registration failed. Please try again.",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  }
}

function clearForm() {
  sNameInput.value == "";
  sEmailInput.value = "";
  sPassInput.value = "";
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
}

// function checker(email, password) {
//   for (let i = 0; i < userDataArr.length; i++) {
//     if (userDataArr[i].email == email && userDataArr[i].password == password) {
//       Swal.fire({
//         title:
//           "This email and password are already used. Please use another one.",
//         showClass: {
//           popup: `
//       animate__animated
//       animate__fadeInUp
//       animate__faster
//     `,
//         },
//         hideClass: {
//           popup: `
//       animate__animated
//       animate__fadeOutDown
//       animate__faster
//     `,
//         },
//       });
//       // sPassInput.style.cssText = `border:1px solid red !important`;
//       // sEmailInput.style.cssText = `border:1px solid red !important`;
//       // sErrorMail.innerHTML = `
//       //     <h6>This email and password are already used. Please use another one.!</h6>
//       //     `;
//       // sErrorPass.innerHTML = `
//       //       <h6>Please enter valid password!</h6>`;
//       // sFormBox.style.setProperty(
//       //   "--boxAfterBackColor",
//       //   "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
//       // );

//       return false;
//     }
//   }

//   // Check if the email matches the password
//   //   if (!emailRegex.test(sEmailInput.value)) {
//   //     Swal.fire({
//   //       title: "Invalid email format. Please use a valid email address.",
//   //       showClass: {
//   //         popup: `
//   //       animate__animated
//   //       animate__fadeInUp
//   //       animate__faster
//   //     `,
//   //       },
//   //       hideClass: {
//   //         popup: `
//   //       animate__animated
//   //       animate__fadeOutDown
//   //       animate__faster
//   //     `,
//   //       },
//   //     });
//   //     // alert("Invalid email format. Please use a valid email address.");
//   //     return false;
//   //   }

//   //   // If everything is okay, return true
//   //   return true;
// }

// if (checker(email, password)) {
//   // If the checker function returns true, proceed with the registration
//   console.log("Registration successful!");
//   Swal.fire({
//     title: "Done",
//     text: "Your registration is successfully done",
//     icon: "success",
//   });
//   userDataArr.push(users);
//   DataUpdated();
// } else {
//   // If the checker function returns false, alert the user and prevent registration
//   Swal.fire({
//     title: "Registration failed. Please try again.",
//     showClass: {
//       popup: `
//       animate__animated
//       animate__fadeInUp
//       animate__faster
//     `,
//     },
//     hideClass: {
//       popup: `
//       animate__animated
//       animate__fadeOutDown
//       animate__faster
//     `,
//     },
//   });
//   // alert("Registration failed. Please try again.");
// }

// if (
//       userDataArr[i].email
//         .toLowerCase()
//         .includes(sEmailInput.value.toLowerCase()) ||
//       userDataArr[i].password.includes(sPassInput.value)
//     ) {
//       sPassInput.style.cssText = `border:1px solid red !important`;
//       sEmailInput.style.cssText = `border:1px solid red !important`;
//       sErrorMail.innerHTML = `
//       <h6>This email and password are already used. Please use another one.!</h6>
//       `;
//       sErrorPass.innerHTML = `
//         <h6>Please enter valid password!</h6>`;
//       sFormBox.style.setProperty(
//         "--boxAfterBackColor",
//         "linear-gradient(#dc3c5f, #dc3c5f, #dc3c5f, #dc3c5f)"
//       );
//       Swal.fire({
//         title: "Something went wrong!",
//         text: "Please enter valid data!",
//         icon: "error",
//       });
// }
