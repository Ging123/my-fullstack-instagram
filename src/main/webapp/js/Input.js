var placeholderLoop;

class Input {
  executePlaceholderAnimation() {
    const input = $(this);
    placeholderLoop = setInterval(() => {
    if(input.val() !== "") {
      i.doPlaceholderAnimation(input, input.parent().children(".placeholder"), true);
      return;
    }
    i.doPlaceholderAnimation(input, input.parent().children(".placeholder"), false);
  }, 1);
  }

  doPlaceholderAnimation(input, placeholder, placeholderMustUp) {
    if(placeholderMustUp) {
      input.css({"padding":"20px 10px 0px 10px"});
      placeholder.css({"font-size":"1rem", "top":"30%"});
      return;
    } 
    input.css({"padding":"10px"});
    placeholder.css({"font-size":"1.4rem", "top":"50%"});
  }
  
  
}

const i = new Input();

$(".defaultInputContainer > .defaultInput").click(i.executePlaceholderAnimation);

$(".defaultInputContainer > .defaultInput").blur(() => clearInterval(placeholderLoop));