export const radioPlayerInit = () => {
	const radio = document.querySelector('.radio'),
				radioNavigation = document.querySelector('.radio-navigation'),
				radioHeaderBig = document.querySelector('.radio-header__big'),
				radioCoverImg = document.querySelector('.radio-cover__img'),
				radioItem = document.querySelectorAll('.radio-item'),
				radioStop = document.querySelector('.radio-stop'),
				radioVolume = document.querySelector('.radio-volume'),
				radioVolumeDown = document.getElementById('radio-volume-down'),
				radioVolumeUp = document.getElementById('radio-volume-up');

	const audio = new Audio();
	audio.type = 'audio/aac';

	radioStop.disabled = true;

	const toggleIcon = () => {
		if (audio.paused) {
			radio.classList.remove('play');
			radioStop.classList.remove('fa-pause');
			radioStop.classList.add('fa-play');
		} else {
			radio.classList.add('play');
			radioStop.classList.add('fa-pause');
			radioStop.classList.remove('fa-play');
		}
	};

	const selectItem = elem => {
		radioItem.forEach(item => item.classList.remove('select'));
		elem.classList.add('select');
	};

	const updateVolume = () => radioVolume.value = audio.volume * 100;

	radioNavigation.addEventListener('change', event => {
		const { target } = event,
					parent = target.closest('.radio-item'),
					title = parent.querySelector('.radio-name').textContent,
					img = parent.querySelector('.radio-img').src;

		radioHeaderBig.textContent = title;
		radioCoverImg.src = img;
		selectItem(parent);

		audio.src = target.dataset.radioStantion;
		audio.play();

		toggleIcon();
		radioStop.disabled = false;
	});

	radioStop.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}

		toggleIcon();
	});

	radioVolume.addEventListener('input', () => {
		audio.volume = radioVolume.value / 100;
	});

	radioVolumeDown.addEventListener('click', () => {
		if (audio.volume > 0.1) {
			audio.volume -= 0.1;
		} else {
			audio.volume = 0;
		}
		updateVolume();
	});

	radioVolumeUp.addEventListener('click', () => {
		if (audio.volume < 0.9) {
			audio.volume += 0.1;
		} else {
			audio.volume = 1;
		}
		updateVolume();
	});

	audio.volume = 0.5;
	updateVolume();
};