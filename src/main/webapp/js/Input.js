const Input = (function () {
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


const Password = (function () {

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





