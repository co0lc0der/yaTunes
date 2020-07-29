export const videoPlayerInit = () => {
	const videoPlayer = document.querySelector('.video-player'),
				videoButtonPlay = document.querySelector('.video-button__play'),
				videoButtonStop = document.querySelector('.video-button__stop'),
				videoTimePassed = document.querySelector('.video-time__passed'),
				videoProgress = document.querySelector('.video-progress'),
				videoTimeTotal = document.querySelector('.video-time__total'),
				videoFullScreen = document.querySelector('.video-fullscreen'),
				videoVolume = document.querySelector('.video-volume'),
				videoVolumeDown = document.getElementById('video-volume-down'),
				videoVolumeUp = document.getElementById('video-volume-up'),
				userAgentChrome = navigator.userAgent.match(/Chrome/);

	const toggleIcon = () => {
		if (videoPlayer.paused) {
			videoButtonPlay.classList.remove('fa-pause');
			videoButtonPlay.classList.add('fa-play');
		} else {
			videoButtonPlay.classList.add('fa-pause');
			videoButtonPlay.classList.remove('fa-play');
		}
	};

	const togglePlay = () => {
		if (videoPlayer.paused) {
			videoPlayer.play();
		} else {
			videoPlayer.pause();
		}
	};

	const stopPlay = () => {
		videoPlayer.pause();
		videoPlayer.currentTime = 0;
	};

	const addZero = n => n < 10 ? '0' + n : n;

	const updateVolume = () => videoVolume.value = videoPlayer.volume * 100;

	const updatePlayerTime = () => {
		const currentTime = videoPlayer.currentTime,
					duration = videoPlayer.duration;

		videoProgress.value = (currentTime / duration) * 100;

		let minutesPassed = Math.floor(currentTime / 60) || 0,
				secondsPassed = Math.floor(currentTime % 60) || 0,
				minutesTotal = Math.floor(duration / 60) || 0,
				secondsTotal = Math.floor(duration % 60) || 0;

		videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
		videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
	};

	videoPlayer.addEventListener('click', togglePlay);
	videoButtonPlay.addEventListener('click', togglePlay);
	videoButtonStop.addEventListener('click', stopPlay);

	videoPlayer.addEventListener('play', toggleIcon);
	videoPlayer.addEventListener('pause', toggleIcon);

	videoPlayer.addEventListener('timeupdate', updatePlayerTime);

	videoProgress.addEventListener('input', () => {
		const duration = videoPlayer.duration,
					value = videoProgress.value;

		videoPlayer.currentTime = (value * duration) / 100;
	});

	videoVolume.addEventListener('input', () => {
		videoPlayer.volume = videoVolume.value / 100;
	});

	videoVolumeDown.addEventListener('click', () => {
		if (videoPlayer.volume > 0.1) {
			videoPlayer.volume -= 0.1;
		} else {
			videoPlayer.volume = 0;
		}
		updateVolume();
	});

	videoVolumeUp.addEventListener('click', () => {
		if (videoPlayer.volume < 0.9) {
			videoPlayer.volume += 0.1;
		} else {
			videoPlayer.volume = 1;
		}
		updateVolume();
	});

	if (userAgentChrome) {
		videoFullScreen.style.display = 'inline';

		videoFullScreen.addEventListener('click', () => {
			videoPlayer.requestFullScreen();
		});
	} else {
		videoFullScreen.style.display = 'none';
	}

	updatePlayerTime();

	videoPlayer.volume = 0.5;
	updateVolume();

};