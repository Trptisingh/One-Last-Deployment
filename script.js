/* ===========================================================
   ONE LAST DEPLOYMENT
   Tripti Singh
=========================================================== */

let messages = [];

/* ===========================================================
   DOM ELEMENTS
=========================================================== */

const terminal = document.getElementById("terminalText");
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const container = document.getElementById("messageContainer");

const modal = document.getElementById("messageModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const startJourney = document.getElementById("startJourney");

/* ===========================================================
   TERMINAL TYPING
=========================================================== */

const terminalLines = [
"$ whoami",
"Tripti Singh",
"",
"$ role",
"UI/UX",
"↓",
"DevOps/Cloud",
"↓",
"Team Lead",
"",
"$ status",
"Preparing One Last Deployment...",
"",
"$ goodbye",
"Thank You Intellipaat ❤️"
];

let terminalIndex = 0;
let characterIndex = 0;

function typeTerminal(){

    if(terminalIndex >= terminalLines.length) return;

    const line = terminalLines[terminalIndex];

    if(characterIndex < line.length){

        terminal.textContent += line.charAt(characterIndex);

        characterIndex++;

        setTimeout(typeTerminal,40);

    }else{

        terminal.textContent += "\n";

        terminalIndex++;

        characterIndex=0;

        setTimeout(typeTerminal,250);

    }

}

typeTerminal();

/* ===========================================================
   LOAD JSON
=========================================================== */

async function loadMessages(){

    try{

        const response = await fetch("messages.json");

        messages = await response.json();

        renderCards(messages);

    }catch(err){

        console.error(err);

        container.innerHTML=`
            <div class="glass">
                <h2>Unable to load appreciation messages.</h2>
                <p>Please check messages.json</p>
            </div>
        `;

    }

}

loadMessages();
/* ===========================================================
   RENDER CARDS
=========================================================== */

function renderCards(data){

    container.innerHTML="";

    if(data.length===0){

        container.innerHTML=`
            <div class="glass center">
                <h3>No Results Found 😔</h3>
                <p>Try searching using another name or team.</p>
            </div>
        `;

        updateCardCount();
        return;
    }

    data.forEach(person=>{

        const card=document.createElement("div");

        card.className="message-card";

        card.innerHTML=`
            <span class="team-badge">${person.team}</span>

            <h3>${person.name}</h3>

            <h4>${person.role}</h4>

            <p>${person.short}</p>

            <button class="read-btn">
                Read Message ❤️
            </button>
        `;

        card.addEventListener("click",()=>openMessage(person));

        container.appendChild(card);

    });

    updateCardCount();

    animateCards();

}

/* ===========================================================
   OPEN MESSAGE
=========================================================== */

function openMessage(person){

    if(!person) return;

    modalTitle.innerHTML = `
        ${person.name}
        <br>
        <small>${person.team}</small>
    `;

    modalBody.innerHTML = person.message
        ? `<p>${person.message
                .trim()
                .replace(/\n{2,}/g, "</p><p>")
                .replace(/\n/g, "<br>")}</p>`
        : "<p>Message not available.</p>";

    modal.classList.add("show");

}
/* ===========================================================
   CLOSE MODAL
=========================================================== */

closeModal.addEventListener("click",()=>{

    modal.classList.remove("show");

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("show");

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.classList.remove("show");

    }

});
/* ===========================================================
   SEARCH
=========================================================== */

searchInput.addEventListener("input",()=>{

    const value=searchInput.value.trim().toLowerCase();

    suggestions.innerHTML="";

    if(value===""){

        renderCards(messages);

        return;

    }

    const filtered=messages.filter(item=>{

        const searchText=[

            item.name,

            item.team,

            item.role,

            ...(item.search||[])

        ].join(" ").toLowerCase();

        return searchText.includes(value);

    });

    renderCards(filtered);

    filtered.slice(0,5).forEach(item=>{

        const div=document.createElement("div");

        div.className="suggestion";

        div.textContent=`${item.name} • ${item.team}`;

        div.onclick=()=>{

            searchInput.value=item.name;

            suggestions.innerHTML="";

            renderCards([item]);

        };

        suggestions.appendChild(div);

    });

});
/* ===========================================================
   BEGIN JOURNEY BUTTON
=========================================================== */

if(startJourney){

    startJourney.addEventListener("click",()=>{

        const story=document.getElementById("story");

        if(story){

            story.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

}

/* ===========================================================
   SCROLL REVEAL ANIMATION
=========================================================== */

const revealElements=document.querySelectorAll(

    "section,.step,.card,.glass,.stat-card"

);

const revealObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

revealElements.forEach(el=>{

    el.classList.add("hidden");

    revealObserver.observe(el);

});

/* ===========================================================
   ACTIVE NAVBAR
=========================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/* ===========================================================
   PARALLAX BACKGROUND
=========================================================== */

window.addEventListener("scroll",()=>{

    const bg=document.querySelector(".background");

    if(bg){

        bg.style.transform=`translateY(${window.scrollY*0.15}px)`;

    }

});

/* ===========================================================
   FLOATING ICON EFFECT
=========================================================== */

document.querySelectorAll(".float-icon").forEach((icon,index)=>{

    icon.style.animationDelay=`${index*1.2}s`;

});
/* ===========================================================
   CARD COUNT
=========================================================== */

function updateCardCount(){

    let counter=document.getElementById("cardCounter");

    if(!counter){

        counter=document.createElement("p");

        counter.id="cardCounter";

        counter.className="center mb40";

        const section=document.getElementById("messages");

        const title=section.querySelector("h2");

        title.insertAdjacentElement("afterend",counter);

    }

    counter.innerHTML=`Showing <strong>${container.children.length}</strong> Appreciation Message${container.children.length===1?"":"s"} ❤️`;

}

/* ===========================================================
   CARD ANIMATION
=========================================================== */

function animateCards(){

    const cards=document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(25px)";

        card.style.transition="all .5s ease";

        setTimeout(()=>{

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*60);

    });

}

/* ===========================================
   MILESTONE COUNTERS (fixed)
=========================================== */
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 120));
            function update() {
                current += increment;
                if (current < target) {
                    counter.textContent = current.toLocaleString();
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
            update();
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.4
});
counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ===========================================================
   EASTER EGG
=========================================================== */

searchInput.addEventListener("keydown",(e)=>{

    if(e.key!=="Enter") return;

    if(searchInput.value.trim().toLowerCase()==="devops"){

        alert("❤️ Once a DevOps Engineer, Always a DevOps Engineer ❤️");

    }

});
/* ===========================================================
   AUTO CLOSE SUGGESTIONS
=========================================================== */

document.addEventListener("click",(e)=>{

    if(
        !searchInput.contains(e.target) &&
        !suggestions.contains(e.target)
    ){

        suggestions.innerHTML="";

    }

});

/* ===========================================================
   PRESS ESC TO CLOSE MODAL
=========================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.style.display="none";

    }

});

/* ===========================================================
   SCROLL TO TOP ON LOGO CLICK
=========================================================== */

const logo=document.querySelector(".logo");

if(logo){

    logo.style.cursor="pointer";

    logo.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ===========================================================
   CONSOLE MESSAGE ❤️
=========================================================== */

console.log(`
========================================================

        ONE LAST DEPLOYMENT ❤️

        Built by Tripti Singh

        UI/UX → DevOps → Team Lead

        Thank You Intellipaat 🙏

========================================================
`);
