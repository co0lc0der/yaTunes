export const radioPlayerInit = () => {
	const radio = document.querySelector('.radio'),
				radioNavigation = document.querySelector('.radio-navigation'),
				radioHeaderBig = document.querySelector('.radio-header__big'),
				radioCoverImg = document.querySelector('.radio-cover__img'),
				radioItem = document.querySelectorAll('.radio-item'),
				radioStop = document.querySelector('.radio-stop');

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
};