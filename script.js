/* ==========================================================
   ONE LAST DEPLOYMENT
   Created for Tripti Singh
========================================================== */

let allMessages = [];

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const messageContainer = document.getElementById("messageContainer");

const modal = document.getElementById("messageModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const terminal = document.getElementById("terminalText");

const startJourney = document.getElementById("startJourney");

/* ==========================================================
   LOAD JSON
========================================================== */

async function loadMessages(){

    try{

        const response = await fetch("messages.json");

        allMessages = await response.json();

        renderCards(allMessages);

    }

    catch(error){

        console.error(error);

    }

}

loadMessages();

/* ==========================================================
   TERMINAL ANIMATION
========================================================== */

const terminalLines = [

"$ git clone intellipaat",

"Receiving Objects...",

"Building Memories...",

"Learning UI/UX...",

"Installing DevOps...",

"Configuring AWS...",

"Mentoring Team...",

"Final Deployment Successful ❤️"

];

let currentLine = 0;

function typeTerminal(){

    if(currentLine >= terminalLines.length){

        return;

    }

    let line = terminalLines[currentLine];

    let i = 0;

    const p = document.createElement("div");

    terminal.appendChild(p);

    function typing(){

        if(i < line.length){

            p.innerHTML += line.charAt(i);

            i++;

            setTimeout(typing,35);

        }

        else{

            currentLine++;

            setTimeout(typeTerminal,450);

        }

    }

    typing();

}

window.addEventListener("load",()=>{

    terminal.innerHTML="";

    typeTerminal();

});

/* ==========================================================
   CREATE MESSAGE CARDS
========================================================== */

function renderCards(data){

    messageContainer.innerHTML="";

    data.forEach(person=>{

        const card=document.createElement("div");

        card.className="message-card fade-up";

        card.innerHTML=`

            <h3>${person.name}</h3>

            <h4>${person.team}</h4>

            <p>

                ${person.short}

            </p>

            <div class="read-btn">

                Read Message →

            </div>

        `;

        card.onclick=()=>{

            openMessage(person);

        };

        messageContainer.appendChild(card);

    });

}

/* ==========================================================
   MODAL
========================================================== */

function openMessage(person){

    modal.style.display="flex";

    modalTitle.innerHTML=person.name;

    modalBody.innerHTML=`

        <h3 style="color:#00d4ff;margin-bottom:20px;">

            ${person.team}

        </h3>

        <p>

            ${person.message}

        </p>

    `;

}

closeModal.onclick=()=>{

    modal.style.display="none";

};

window.onclick=(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};
/* ==========================================================
   LIVE SEARCH
========================================================== */

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    if (keyword === "") {

        suggestions.innerHTML = "";

        renderCards(allMessages);

        return;

    }

    const results = allMessages.filter(person => {

        const name = person.name.toLowerCase();

        const team = person.team.toLowerCase();

        const short = person.short.toLowerCase();

        const search = (person.search || []).join(" ").toLowerCase();

        return (
            name.includes(keyword) ||
            team.includes(keyword) ||
            short.includes(keyword) ||
            search.includes(keyword)
        );

    });

    renderSuggestions(results);

    renderCards(results);

});

/* ==========================================================
   SEARCH SUGGESTIONS
========================================================== */

function renderSuggestions(results){

    suggestions.innerHTML = "";

    if(results.length === 0){

        suggestions.innerHTML = `
            <div class="search-result">
                <h3>No Results Found 😔</h3>
                <p>Try another name or team.</p>
            </div>
        `;

        return;

    }

    results.slice(0,6).forEach(person=>{

        const div = document.createElement("div");

        div.className = "search-result";

        div.innerHTML = `
            <h3>${person.name}</h3>
            <p>${person.team}</p>
        `;

        div.onclick = () => {

            searchInput.value = person.name;

            suggestions.innerHTML = "";

            renderCards([person]);

            openMessage(person);

        };

        suggestions.appendChild(div);

    });

}

/* ==========================================================
   BEGIN JOURNEY BUTTON
========================================================== */

startJourney.addEventListener("click",()=>{

    document
        .getElementById("story")
        .scrollIntoView({

            behavior:"smooth"

        });

});

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

function observeElements(){

    document
        .querySelectorAll(
            ".fade-up,.fade-left,.fade-right,.zoom"
        )
        .forEach(item=>{

            observer.observe(item);

        });

}

window.addEventListener("load",observeElements);

/* ==========================================================
   ESC KEY CLOSE MODAL
========================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.style.display="none";

    }

});

/* ==========================================================
   AUTO CLOSE SEARCH AFTER CLICK
========================================================== */

document.addEventListener("click",(e)=>{

    if(
        !searchInput.contains(e.target) &&
        !suggestions.contains(e.target)
    ){

        suggestions.innerHTML="";

    }

});

/* ==========================================================
   SCROLL TO TOP WHEN PAGE RELOADS
========================================================== */

window.onbeforeunload=()=>{

    window.scrollTo(0,0);

};
/* ==========================================================
   CARD COUNT
========================================================== */

function updateCardCount(){

    let counter = document.getElementById("cardCounter");

    if(!counter){

        counter = document.createElement("div");

        counter.id = "cardCounter";

        counter.style.textAlign = "center";
        counter.style.marginBottom = "30px";
        counter.style.color = "#8fa4c9";
        counter.style.fontSize = "18px";

        const section = document.getElementById("messages");

        section.insertBefore(counter, messageContainer);

    }

    counter.innerHTML = `
        Showing <strong style="color:#00d4ff">
        ${document.querySelectorAll(".message-card").length}
        </strong> Appreciation Messages
    `;

}

/* ==========================================================
   OVERRIDE RENDER CARDS
========================================================== */

const oldRenderCards = renderCards;

renderCards = function(data){

    oldRenderCards(data);

    updateCardCount();

}

/* ==========================================================
   RANDOM CARD ANIMATION
========================================================== */

function animateCards(){

    const cards = document.querySelectorAll(".message-card");

    cards.forEach((card,index)=>{

        card.style.opacity = "0";

        card.style.transform = "translateY(40px)";

        setTimeout(()=>{

            card.style.transition = ".5s ease";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        },index*70);

    });

}

const originalRender = renderCards;

renderCards = function(data){

    originalRender(data);

    animateCards();

}

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 150;

        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

/* ==========================================================
   SMALL PARALLAX
========================================================== */

window.addEventListener("scroll",()=>{

    const bg = document.querySelector(".background");

    bg.style.transform =
    `translateY(${window.scrollY*0.08}px)`;

});

/* ==========================================================
   FOOTER YEAR
========================================================== */

const footer = document.querySelector("footer");

const year = new Date().getFullYear();

footer.innerHTML += `
<p style="margin-top:15px;font-size:14px;color:#6b7fa4;">
© ${year} • Built with ❤️ by Tripti Singh
</p>
`;

/* ==========================================================
   EASTER EGG
========================================================== */

let keys = "";

window.addEventListener("keydown",(e)=>{

    keys += e.key.toLowerCase();

    if(keys.length > 15){

        keys = keys.slice(-15);

    }

    if(keys.includes("devops")){

        alert(
`🚀 Deployment Successful!

Thank you for being part of my journey.

❤️
Tripti Singh`
        );

        keys = "";

    }

});
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const speed = target/100;

            const update=()=>{

                count += speed;

                if(count < target){

                    counter.innerText=Math.floor(count);

                    requestAnimationFrame(update);

                }else{

                    counter.innerText=target.toLocaleString();

                }

            }

            update();

            observer.unobserve(counter);

        }

    });

},{threshold:.4});

counters.forEach(counter=>observer.observe(counter));

/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.clear();

console.log("%cOne Last Deployment",
"font-size:34px;font-weight:bold;color:#6C63FF;");

console.log("%cDesigned & Developed by Tripti Singh",
"font-size:18px;color:#00d4ff;");

console.log("%cThank you Intellipaat ❤️",
"font-size:16px;color:#81ffcb;");

/* ==========================================================
   END
========================================================== */
