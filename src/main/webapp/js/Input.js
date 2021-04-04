var validateFullname;
var validatePassword;

const InputValidator = (function() {
  
  //METHODS OF FULL NAME INPUT
  validateFullname = function(input) {
    input = $(input);
    const icone = input.parent().children("i");
    if(input.val() !== "") {
      const theNameIsAValidName = validateRegexp(input.val(), /\d+/);
      const theNameHasAValidSize = seeIfTheStringIsGreaterThan(input.val(), 2); 
      showIconeBasedInTheFullnameValidation(theNameIsAValidName, theNameHasAValidSize, icone);
      return;
    }
    manipulateStatusInputVisibility(icone, false);
  }


  validatePassword = function(input) {
    input = $(input);
    const icone = input.parent().children("i");
    if(input.val() !== "") {
      const theNameHasAValidSize = seeIfTheStringIsGreaterThan(input.val(), 6); 
      showIconeBasedInThePasswordValidation(theNameHasAValidSize, icone);
      return;
    }
    manipulateStatusInputVisibility(icone, false);
  }


  function showIconeBasedInTheFullnameValidation(theNameIsAValidName, theNameHasAValidSize, icone) {
    icone.removeClass();
    if(theNameHasAValidSize && theNameIsAValidName) {
      icone.addClass("far fa-check-circle okIcone defaultInputStatusIconePosition");
      return;
    }
    icone.addClass("far fa-times-circle erroIcone defaultInputStatusIconePosition");
  }


  function showIconeBasedInThePasswordValidation(theNameHasAValidSize = true, icone) {
    if(theNameHasAValidSize) {
      icone.addClass("far fa-check-circle okIcone passwordInputStatusIconePosition");
      return;
    }
    icone.addClass("far fa-times-circle erroIcone passwordInputStatusIconePosition");
  }


  function seeIfTheStringIsGreaterThan(string = "", value = 0) {
    if(string.length > value) {
      return true;
    }
    return false;
  }


  function validateRegexp(text = "", regExp = "") {
    if(text.search(regExp) === -1) {
      return true;
    }
    return false;
  }


  function validateIfTheStatusIconeOfInputMustAppear(input, inputHasFocus = true) {
    const icone = $(input).parent().children("i");
    if(inputHasFocus) {
      manipulateStatusInputVisibility(icone, false);
      return;
    }
    if(inputHasFocus === false && input.value !== "") {
      manipulateStatusInputVisibility(icone, true);
    }
  }


  function manipulateStatusInputVisibility(icone, iconeMustApear = true) {
    if(iconeMustApear) {
      icone.show();
      return;
    } 
    icone.hide();
  }


  $(".hasIcone .defaultInput").focus(() => validateIfTheStatusIconeOfInputMustAppear(event.target));
  $(".hasIcone .defaultInput").blur(() => validateIfTheStatusIconeOfInputMustAppear(event.target, false));
}());


const PlaceholderAnimator = (function () {
  var placeholderLoop;

  function executePlaceholderAnimation() {
    const input = $(this);
    placeholderLoop = setInterval(() => {
      if (input.val() !== "") {
        doPlaceholderAnimation(input, input.parent().children(".placeholder"), true);
        return;
      }
      doPlaceholderAnimation(input, input.parent().children(".placeholder"), false);
    }, 1);
  }


  function doPlaceholderAnimation(input, placeholder, placeholderMustUp) {
    if (placeholderMustUp) {
      input.css({ "padding-top":"20px", "padding-bottom":"0px"});
      placeholder.css({ "font-size": "1rem", "top": "30%" });
      return;
    }
    input.css({ "padding-top": "10px", "padding-bottom":"10px"});
    placeholder.css({ "font-size": "1.4rem", "top": "50%" });
  }


  $(".defaultInputContainer > .defaultInput").click(executePlaceholderAnimation);
  $(".defaultInputContainer > .defaultInput").blur(() => clearInterval(placeholderLoop));
}());


const InputPassword = (function () {
  function manipulateShowVisibility() {
    const input = $(this);
    const show = input.parent().children(".showPassword");
    if (input.val() !== "") {
      show.show();
      return;
    }
    show.hide();
  }


  function manipulatePasswordVisibility() {
    const input = $(this).parent().children(".defaultInput");
    if(input.attr("type") === "password") {
      input.attr("type", "text");
      return;
    }
    input.attr("type", "password");
  }


  $(".defaultInput[type='password']").keyup(manipulateShowVisibility);
  $(".showPassword").click(manipulatePasswordVisibility);
}());