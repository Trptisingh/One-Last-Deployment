/*==================================================
 ONE LAST DEPLOYMENT
 Crafted for Tripti Singh
 Part 1
==================================================*/

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const modal = document.getElementById("messageModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const messageContainer = document.getElementById("messageContainer");

let messages = [];

/*=========================================
Load JSON
=========================================*/

async function loadMessages(){

    try{

        const response = await fetch("messages.json");

        messages = await response.json();

        createCards(messages);

    }

    catch(error){

        console.log(error);

    }

}

loadMessages();

/*=========================================
Create Cards
=========================================*/

function createCards(data){

    messageContainer.innerHTML = "";

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

        card.onclick=()=>openMessage(person);

        messageContainer.appendChild(card);

    });

}

/*=========================================
Open Modal
=========================================*/

function openMessage(person){

    modal.style.display="flex";

    modalTitle.innerHTML=person.name;

    modalBody.innerHTML=`

        <h3 style="margin-bottom:15px;color:#00d4ff;">

        ${person.team}

        </h3>

        <p>

        ${person.message}

        </p>

    `;

}

/*=========================================
Close Modal
=========================================*/

closeModal.onclick=()=>{

    modal.style.display="none";

};

window.onclick=(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};

/*=========================================
Search
=========================================*/

searchInput.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    if(value===""){

        suggestions.innerHTML="";

        createCards(messages);

        return;

    }

    const result=messages.filter(person=>{

        return(

            person.name.toLowerCase().includes(value)

            ||

            person.team.toLowerCase().includes(value)

            ||

            person.search.join(" ").toLowerCase().includes(value)

        );

    });

    createSuggestions(result);

    createCards(result);

});

/*=========================================
Suggestions
=========================================*/

function createSuggestions(result){

    suggestions.innerHTML="";

    result.slice(0,6).forEach(person=>{

        const div=document.createElement("div");

        div.className="search-result";

        div.innerHTML=`

            <h3>${person.name}</h3>

            <p>${person.team}</p>

        `;

        div.onclick=()=>{

            openMessage(person);

        };

        suggestions.appendChild(div);

    });

}

/*=========================================
Terminal Typing
=========================================*/

const terminalLines=[

"Initializing Deployment...",

"Loading Memories...",

"Connecting Team...",

"Searching Gratitude Database...",

"Deployment Successful."

];

const terminal=document.getElementById("terminalText");

let line=0;

function typeTerminal(){

    terminal.innerHTML="";

    let i=0;

    function write(){

        if(i<terminalLines[line].length){

            terminal.innerHTML+=terminalLines[line].charAt(i);

            i++;

            setTimeout(write,40);

        }

        else{

            terminal.innerHTML+="<br>";

            line++;

            if(line<terminalLines.length){

                setTimeout(typeTerminal,500);

            }

        }

    }

    write();

}

window.onload=()=>{

    typeTerminal();

};
