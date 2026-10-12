
  const preloaderBakgroundElement = document.querySelector(`.preloader__background-part:nth-child(2)`)
    if(preloaderBakgroundElement) {
      preloaderBakgroundElement.addEventListener(`animationend`, (e) => {
        if(e.animationName === `toHide`) {
          preloaderBakgroundElement.dispatchEvent(new CustomEvent(`preloaderClose`, {bubbles: true, detail: { closeAnimatiomName: e.animationName}}))
          preloaderBakgroundElement.parentElement.style.display = `none`
        }
      })
    }