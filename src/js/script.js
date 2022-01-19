let latid = 47.4979
let longi = 19.0402
async function geo(){
    navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude
        lon = position.coords.longitude
        fetchPhotos(lat, lon)
    }, function(){
        fetchPhotos(latid, longi)
    })
}
geo()


// Função responsável por fazer a requizição na API
const imgPhoto = document.querySelector(".img")
let listPhotos = []
const h3Title = document.querySelector(".h3-legenda")

async function fetchPhotos(lat, lon){
    await fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=401e2cb8ac3c8748a9c84dd3697bacec&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${lat}&lon=${lon}&text=city`)
    .then((res) => res.json())
    .then((data) => {
        listPhotos = data.photos.photo
        imgPhoto.src = constructImageURL(data.photos.photo[0])
        h3Title.innerText = data.photos.photo[0].title
    })
}


// Função responsável por montar a url de renderização 
function constructImageURL(photoObj){
    return `https://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`
}


// Função responsável por passar as imagens após o clique em avançar
const buttonFrente = document.querySelector(".button-frente")
let front = 1
function buttonFront(){
    let arrayPhotos = listPhotos
    console.log(arrayPhotos[front].title)
    imgPhoto.src = constructImageURL(arrayPhotos[front])
    h3Title.innerText = arrayPhotos[front].title
    if(front +1 == arrayPhotos.length){
        front = 0
    } else{
        front += 1
    }
}
console.log(listPhotos)
    
buttonFrente.addEventListener("click", buttonFront)


