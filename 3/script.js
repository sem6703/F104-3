function counterCreater(initialIndex) {
  let index = initialIndex; 
  return function() {
      return index++;
  }
}
let buttonCounter = counterCreater(1);
console.log(buttonCounter());

console.log((counterCreater(1))());

// console.log(buttonCounter());
// console.log(siteCounter());
// console.log(siteCounter());