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

export const LabelAnimation = {
  animeTrigger: trigger("animeTrigger", [
    state(
      "over",
      style({
        top: "-3px",
        right: "12px",
        opacity: 0.8,
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

export const notifyAnimation = {
  notifyTrigger: trigger('notifyTrigger', [
    state(
      'hide',
      style({
        opacity: 0,
      })
    ),
    state(
      'show',
      style({
        opacity: 1,
      })
    ),
    transition('hide => show', [animate('1s')]),
    transition('show => hide', [animate('0.5s')]),
  ]),
};
