const imageConatainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []

// Unsplash Url
const Api_key = 'm4aJao76CEJKu9uNffcuZRFV8PNOz7fs9ksGDMJXF5c'
const limit = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${Api_key}&count=${limit}`


// check if all images were loaded
function imageLoaded() {
    imagesLoaded ++;
    console.log('image loaded');

    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        console.log('ready =', ready)
    }
}

// helper function for setting attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// function show photo 
function showPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(totalImages)
    photosArray.forEach((photo) => {
        // create <a> tag
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        // create <img> tag
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        img.addEventListener('load', imageLoaded);
        // add img and item in parent tag
        item.appendChild(img);
        imageConatainer.appendChild(item)
    })
}


// function get photo
async function getPhoto() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json()
        showPhoto()
    } catch (error){
        console.log('ooops', error)
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000  && ready){
        ready = false;
        getPhoto()
    }
})

getPhoto()