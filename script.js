<<<<<<< HEAD
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote
function newQuote() {
    loading();
    // pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author is blank and replace it with 'unknown'
    if (quote.author == null) {
        authorText.textcontent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine tstyling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // set quote, hide loader

    setTimeout(() => {
        quoteText.textContent = quote.text;
        complete();
    }, 500);

}

// get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (e) {
        // Catch error here
        alert(e);

    }
}

// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', newQuote);

// on load 
getQuotes();




=======
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// unsplash API
const count = 10;
const apiKey = 'EeBE9ReBQYUHt46Ok-SoYFxvtPXBJf78oJNwGScEva8';
const unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&topics=architecture-interior`;

// helper function to set attribute
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // creat <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(unsplashApi);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        // catch error
    }
}

// check to see if scrolling near bottom page, load more photos
window.addEventListener('scroll', () => {
    console.log('scrolled');
})

// on load
getPhotos();
>>>>>>> ad17ced (lazy load implementation)
