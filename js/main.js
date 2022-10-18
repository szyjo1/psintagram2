const URL = 'https://dog.ceo/api/breeds/list/all';

async function getBreeds() {
	const response = await fetch(URL);
	const data = await response.json();
	createList(data.message);
}
getBreeds();

const createList = (list) => {
	const breedList = document.getElementById('breed');
	if (breedList !== null) {
		breedList.innerHTML = ` <select onchange = "selectedBreed(this.value)">
       <option value="none" selected disabled>-- Wybierz rasę --</option>
    ${Object.keys(list).map((breed) => {
			return `<option>${
				breed.charAt(0).toUpperCase() + breed.slice(1)
			}</option>`;
		})}
  </select>
    `;
	}
};

async function selectedBreed(breed) {
	if (breed != '-- Wybierz rasę --') {
		const dog = breed.charAt(0).toLowerCase() + breed.slice(1);
		const response = await fetch(`https://dog.ceo/api/breed/${dog}/images`);
		const data = await response.json();
		showImg(data.message);
		showLink(dog);
	}
}

const showImg = (images) => {
	document.getElementById('dog-img').innerHTML = `
  <div class="dog-img" style="background-image: url('${
		images[Math.floor(Math.random() * images.length)]
	}')"> </div>
  `;
};

const showLink = (dog) => {
	const dogInfo = document.querySelector('.dog-info');

	dogInfo.style.display = 'block';
	dogInfo.innerHTML = `
    <p>Poczytaj więcej o tej rasie psów na wikipedii:</p>
        <a href="https://en.wikipedia.org/wiki/${dog}" target="_blank" class="wiki-link">${dog.toUpperCase()}</a>
        `;
};
