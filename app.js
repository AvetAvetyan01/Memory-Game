
// RANDOM CARDS 

const cardsImg = document.querySelectorAll(".cardImg")

const cardsSRC = [
    "CardsImages/Dama.jpg",
    "CardsImages/Joker.jpg",
    "CardsImages/Tuz.jpg",
    "CardsImages/Valet.png"
]

function splitCards(){
    let randomCardsSRC = []
    let indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    cardsSRC.map(elm => {
        for (let i = 0; i < 4; i++){
            let randomIndx = Math.round(Math.random() * (indexes.length - 1))
            randomCardsSRC[indexes[randomIndx]] = elm
            indexes.splice(randomIndx,1)
        }
    })

    cardsImg.forEach((elm,indx) => {
        elm.src = randomCardsSRC[indx]
    })
}

// Game Logic

let activeCard_1 = null
let activeCard_2 = null
let coincidence = 0

const popUp = document.getElementsByClassName("popUp")[0]
const popUpContent = popUp.querySelector("h2")
const timeContent = document.querySelector("#time p")
const cards = document.querySelectorAll(".card")
const newGameButton = document.getElementById("newGameButton")

newGameButton.onclick = function() {
    popUp.classList.remove("activePopUp")
    cardsImg.forEach(elm => {
        elm.parentElement.style.opacity = "1"
        elm.parentElement.style.transform = "scale(1)"
        elm.classList.remove("activeImg")
    })
    splitCards()
    
    let time = document.querySelector("#time")
    let t = 35
    let timing = setInterval(() => {
        time.style.opacity = "1"
        timeContent.innerText = "" + t
        if (coincidence != 8 && t == 0){
            popUpContent.innerText = "YOU LOSE"
            time.style.opacity = "0"
            popUp.classList.add("activePopUp")
            clearInterval(timing)
        }else if (coincidence == 8){
            time.style.opacity = "0"
            clearInterval(timing)
        }
        t--
    },1000)

    coincidence = 0
}


popUp.classList.add("activePopUp")
popUpContent.innerText = "PLAY GAME"


cards.forEach(elm => {
    elm.addEventListener("click", function(e){
        if (e.target.localName == "li"){
            if (activeCard_1 === null) {
                activeCard_1 = e.target
                activeCard_1.style = "transform: rotate3d(0, 1, 0, 180deg);"
                activeCard_1.firstChild.classList.add("activeImg")
            }else if (activeCard_2 === null){
                activeCard_2 = e.target
                activeCard_2.style = "transform: rotate3d(0, 1, 0, 180deg);"
                activeCard_2.firstChild.classList.add("activeImg")
                
                setTimeout(() => {
                    if (activeCard_1.firstChild.src == activeCard_2.firstChild.src){
                        coincidence++
                        activeCard_1.style.opacity = "0"
                        activeCard_2.style.opacity = "0"
                        activeCard_1 = null
                        activeCard_2 = null
                            
                        if (coincidence == 8)
                        setTimeout(() => {
                                popUpContent.innerText = "YOU WIN"
                                popUp.classList.add("activePopUp")
                            },600)
                            
                        }else{
                        activeCard_1.firstChild.classList.remove("activeImg")
                        activeCard_2.firstChild.classList.remove("activeImg")
                        activeCard_1.style = "transform: rotate3d(0, 1, 0, 0deg);"
                        activeCard_2.style = "transform: rotate3d(0, 1, 0, 0deg);"
                        activeCard_1 = null
                        activeCard_2 = null
                    }
                },750)
            }
        }else{
            if (activeCard_1 != null)
                if (e.target.dataset.imgid == activeCard_1.firstChild.dataset.imgid){
                    activeCard_1.firstChild.classList.remove("activeImg")
                    activeCard_1.style = "transform: rotate3d(0, 1, 0, 0deg);"
                    activeCard_1 = null
                }
        }
    })
})

// Start

splitCards()