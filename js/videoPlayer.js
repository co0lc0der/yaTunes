export const videoPlayerInit = () => {
	const videoPlayer = document.querySelector('.video-player'),
				videoButtonPlay = document.querySelector('.video-button__play'),
				videoButtonStop = document.querySelector('.video-button__stop'),
				videoTimePassed = document.querySelector('.video-time__passed'),
				videoProgress = document.querySelector('.video-progress'),
				videoTimeTotal = document.querySelector('.video-time__total');
	
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

	const udatePlayerTime = () => {
		const currentTime = videoPlayer.currentTime,
					duration = videoPlayer.duration;

		videoProgress.value = (currentTime / duration) * 100;

		let minutesPassed = Math.floor(currentTime / 60),
				secondsPassed = Math.floor(currentTime % 60),
				minutesTotal = Math.floor(duration / 60),
				secondsTotal = Math.floor(duration % 60);

		videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
		videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
	};

	videoPlayer.addEventListener('click', togglePlay);
	videoButtonPlay.addEventListener('click', togglePlay);
	videoButtonStop.addEventListener('click', stopPlay);
	
	videoPlayer.addEventListener('play', toggleIcon);
	videoPlayer.addEventListener('pause', toggleIcon);

	videoPlayer.addEventListener('timeupdate', udatePlayerTime);

	videoProgress.addEventListener('change', () => {
		const duration = videoPlayer.duration,
					value = videoProgress.value;

		videoPlayer.currentTime = (value * duration) / 100;
	});

	udatePlayerTime();
};