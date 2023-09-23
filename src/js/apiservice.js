import axios from "axios";


class APIService{
static API_KEY = '39515432-7ba9f533e83e7510801a9f0ec'
static BASE_URL = 'https://pixabay.com/api/'

constructor (){
    this.query = '';
    this.page = 1;
}

async getImages(){
    const searchParams = new URLSearchParams({
        key: APIService.API_KEY,
        page: this.page,
        per_page: 40,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    })
    // return fetch(`${APIService.BASE_URL}?${searchParams}`)
    // .then((resp)=>{
    //     if (!resp.ok){
    //         throw new Error(resp.statusText)
    //     }
    //     this.pageIncrement()
    //     return resp.json()
    // })
    // await
    try{
        const resp = await axios.get(`${APIService.BASE_URL}?${searchParams}`)
    this.pageIncrement()
    return resp.data

}
catch (error){
    console.log(error.message);
}
}
pageIncrement(){
    this.page+=1
}
pageReset(){
    this.page=1
}
}

export{APIService}