import { nextUnit } from './reel';
import { loadClip, playClip, clips } from './player';

const words = ['прототип'];

const wordElement = document.querySelector('#secret-word');
const inp = document.querySelector('input');
const btn = document.querySelector('button');
const wrong = document.querySelector('.wrong');
const info = document.querySelector('.info');

const currentWord = words[0];

const correctLetters = [];
const wrongLetters = [];

let wins = false; // Звук если победа

function displayWord() {
  wordElement.innerHTML = `
    ${currentWord
      .split('')
      .map(
        (l) => `<span class="letter">
                ${correctLetters.includes(l) ? l : ''}
            </span>`
      )
      .join('')}
      `;

  const innerWord = wordElement.innerText.replace(/[ \n]/g, '');
  if (innerWord === currentWord) {
    info.textContent = 'Победа Ура!!!';
    wins = true;
  }
}

displayWord();

function updateWrongLettersEl() {
  wrong.innerHTML = `
    ${wrongLetters.map((l) => `<span>${l}</span>`)}
    `;
}

let tempNum = 0;
let tempUnit = 0;
btn.disabled = true;

export const isWordExist = (unit, num) => {
  recognition.start();
  tempNum = num;
  tempUnit = unit;
  btn.disabled = false;
};

export const sendWord = (w) => {
  if (currentWord.includes(w)) {
    if (!correctLetters.includes(w)) {
      correctLetters.push(w);
      displayWord();
      wins ? loadClip(clips[5]) : loadClip(clips[6]);
      playClip();
      tempUnit.counter(tempNum);
    }
  } else {
    if (!wrongLetters.includes(w)) {
      wrongLetters.push(w);
      updateWrongLettersEl();
      loadClip(clips[7]);
      playClip();
      nextUnit();
    }
  }
  inp.value = '';
};

btn.addEventListener('click', () => sendWord(inp.value));

// Распознование речи
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export let recognition = new window.SpeechRecognition();

recognition.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognition.onresult = function (event) {
  let result = event.results[event.resultIndex];
  if (result.isFinal) sendWord(result[0].transcript.charAt(0).toLowerCase());
};
