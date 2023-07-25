let mainButton = [...document.querySelectorAll(".main-button")], 
    mainBg = [...document.querySelectorAll(".main-bg")], 
    countSection = document.querySelector(".countdown"), 
    count = [...document.querySelectorAll(".count")], 
    overs = [...document.querySelectorAll(".over")],
    portfolioImags = [...document.querySelectorAll(".portfolio .image")],
    mobileScreen = 576,
    cog = document.querySelector(".cog"),
    cogIcon = document.querySelector(".cog .icon"),
    options = [...document.querySelectorAll(".cog .option")],
    filterImages = [...document.querySelectorAll(".filter")], 
    bollets = document.querySelector(".bollets"),
    navbarUl = document.querySelector(".navbar .navbar-collapse"),
    navbarToggle = document.querySelector(".navbar .navbar-toggler"),
    navbarLiA = [...document.querySelectorAll("nav .list li a")],
    countContent = []; 
mainButton.forEach((btn) => {
    btn.classList.add("wow", "animate__animated");
    if (btn != document.querySelector(".services .main-button")) {
        btn.classList.add("animate__delay-1s");
    }
})
mainBg.forEach((bg) => {
    bg.style.backgroundColor = ` var(--mainColor)`;
})
// start cog 
cogIcon.onclick = (() =>  {
    cogIcon.children[0].classList.toggle("fa-spin");
    cog.classList.toggle("translate-x")
})
options.forEach((opt) => {
    let lis = [...opt.children];
    lis.forEach((li) => {
        if (opt.classList.contains("colors-opt")) {
            li.style.backgroundColor = li.dataset.color;
        }
        li.onclick = (() => {
            removeAllActive(lis);
            li.classList.add("active");
            if (opt.classList.contains("colors-opt")) {
                document.documentElement.style.setProperty("--mainColor", li.dataset.color);
                filterImages.forEach((img) => {
                    img.src = `images/${li.dataset.name}/${img.dataset.name}`;
                })
            }
            if (opt.classList.contains("bollets-opt")) {
                let bollets = document.querySelector("body > .bollets");
                if (li.textContent == "no") {
                    bollets.classList.add("hide");
                } else if (li.textContent == "yes") {
                    bollets.classList.remove("hide");
                }
            }
        })
    })
})
navbarToggle.onclick = (() => {
    let navAfter = document.querySelector(".navbar .navbar-collapse .after");
    if (navbarUl.classList.contains("show")) {
        let navHeight = document.querySelector(".navbar .navbar-collapse").getBoundingClientRect(); 
        if (cog.classList.contains("translate-x")) {
            cog.style.transform = `translate(-100%, ${navHeight})`
        } else {
            cog.style.transform = `translate(0, ${navHeight})`
        }
    }
})
// start bollets 
creatBollets();
function creatBollets() {
    for (let i = 0; i < navbarLiA.length; i++) {
        let li = document.createElement("li"), 
            a = document.createElement("a");
        a.textContent = navbarLiA[i].textContent;
        a.href = navbarLiA[i].href;
        li.appendChild(a);
        let location = document.querySelector(`#${a.textContent.split(" ")[0]}`)
        li.addEventListener("click", (() => {
            window.scrollTo(0, location.offsetTop);
        }))
        bollets.appendChild(li);
        chooseSection();
        function chooseSection() {
            if (scrollY >= location.offsetTop -250 && scrollY <= location.offsetTop + location.offsetHeight - 250) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
        }
        window.addEventListener("scroll", chooseSection)
    }
}
// start count down
countCont();
countPlay();
window.addEventListener("scroll", countPlay);
function countPlay() {
    if (scrollY >= countSection.offsetTop - 250) {
        for (let i = 0; i < count.length; i++) {
            let countNum = 0;
            let countdown = setInterval(() => {
                if (parseInt(count[i].textContent) != countContent[i]) {
                    count[i].textContent = `${++countNum}+`;
                } else {
                    clearInterval(countdown);
                    count[i].parentElement.classList.remove("opacity-75");
                }
            }, 3000 / countContent[i])
        } 
    }
}
function countCont() {
    for (let i = 0; i < count.length; i++) {
        countContent.push(parseInt(count[i].textContent));
    }
    count.forEach((count) => {
        count.textContent = 0;
    })
}
// start blog
overs.forEach((over) => {
    let read = over.nextElementSibling;
    showHide(read, over)
})
// start portfolio 
iconDimensions();
function iconDimensions() {
    let iconHeight = 6,
        screenWindow = window.screen.height,
        pixelsDimensions = screenWindow * iconHeight / 100,
        pixelsDimensionsText = `${pixelsDimensions}px`;
    if (screenWindow >= mobileScreen)  {
        portfolioImags.forEach((image) => {
            image.addEventListener("click", (() => {
                let vh = document.createElement("div"),
                    close = document.createElement("div"),
                    icon = document.createElement("div"), 
                    i = document.createElement("i"), 
                    show = document.createElement("div"), 
                    imgDiv = document.createElement("div"), 
                    img = document.createElement("img");
                vh.classList.add("vh-page", "d-flex", "align-items-center", "justify-content-center");
                show.classList.add("show");
                close.classList.add("close");
                icon.classList.add("icon");
                i.classList.add("fas", "fa-close");
                close.style.height = pixelsDimensionsText;
                icon.appendChild(i);
                close.appendChild(icon);
                icon.addEventListener("click", (() => {
                    icon.parentElement.parentElement.parentElement.remove();
                }));
                imgDiv.classList.add(".image")
                img.src = image.children[0].src;
                imgDiv.appendChild(img);
                show.appendChild(close);
                show.appendChild(imgDiv);
                vh.appendChild(show);
                document.body.appendChild(vh);
                image.onclick = (() => {
                    removeAllActive([...document.querySelectorAll("vh-page")]);
                    vh.classList.add("active")
                })
            }))
        })
    }
}
// global function
function removeAllActive(siblings) {
    siblings.forEach((el) => {
        el.classList.remove("active");
    })
}
function showHide(show, hide) {
    show.onclick = (() => {
        show.classList.add("hide");
        hide.classList.remove("hide");
    })
    hide.onclick = (() => {
        hide.classList.add("hide");
        show.classList.remove("hide");
    })
}