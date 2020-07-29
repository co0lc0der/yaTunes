import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const tempBlock = document.querySelector('.temp');

const deactivationPlayer = () => {
	const videoPlayer = document.querySelector('.video-player');

	tempBlock.style.display = 'none';
	playerBtn.forEach(item => item.classList.remove('active'));
	playerBlock.forEach(item => item.classList.remove('active'));

	videoPlayer.pause();
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
	deactivationPlayer();
	btn.classList.add('active');
	playerBlock[i].classList.add('active');
}));

videoPlayerInit();
musicPlayerInit();
radioPlayerInit();