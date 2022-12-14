// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
  } else {
    progressBar.classList.remove('hide');
    if (event.detail.totalProgress === 0) {
      event.target.querySelector('.center-pre-prompt').classList.add('hide');
    }
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);




//User must press 'a' 'b' 'c' 'd' in sequence to dismiss poster
const modelViewer = document.querySelector('model-viewer');
const keySequence = ['c', 'a', 't'];
let keyIndex = 0;
var audio = new Audio('cat-purr-6164.mp3');
let viewIndex = 0;

document.addEventListener('keyup', (event) => {
  if (event.key === keySequence[keyIndex]) {
    keyIndex++;
  } else {
    keyIndex = 0;
  }
  if (keyIndex === keySequence.length) {
      modelViewer.dismissPoster();
      audio.play();
      viewIndex++;
      keyIndex=0;
    }
  else{
    modelViewer.showPoster();
    audio.pause();
    viewIndex = 0;
    
  }
}
);

