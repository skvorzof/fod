export const audio = document.createElement('audio');
export const clips = ['roll', 'zero', 'b', 'priz', 'x', 'ura', 'yes', 'no'];

export const loadClip = (clip) => {
  audio.src = `./src/media/${clip}.mp3`;
};

export const playClip = () => {
  audio.play();
};
export const stopClip = () => {
  audio.pause();
  audio.currentTime = 0;
};
