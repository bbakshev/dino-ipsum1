/* eslint-disable no-unused-vars */
import './css/styles.css';

// Business Logic

function searchDino(word) {
  let request = new XMLHttpRequest();
  const url = `https://dinoipsum.com/api/?format=json&words=${word}`; // use generics so user can input values

  request.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElement(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function showDinoGif() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=dinosaur&limit=1&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printGif(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElement(apiResponse) {
  let response = '';
  for (let i = 0; i < apiResponse.length; i++) {
    response = apiResponse[i].join(', ');
  }
  document.querySelector('#showResponse').innerText = response;
}

// function printGif(apiResponse) {
//   document.getElementById('showGif').innerHTML = null;
//   let p = document.getElementById('showGif');
//   if (apiResponse.data[1]) {
//     apiResponse.data.forEach (element => {
//       p.setAttribute('class', 'imageResult');
//       p.innerHTML =+ `<img src='${element.images.original.url}`;
//       document.getElementById('showGif').append(p);
//     });
//   }
// }

function printGif(apiResponse) {
  let gif;
  apiResponse.data.forEach(function(element) {
    gif = document.createElement("img");
    gif.setAttribute("src", element["images"]["downsized_medium"]["url"]);
  });
  document.getElementById('showGif').append(gif);
}

// function printGif(apiResponse) {
//   document.querySelector('#showGif').innerText = `dinosaur!`;
// }

function handleFormSubmission(event) {
  event.preventDefault();
  // const paragraphInput = document.querySelector('#paragraph').value;
  const wordInput = document.querySelector('#word').value;
  searchDino(wordInput);
  showDinoGif();
}

window.addEventListener("load", function() {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);

});