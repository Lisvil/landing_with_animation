
window.addEventListener('scroll', e => {
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`
})

let rotate_btn = document.querySelector('#rotate_btn');
let mainTitle = document.querySelector('.poster__title')
let mainSubTitle = document.querySelector('.poster__text')
let img1 = document.querySelector('#img1')
let img2 = document.querySelector('#img2')
let img3 = document.querySelector('#img3')
let counter = 0

let currentPlace = places[counter]

let contentTitle = document.querySelector('.description__title')
let contentBg = document.querySelector('.description__container')

let contentImages = document.querySelectorAll('.description__block-img1')

let contentImagesSmall = document.querySelectorAll('.description__block-img2')


let contentBlockTitles = document.querySelectorAll('.description__block-title')

let contentBlockText = document.querySelectorAll('.description__block-text')

mainTitle.textContent = currentPlace.name
mainSubTitle.textContent = currentPlace.description
img1.src = currentPlace.img
img2.src = currentPlace.img
img3.src = currentPlace.img


function changeContent() {
  contentTitle.textContent = currentPlace.info.title
  contentBg.style.backgroundImage = `url(${currentPlace.info.bg})`
  currentPlace.info.articles.forEach((el, index) => {
    contentBlockTitles[index].textContent = el.subtitle
    contentBlockText[index].textContent = el.text
    contentImages[index].src = el.pictures[0]
    contentImagesSmall[index].src = el.pictures[1]    
  });
}
changeContent()

rotate_btn.addEventListener('click', () => {
  counter++ 
  if (counter > places.length - 1) {
    counter = 0
  }
  currentPlace = places[counter]
  rotate_btn.classList.add('rotate__button--active')
  img1.classList.add('animation_1')
  img2.classList.add('animation_2')
  img3.classList.add('animation_3')

  mainTitle.classList.remove("animation_title_def")
  mainTitle.classList.add('animation_title')

  mainSubTitle.classList.remove("animation_sub-title_def")
  mainSubTitle.classList.add('animation_sub-title')
  changeContent()
  img1.addEventListener('animationend', () => {
    img1.classList.remove("animation_1")
    img1.src = currentPlace.img

  })

  img2.addEventListener('animationend', () => {
    img2.classList.remove("animation_2")
    img2.src = currentPlace.img


  })  
  
  img3.addEventListener('animationend', () => {
    img3.classList.remove("animation_3")
    img3.src = currentPlace.img

  })

  mainTitle.addEventListener('animationend', () => {
    mainTitle.classList.remove("animation_title")
    mainTitle.textContent = currentPlace.name
    mainTitle.classList.add('animation_title_def')
  })

  mainSubTitle.addEventListener('animationend', () => {
    mainSubTitle.classList.add("animation_sub-title_def")
    mainSubTitle.textContent = currentPlace.description

    mainSubTitle.classList.remove('animation_sub-title')
  })
  rotate_btn.addEventListener('animationend', () => {
    rotate_btn.classList.remove('rotate__button--active')
  })

})

let menu = document.querySelector('.header')
let share_btn = document.querySelector('.share__btn')
let description = document.querySelector('.description')
let poster = document.querySelector('.poster')

window.addEventListener('scroll', () => {
  let containerRect = description.getBoundingClientRect()
  let contentRect = menu.getBoundingClientRect()
  let contentShareRect = share_btn.getBoundingClientRect()

  if (contentRect.bottom > (containerRect.top - 70)) {
    menu.classList.add('header--active')
  } else {
    menu.classList.remove('header--active')
  }
  if (contentShareRect.bottom > containerRect.top) {
    share_btn.classList.add('share__btn--active')
  } else {
    share_btn.classList.remove('share__btn--active')
  }
})
