var DOMAIN = "qlinks.tk"
var PORT = "80"
var URLSCHEMA = "https"


var modalLinkBlur = document.querySelector(".modal-link-blur")
var modalLink = document.querySelector(".modal-link")
var modalLInkP = document.querySelector(".modal-link p")
var modalLinkBlurClose = document.querySelector(".modal-link-close")
var urlInput = document.querySelector(".inner-box input")
var shortItBtn = document.querySelector(".shorten-btn")
var copyBtn = document.querySelector(".copy-btn")



copyBtn.addEventListener("click", () => {
    console.log("click")
    var text = modalLInkP.innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    copyBtn.innerHTML = "Copied!"
    copyBtn.style.border = "2px solid limegreen"
})


shortItBtn.addEventListener("click", () => {
    var url = urlInput.value
    fetch(`${URLSCHEMA}://${DOMAIN}${PORT ? ":" + PORT : ""}/link?long_link=${url}`, {
        method: 'POST',
    })
    .then(res => {
        if (!res.ok) {
            console.log("error")
        } else {
            res.json()
            .then(json => {

                var shortenedUrl = json.short_link
                modalLInkP.innerHTML = `${URLSCHEMA}://${DOMAIN}${PORT ? ":" + PORT : ""}/r/${shortenedUrl}`
                modalLinkBlur.style.display = "flex"
                
            })
        }
    })
})

modalLinkBlurClose.addEventListener("click", () => {
    console.log("click")
    modalLinkBlur.style.display = "none"
})
