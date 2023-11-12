const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// unsplash API
const count = 30;
const apiKey = 'EeBE9ReBQYUHt46Ok-SoYFxvtPXBJf78oJNwGScEva8';
const unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&topics=architecture-interior`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imageLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// helper function to set attribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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
        // event listere, check when each is finished loading
        img.addEventListener('load', imageLoaded);
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
        displayPhotos();
    } catch (error) {
        // catch error
    }
}

// check to see if scrolling near bottom page, load more photos
window.addEventListener('scroll', () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos();