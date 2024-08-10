(function() {
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;
  
    function displayWindowSize() {
      const myWidth = window.innerWidth;
      const myHeight = window.innerHeight;
      // your size calculation code here
      const elements = document.getElementsByClassName("screen")
      
      Array.from(elements).forEach(element => {
        element.computedStyleMap("width", myWidth + "px");
        element.computedStyleMap("height", myHeight + "px");
      });
    };
})();