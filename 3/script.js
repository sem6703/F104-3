let siteCounter = (
  function counterCreater() {
    let index = 0; 
    return function() {
        return index++;
    }
  }
)();
let buttonCounter = (function counterCreater() {
  let index = 0; 
  return function() {
      return index++;
  }
})();

console.log(buttonCounter());
console.log(buttonCounter());
console.log(siteCounter());
console.log(siteCounter());