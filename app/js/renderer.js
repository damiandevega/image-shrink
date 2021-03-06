const path = require('path');
const os = require('os');
const { ipcRenderer } = require('electron');

const form = document.getElementById('image-form');
const slider = document.getElementById('slider');
const image = document.getElementById('image');
const output = document.getElementById('output-path');

output.innerText = path.join(os.homedir(), 'imageshrink');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const imagePath = image.files[0].path;
  const quality = slider.value;

  ipcRenderer.send('image:minimize', {
    imagePath,
    quality,
  });
});

ipcRenderer.on('image:done', () => {
  M.toast({
    html: `Image resized to ${slider.value}% quality`,
  });
});
