const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

let apiQuotes = [];

// show new quote
function newQuote() {
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

    quoteText.textContent = quote.text;

}

// get quotes from API
async function getQuotes() {
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
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// on load 
getQuotes();


