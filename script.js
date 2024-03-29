const imageContainer =document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready=false;
let totalimages=0;
let imagesLoaded=0;
const count = 20;
const Acess_Key='HzdCi5cVT4oeu3vhl5AljtJUFs84wzkhs1BiKgQGk28';
let photos= []; 

// Unsplash Api

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${Acess_Key}&count=${count}`;

function imageLoaded (){
    if (totalimages === imageLoaded){
        ready=true;
        loader.hidden=true;

    }

}

function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key ,attributes[key]);
    }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalimages=photos.length;

    photos.forEach((photo)=>{

        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target',"_blank");
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })

        const img= document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,

        })
        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);



    })

}



// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response= await fetch(apiUrl);
        photos = await response.json();
        displayPhotos();
        // console.log(photos);
    }
    catch(error){
        console.log("Error",error);

    }

}
window.addEventListener('scroll',()=>{
    if (window.innerHeight + window.scrollY > document.body.offsetHeight -1000 && ready){
        ready=false;
        getPhotos();
        
    }
});

getPhotos();