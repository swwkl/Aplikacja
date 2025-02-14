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
  var validCount = 0;

  function validatePassword(passwordInputToValidate) {
    validCount = 0;

    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(passwordInputToValidate.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
      validCount ++;
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
  
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(passwordInputToValidate.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
      validCount ++;
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(passwordInputToValidate.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
      validCount ++;
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(passwordInputToValidate.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
      validCount ++;
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
  document.getElementById("passwordMessage").style.display = validCount >= 4 ? "none" : "block";
  checkPasswordsMatch(); // Sprawdzamy, czy hasła są identyczne

  function checkPasswordsMatch() {
    var password1 = document.getElementById("psw").value;
    var password2 = document.getElementById("pswd").value;
    var registerButton = document.getElementById("registerButton"); // Pobieramy przycisk rejestracji
    var mismatchMessage = document.getElementById("passwordMismatchMessage"); // Pobieramy komunikat o błędzie
  
    if (password1 === password2 && password1.length >= 8) {
      registerButton.disabled = false; // Odblokowujemy rejestrację
      mismatchMessage.style.display = "none"; // Ukrywamy komunikat
    } else {
      registerButton.disabled = true; // Blokujemy rejestrację
      mismatchMessage.style.display = "block"; // Pokazujemy komunikat
    }
  }
  
  // Nasłuchujemy zmian w polach hasła
  document.getElementById("psw").addEventListener("keyup", checkPasswordsMatch);
  document.getElementById("pswd").addEventListener("keyup", checkPasswordsMatch);

  
  function validateLogin(emailInputToValidate){
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