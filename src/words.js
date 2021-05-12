import { nextUnit } from './reel';
import { Unit } from './Unit';

const words = ['прототип'];

const ul = document.querySelector('ul');
const inp = document.querySelector('input');
const btn = document.querySelector('button');
const wrong = document.querySelector('.wrong');

const word = words[0];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  ul.innerHTML = `
    ${word
      .split('')
      .map(
        (l) => `<span class="letter">
                ${correctLetters.includes(l) ? l : ''}
            </span>`
      )
      .join('')}
      `;
}

displayWord();

function updateWrongLettersEl() {
  wrong.innerHTML = `
    ${wrongLetters.map((l) => `<span>${l}</span>`)}
    `;
}

const sendWord = (w) => {
  if (word.includes(w)) {
    if (!correctLetters.includes(w)) {
      correctLetters.push(w);

      displayWord();
    }
  } else {
    if (!wrongLetters.includes(w)) {
      wrongLetters.push(w);
      nextUnit();
      updateWrongLettersEl();
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
  if (result.isFinal) sendWord(result[0].transcript);
};
