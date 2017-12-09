const app = document.getElementById("root");

const logo = document.createElement("img");
logo.src = "logo.png";

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {
	
	// Start accessing Data here
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
  	data.forEach(movie => {
    	const card = document.createElement("div");
			card.setAttribute("class", "card");
			
			const h1 = document.createElement("h1");
			h1.textContent = movie.title;
			
			const h4 = document.createElement("h4");
			h4.textContent = `Directed By: ${movie.director} - ${movie.release_date}`;
			
			const h5 = document.createElement("h5");
			h5.textContent = `Rating: ${movie.rt_score}`;
			
			const p = document.createElement("p");
			movie.description = movie.description.substring(0, 300);
			p.textContent = `${movie.description}...`;
			
			// Append the cards to the container element
  		container.appendChild(card);

  		// Each card will contain an h1 and a p
  		card.appendChild(h1);
			card.appendChild(h4);
			card.appendChild(h5);
  		card.appendChild(p);
  	});
		
	} else {
  	const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	}
}

request.send();
