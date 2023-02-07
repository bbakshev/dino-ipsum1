/* eslint-disable no-unused-vars */
import './css/styles.css';

// Business Logic

function searchDino(paragraph, word) {
  let request = new XMLHttpRequest();
  const url = `https://dinoipsum.com/api/?format=json&words=5&paragraphs=5`;

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

// function printElement(apiResponse) {
//   let response = '';
//   apiResponse.forEach(function (paragraph){
//     response += paragraph.join(' ');
//   });
//   document.querySelector('#showResponse').innerText = response;
// }

function printGif(apiResponse) {
  document.querySelector('#showGif').innerText = ``;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const paragraphInput = document.querySelector('#paragraph').value;
  const wordInput = document.querySelector('#word').value;
  searchDino(paragraphInput,wordInput);
}

window.addEventListener("load", function() {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);
});