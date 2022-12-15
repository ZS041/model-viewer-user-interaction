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

// User must press 'c' 'a' 't' in sequence to show or hide the poster, or touch if on mobile
const modelViewer = document.querySelector('model-viewer');
const keySequence = ['c', 'a', 't'];
let keyIndex = 0;
var audio = new Audio('cat-purr-6164.mp3');
let isPosterShowing = true;

if ('ontouchstart' in document) {
  let tapCount = 0; // variable to keep track of the number of taps
  let tapTimer = null; // variable to store the timer

  document.addEventListener('touchend', function(evt) {
    tapCount++; // increment tapCount by 1 on each tap

    // reset the timer
    if (tapTimer) {
      clearTimeout(tapTimer);
    }

    // set a new timer to reset tapCount after half a second
    tapTimer = setTimeout(function() {
      tapCount = 0;
    }, 500);

    if (tapCount === 2) { // check if tapCount is 2
      // clear the timer
      if (tapTimer) {
        clearTimeout(tapTimer);
      }

      if (isPosterShowing) {
        modelViewer.dismissPoster();
        audio.play();
        isPosterShowing = false;
        keyIndex = 0; // reset keyIndex when poster is dismissed
      } else {
        modelViewer.showPoster();
        audio.pause();
        isPosterShowing = true;
        keyIndex = 0; // reset keyIndex when poster is shown
      }
    }
  });
}


document.addEventListener('keydown', (event) => { // use keydown event instead of keyup
  if (event.key.length === 1) {
    // only check if key is a letter
    if (keyIndex < keySequence.length && event.key.toLowerCase() === keySequence[keyIndex]) {
      keyIndex++;
      if (keyIndex === keySequence.length) {
        if (isPosterShowing) {
          modelViewer.dismissPoster();
          audio.play();
          isPosterShowing = false;
          keyIndex = 0; // reset keyIndex when poster is dismissed
        } else {
          modelViewer.showPoster();
          audio.pause();
          isPosterShowing = true;
          keyIndex = 0; // reset keyIndex when poster is shown
        }
      }
    } else if (keyIndex === keySequence.length) {
      // only reset keyIndex if the correct key sequence has been entered
      keyIndex = 0;
    }
  }
});