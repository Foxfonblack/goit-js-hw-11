import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { APIService } from "./js/apiservice";
import { LoadMoreBtn } from "./js/loadmorebtn";

const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

searchForm.addEventListener('submit', onSubmit)

const apis = new APIService()
function onSubmit(evt){
evt.preventDefault()
gallery.innerHTML = ''
apis.pageReset()
apis.query = evt.currentTarget.elements.searchQuery.value
apis.getImages().then((data)=>{
    console.log(data.hits);
    const markup = createMarkup(data.hits)
    gallery.insertAdjacentHTML("beforeend", markup)
    
})

}
const btn = new LoadMoreBtn({selector:".load-more", isHidden:true})
btn.hide()

btn.button.addEventListener("click", onLoadMoreClick)
function onLoadMoreClick(){
  btn.disable()
  apis.getImages().then((data)=>{
    const markup = createMarkup(data.hits)
    gallery.insertAdjacentHTML("beforeend", markup)

  }).catch((error)=>{
    console.log(error.message);
  }).finally(()=>{
    btn.enable()
  })
}

function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>{
    return `<div class="photo-card">
    <img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Vievs</b>
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
