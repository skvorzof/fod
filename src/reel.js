import { loadClip, playClip, stopClip, clips } from './player';
import { Unit } from './Unit';

const unit1 = new Unit({
  id: 1,
  name: 'Жан',
  ava: '👨‍🎤',
});
const unit2 = new Unit({
  id: 2,
  name: 'Маша',
  ava: '🧝‍♀️',
});
const unit3 = new Unit({
  id: 3,
  name: 'Макс',
  ava: '🦸',
});

const timer = (a) => {
  return {
    play: function (c) {
      let d = performance.now();
      c = c || a.to;
      requestAnimationFrame(function e(b) {
        b = (b - d) / a.duration;
        1 <= b && (b = 1);
        a.elem.style.transform =
          'rotate(' + (((a.from + (c - a.from) * b) | 0) % 360) + 'deg)';
        1 == b && a.callback && a.callback();
        1 > b && requestAnimationFrame(e);
      });
    },
  };
};

const div = document.querySelector('#ring');

const units = [unit1, unit2, unit3];
let index = 0;
let curUnit = units[index];

const nextUnit = () => {
  index++;
  if (index > units.length - 1) index = 0;
  curUnit = units[index];
};

const check = (num) => {
  switch (num) {
    case 0:
      loadClip(clips[1]);
      playClip();
      nextUnit();
      break;
    case 1: //Банкрот
      loadClip(clips[2]);
      playClip();
      curUnit.counter(num);
      nextUnit();
      break;
    case 2: //x2
      loadClip(clips[4]);
      playClip();
      curUnit.counter(num);
      break;
    case 3: // Приз
      loadClip(clips[3]);
      playClip();
      break;
    default:
      curUnit.counter(num);
      stopClip();
  }
};

let num = 0;
let res = 0;
const anim = timer({
  from: 0,
  to: 360 * 3 + 120,
  duration: 2 * 5000,
  elem: div,
  callback: function () {
    check(num);
  },
});

div.addEventListener('mousedown', () => {
  loadClip(clips[0]);
  playClip();
  const n = (15 * Math.random()) | 0;
  num = [
    1, //Банкрот
    750,
    300,
    600,
    950,
    0,
    400,
    850,
    350,
    800,
    700,
    3, // Приз
    550,
    2, //x2
    200,
    1000,
    150,
    450,
    100,
    500,
    50,
    250,
    650,
    900,
  ][n];
  anim.play(360 * 3 + n * 15); //угол поворота
});
