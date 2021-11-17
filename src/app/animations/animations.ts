import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
  state,
} from "@angular/animations";

export const labelAnimation = {
  animeTrigger: trigger("animeTrigger", [
    state(
      "over",
      style({
        top: "-3px",
        right: "12px",
        opacity: 0.5,
      })
    ),
    state(
      "left",
      style({
        opacity: 1,
      })
    ),
    transition("left => over", [animate("0.5s")]),
  ]),
};
