import _ from "lodash";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());

enum A {
  a = "a",
}
console.log(A.a);

let a = 1 + 2;
let b = a + 3;
let c = {
  apple: a,
  banana: b,
};
let d = c.apple * 4;
console.log({
  a,
  b,
  c,
  d,
  g: d + 'ww',
  e: 222
});
