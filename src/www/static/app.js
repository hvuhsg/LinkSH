var DOMAIN = "qlinks.tk"
var PORT = ""
var URLSCHEMA = "https"


const inputUrl = document.querySelector(".app input")
const btnShort = document.querySelector(".app button")

const app = document.querySelector(".app")
const successModal = document.querySelector(".modal-container.success")
const successModalClose = document.querySelector(".modal-container.success .close-btn")
const copyBtn = document.querySelector(".modal-container.success .copy-btn")
const errorModal = document.querySelector(".modal-container.error")
const errorModalClose = document.querySelector(".modal-container.error .close-btn")
const header = document.querySelector("header")


const resultUrlArea = document.querySelector(".modal-success p")
const errorReasonArea = document.querySelector(".modal-error p")




const handleSucess = resultUrl => {
    resultUrlArea.innerText = resultUrl
    app.style.display = "none"
    header.style.display = "none"
    successModal.style.display = "flex"
}

const handleError = errorResponse => {
    errorReasonArea.innerText = "Internal server error : /"
    console.error(errorResponse)
    app.style.display = "none"
    header.style.display = "none"
    errorModal.style.display = "flex"
}

const copiedAnimation = () => {
    copyBtn.innerHTML = "Copied to clipboard!"
    copyBtn.style.border = "2px solid limegreen"

    setTimeout(() => {
        copyBtn.innerHTML = "Copy to clipboard"
        copyBtn.style.border = "none"
    }, 1000)
   
}


successModalClose.addEventListener("click", () => {
    app.style.display = "flex"
    header.style.display = "block"
    successModal.style.display = "none"
})

errorModalClose.addEventListener("click", () => {
    app.style.display = "flex"
    header.style.display = "block"
    errorModal.style.display = "none"
})



inputUrl.addEventListener("keyup", (e) => {
    if (e.key === 'Enter' || e.key === 13) {
        btnShort.click()
    }
})

btnShort.addEventListener("click", () => {
    console.log("shortening...")

    url = inputUrl.value

    if (! url ) return

    if ( ! url.startsWith("http") ) url = "http://" + url

    fetch(`${URLSCHEMA}://${DOMAIN}${PORT ? ":" + PORT : ""}/link?long_link=${url}`, {
        method: 'POST',
    })
    .then(res => {
        if ( !res.ok ) {
            console.log("error")
            handleError(res)
        } 
        else {
            res.json().then(json => {
                var shortenedUrl = json.short_link
                resultUrl = `${URLSCHEMA}://${DOMAIN}${PORT ? ":" + PORT : ""}/r/${shortenedUrl}`
                handleSucess(resultUrl)
            })
        }
    })
})



copyBtn.addEventListener("click", () => {
    console.log("copy..")
    window.navigator.vibrate(10)
    url = resultUrlArea.innerText
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = url;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem); 
    copiedAnimation()
})