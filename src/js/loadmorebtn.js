class LoadMoreBtn {
    constructor({
        selector,
        isHidden = false
    }) {
        this.button = this.getBtn(selector)
        if (isHidden){
            this.hide()
        }
    }
    getBtn(selector){
        return document.querySelector(selector)
    }
    disable(){
        this.button.disable = true
        this.button.textContent = 'Loading...'
    }
    enable(){
        this.button.disable = false
        this.button.textContent = 'Load more'  
    }
    hide(){
        this.button.hidden = true
    }
    show(){
        this.button.hidden = false
    }
}

export {LoadMoreBtn}