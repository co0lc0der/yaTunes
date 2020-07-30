import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
	const audio = document.querySelector('.audio'),
				audioPlayer = document.querySelector('.audio-player'),
				audioNavigation = document.querySelector('.audio-navigation'),
				audioHeader = document.querySelector('.audio-header'),
				audioImg = document.querySelector('.audio-img'),
				audioProgress = document.querySelector('.audio-progress'),
				audioProgressTiming = document.querySelector('.audio-progress__timing'),
				audioTimePassed = document.querySelector('.audio-time__passed'),
				audioTimeTotal = document.querySelector('.audio-time__total'),
				audioButtonPlay = document.querySelector('.audio-button__play'),
				// radioVolume = document.querySelector('.radio-volume'),
				// radioVolumeDown = document.getElementById('radio-volume-down'),
				// radioVolumeUp = document.getElementById('radio-volume-up'),
				playlist = ['hello', 'flow', 'speed'];

	let trackIndex = 0;

	const loadTrack = () => {
		const isPlayed = audioPlayer.paused,
					track = playlist[trackIndex];

		audioPlayer.src = `./audio/${track}.mp3`;
		audioImg.src = `./audio/${track}.jpg`;
		audioHeader.textContent = track;

		if (isPlayed) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};

	const prevTrack = () => {
		if (trackIndex !== 0) {
			trackIndex--;
		} else {
			trackIndex = playlist.length - 1;
		}

		loadTrack();
	};

	const nextTrack = () => {
		if (trackIndex === playlist.length - 1) {
			trackIndex = 0;
		} else {
			trackIndex++;
		}

		loadTrack();
	};

	audioNavigation.addEventListener('click', event => {
		const { target } = event;

		if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play');
			audioButtonPlay.classList.toggle('fa-play');
			audioButtonPlay.classList.toggle('fa-pause');

			if (audioPlayer.paused) {
				audioPlayer.play();
			} else {
				audioPlayer.pause();
			}

			audioHeader.textContent = playlist[trackIndex];
		}

		if (target.classList.contains('audio-button__prev')) {
			prevTrack();
		}

		if (target.classList.contains('audio-button__next')) {
			nextTrack();
		}
	});

	audioPlayer.addEventListener('ended', () => {
		nextTrack();
		audioPlayer.play();
	});

	audioPlayer.addEventListener('timeupdate', () => {
		const currentTime = audioPlayer.currentTime,
					duration = audioPlayer.duration,
					progress = (currentTime / duration) * 100;

		audioProgressTiming.style.width = progress + '%';

		let minutesPassed = Math.floor(currentTime / 60) || 0,
				secondsPassed = Math.floor(currentTime % 60) || 0,
				minutesTotal = Math.floor(duration / 60) || 0,
				secondsTotal = Math.floor(duration % 60) || 0;

		audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
		audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

	});

	audioProgress.addEventListener('click', event => {
		const x = event.offsetX,
					allWidth = audioProgress.clientWidth,
					progress = (x / allWidth) * audioPlayer.duration;

		audioPlayer.currentTime = progress;
	});
};