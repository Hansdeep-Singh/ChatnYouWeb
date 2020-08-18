import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
} from "@angular/animations";

// var fn = function () {
//   $(".inputlbl", this).animate(
//     { top: "-4px", right: "12px", opacity: 0.5 },
//     500,
//     function () {}
//   );
// };
// var fnlbl = function () {
//   $(this).animate(
//     { top: "-4px", right: "12px", opacity: 0.5 },
//     500,
//     function () {}
//   );
// };

export const transAnimation = animation([
  style({
    top: "-4px",
    right: "12px",
    opacity: "0.5",
  }),
  animate("500"),
]);
