const Celphone = (function() {

  var srcs = ["images/phoneBackground1.jpg", "images/phoneBackground2.jpg_800","images/phoneBackground3.jpg", 
  "images/phoneBackground4.jpg", "images/phoneBackground5.jpg"];
  var current = 1;

  function changeBackgroundImage() {
    const url = `url('${srcs[current]}')`;
    $("#backgroundImages").css({"background-image":url});
    current++;
    if(current === srcs.length) {
      current = 0;
    }
  }

  setInterval(changeBackgroundImage, 7000);
}());