document.addEventListener("DOMContentLoaded", () => {
  var myPassword = document.getElementById("psw");
  var myPassword2 = document.getElementById("pswd");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  var passwordsMatch = document.getElementById("match");
  var myLogin = document.getElementById("login");
  var myAT = document.getElementById("at");
  var myDomain = document.getElementById("domain");
  var validCount = 0;

  var isEmailValid = false;
  var isPasswordsValid = false;
  var isRetypedPasswordsValid = false;

  function validatePassword(passwordInputToValidate) {
    validCount = 0;
    let lowerCaseLettersValid = false;
    let upperCaseLettersValid = false;
    let numbersValid = false;
    let lengthValid = false;


    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(passwordInputToValidate.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
      lowerCaseLettersValid = true;
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
  
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(passwordInputToValidate.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
      upperCaseLettersValid = true;
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(passwordInputToValidate.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
      numbersValid = true;
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(passwordInputToValidate.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
      lengthValid = true;
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }

    if(lowerCaseLettersValid && upperCaseLettersValid && numbersValid && lengthValid){
      return true;
    }else{
      return false;
    }

  }
  document.getElementById("passwordMessage").style.display = validCount >= 4 ? "none" : "block";
  checkPasswordsMatch(); // Sprawdzamy, czy hasła są identyczne

  function checkPasswordsMatch() {
    var password1 = document.getElementById("psw").value;
    var password2 = document.getElementById("pswd").value;
    var registerButton = document.getElementById("registerButton"); // Pobieramy przycisk rejestracji
    var backtologin = document.getElementById("backtologin"); // Pobieramy komunikat o błędzie
  
    if (password1 === password2) {
      passwordsMatch.classList.remove("invalid");
      passwordsMatch.classList.add("valid");

      if(isEmailValid){
        registerButton.disabled = false; // Odblokowujemy rejestrację
      }
      
    } else {
      passwordsMatch.classList.remove("valid");
      passwordsMatch.classList.add("invalid");

      registerButton.disabled = true; // Blokujemy rejestrację
    }
  }
  
  // Nasłuchujemy zmian w polach hasła
  document.getElementById("psw").addEventListener("keyup", checkPasswordsMatch);
  document.getElementById("pswd").addEventListener("keyup", checkPasswordsMatch);

  
  function validateLogin(emailInputToValidate){
    let isAddressValid = false;
    let isDomainValid = false;
    
    var email = /[@]/g;
    if(emailInputToValidate.value.match(email)) {
      myAT.classList.remove("invalid");
      myAT.classList.add("valid");
      isAddressValid = true;
    } else {
      myAT.classList.remove("valid");
      myAT.classList.add("invalid");
      isAddressValid = false;
    }

    var AT = /@[\w\d]+(\.[a-zA-Z]{1,5})\b/;
    if(emailInputToValidate.value.match(AT)) {
      myDomain.classList.remove("invalid");
      myDomain.classList.add("valid");
      isDomainValid = true;
    } else {
      myDomain.classList.remove("valid");
      myDomain.classList.add("invalid");
      isDomainValid = false;
    }

    if(isAddressValid == true && isDomainValid){
      isEmailValid = true;
    }else{
      isEmailValid = false;
    }

    if(isEmailValid && isPasswordsValid && isRetypedPasswordsValid){
      registerButton.disabled = false; // Odblokowujemy rejestrację
    }else{
      registerButton.disabled = true; // Blokujemy rejestrację
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
  
  myPassword.onkeyup = function() {
    isPasswordsValid = validatePassword(myPassword);
  }
  myPassword2.onkeyup = function() {
    isRetypedPasswordsValid = validatePassword(myPassword2);
  }
});