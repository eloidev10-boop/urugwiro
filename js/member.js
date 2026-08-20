/*=====================================================
PLP MEMBER PORTAL
member.js
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    renderEvents("upcoming");

    initEventFilters();

});

/*=========================================
EVENTS
=========================================*/

const eventsContainer =
document.getElementById("eventsContainer");

const filterButtons =
document.querySelectorAll(".filter-btn");

/*---------------------------------------
Render Events
---------------------------------------*/

function renderEvents(type){

    if(!eventsContainer) return;

    eventsContainer.innerHTML = "";

    const filteredEvents =
    events.filter(event => event.type === type);

    if(filteredEvents.length === 0){

        eventsContainer.innerHTML =

        `
        <div class="empty-events">

            <h3>No events found.</h3>

        </div>
        `;

        return;

    }

    filteredEvents.forEach(event=>{

        eventsContainer.innerHTML += `

        <div class="event-card">

            <div class="event-image">

                <img
                src="${event.image}"
                alt="${event.title}">

            </div>

            <div class="event-content">

                <span class="event-date">

                    ${event.date}

                </span>

                <h3>

                    ${event.title}

                </h3>

                <p>

                    ${event.description}

                </p>

                <div class="event-info">

                    <div>

                        📍 ${event.location}

                    </div>

                    <div>

                        🕒 ${event.time}

                    </div>

                    <div>

                        👥 ${event.organizer}

                    </div>

                </div>

                <button
                class="event-btn"
                onclick="showEvent(${event.id})">

                    View Details

                </button>

            </div>

        </div>

        `;

    });

}

/*---------------------------------------
Filter Buttons
---------------------------------------*/

function initEventFilters(){

    filterButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            filterButtons.forEach(btn=>{

                btn.classList.remove("active");

            });

            button.classList.add("active");

            renderEvents(button.dataset.type);

        });

    });

}

/*---------------------------------------
Event Modal
---------------------------------------*/

function showEvent(id){

const event = events.find(e=>e.id===id);

if(!event) return;

document.getElementById("modalImage").src=event.image;

document.getElementById("modalTitle").textContent=event.title;

document.getElementById("modalDate").textContent=event.date;

document.getElementById("modalDescription").textContent=event.description;

document.getElementById("modalLocation").textContent=event.location;

document.getElementById("modalTime").textContent=event.time;

document.getElementById("modalOrganizer").textContent=event.organizer;

const gallery=document.getElementById("galleryContainer");

gallery.innerHTML="";

event.gallery.forEach(image=>{

gallery.innerHTML+=`

<img src="${image}" alt="Gallery">

`;

});

const register=document.getElementById("registerContainer");

register.innerHTML="";

if(event.registration){

register.innerHTML=`

<a href="#" class="register-btn">

Register Now

</a>

`;

}

document.getElementById("eventModal")

.classList.add("show");

}
const modal=document.getElementById("eventModal");

document.getElementById("closeModal")

.onclick=()=>{

modal.classList.remove("show");

};

window.onclick=(e)=>{

if(e.target===modal){

modal.classList.remove("show");

}

};
/*=====================================================
LEADERSHIP HISTORY
======================================================*/

const leadersContainer = document.getElementById("leadersContainer");

/*-------------------------------------
Render Leaders
--------------------------------------*/

function renderLeaders() {

    if (!leadersContainer) return;

    leadersContainer.innerHTML = "";

    leaders.forEach(leader => {

        leadersContainer.innerHTML += `

        <div class="leader-card">

            <div class="leader-image">

                <img src="${leader.image}" alt="${leader.name}">

            </div>

            <div class="leader-content">

                <span class="leader-period">

                    ${leader.years}

                </span>

                <h3>

                    ${leader.name}

                </h3>

                <p class="leader-position">

                    ${leader.position}

                </p>

                <button
                    class="leader-btn"
                    onclick="showLeader(${leader.id})">

                    View Biography

                </button>

            </div>

        </div>

        `;

    });

}

renderLeaders();

/*-------------------------------------
Show Leader
--------------------------------------*/

function showLeader(id){

    const leader =
    leaders.find(item=>item.id===id);

    if(!leader) return;

    document.getElementById("leaderImage").src =
    leader.image;

    document.getElementById("leaderName").textContent =
    leader.name;

    document.getElementById("leaderYears").textContent =
    leader.years;

    document.getElementById("leaderPosition").textContent =
    leader.position;

    document.getElementById("leaderBiography").textContent =
    leader.biography;

    const achievementList =
    document.getElementById("leaderAchievements");

    achievementList.innerHTML="";

    leader.achievements.forEach(item=>{

        achievementList.innerHTML +=

        `<li>${item}</li>`;

    });

    const modal =
    document.getElementById("leaderModal");

    modal.classList.add("show");

}

/*-------------------------------------
Close Leader Modal
--------------------------------------*/

const leaderModal =
document.getElementById("leaderModal");

const leaderClose =
document.querySelector(".leader-close");

if(leaderClose){

leaderClose.onclick = ()=>{

leaderModal.classList.remove("show");

};

}

window.addEventListener("click",(e)=>{

if(e.target===leaderModal){

leaderModal.classList.remove("show");

}

});
