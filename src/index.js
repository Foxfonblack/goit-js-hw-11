import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { APIService } from "./js/apiservice";
import { LoadMoreBtn } from "./js/loadmorebtn";

const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

searchForm.addEventListener('submit', onSubmit)

const btn = new LoadMoreBtn({selector:".load-more", isHidden:true})
btn.hide()

const apis = new APIService()

let lightbox = new simpleLightbox('.link')
console.log(lightbox);

function onSubmit(evt){
evt.preventDefault()
gallery.innerHTML = ''
apis.pageReset()
apis.query = evt.currentTarget.elements.searchQuery.value
apis.getImages().then((data)=>{
    console.log(data);
    if (data.hits.length===0){
      btn.hide()
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    else if(data.hits.length){
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`) 
      btn.show()
    }
  
    const markup = createMarkup(data.hits)
    gallery.insertAdjacentHTML("beforeend", markup)
    lightbox.refresh()
}).catch((error)=>{
  console.log(error.message);
})
.finally(()=>{
  btn.enable()
})

}


btn.button.addEventListener("click", onLoadMoreClick)
function onLoadMoreClick(){
  btn.disable()
  apis.getImages().then((data)=>{
    let limit = (apis.page-1)*40
    if (data.totalHits<limit){
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      btn.hide()
    }
    const markup = createMarkup(data.hits)
    gallery.insertAdjacentHTML("beforeend", markup)
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * gallery.children.length,
  behavior: "smooth",
});
    lightbox.refresh()

  }).catch((error)=>{
    console.log(error.message);
  }).finally(()=>{
    btn.enable()
  })
}

function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>{
    return `<div class="photo-card">
    <a class="link simplelightbox" src="${largeImageURL}"><img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
  </div>`
    }).join("")
}
