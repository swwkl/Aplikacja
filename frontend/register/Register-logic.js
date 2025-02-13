document.addEventListener("DOMContentLoaded", () => {
  var myPassword = document.getElementById("psw");
  var myPassword2 = document.getElementById("pswd");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  var myLogin = document.getElementById("login");
  var myAT = document.getElementById("at");
  var myDomain = document.getElementById("domain");

  function validatePassword(passwordInputToValidate) {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(passwordInputToValidate.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
  
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(passwordInputToValidate.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(passwordInputToValidate.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(passwordInputToValidate.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

  function validateLogin(emailInputToValidate){
    console.log("hello");
    var email = /[@]/g;
    if(emailInputToValidate.value.match(email)) {
      myAT.classList.remove("invalid");
      myAT.classList.add("valid");
    } else {
      myAT.classList.remove("valid");
      myAT.classList.add("invalid");
    }

    var AT = /@[\w\d]+(\.[a-zA-Z]{1,5})\b/;
    if(emailInputToValidate.value.match(AT)) {
      myDomain.classList.remove("invalid");
      myDomain.classList.add("valid");
    } else {
      myDomain.classList.remove("valid");
      myDomain.classList.add("invalid");
    }
  }

  myLogin.onkeyup = function() {validateLogin(myLogin)}

  myLogin.onfocus = function() {
    document.getElementById("emailMessage").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  myLogin.onblur = function() {
    document.getElementById("emailMessage").style.display = "none";
  }

  // When the user clicks on the password field, show the message box
  myPassword.onfocus = function() {
    validatePassword(myPassword);
    document.getElementById("passwordMessage").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  myPassword.onblur = function() {
    document.getElementById("passwordMessage").style.display = "none";
  }

  myPassword2.onfocus = function() {
    validatePassword(myPassword2);
    document.getElementById("passwordMessage").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  myPassword2.onblur = function() {
    document.getElementById("passwordMessage").style.display = "none";
  }
  // When the user starts to type something inside the password field
  
  myPassword.onkeyup = function() {validatePassword(myPassword)}
  myPassword2.onkeyup = function() {validatePassword(myPassword2)}
});