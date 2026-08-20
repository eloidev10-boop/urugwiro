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

/*=========================================
  SHOW LEADER DETAILS
=========================================*/

function showLeader(id) {

    const leader = leaders.find(
        item => item.id === id
    );

    if (!leader) return;


    /*---------------------------------------
      BASIC INFORMATION
    ---------------------------------------*/

    document.getElementById("leaderImage").src =
        leader.image;

    document.getElementById("leaderImage").alt =
        leader.name;

    document.getElementById("leaderName").textContent =
        leader.name;

    document.getElementById("leaderYears").textContent =
        leader.years;

    document.getElementById("leaderPosition").textContent =
        leader.position;

    document.getElementById("leaderBiography").textContent =
        leader.biography;


    /*---------------------------------------
      VISION
    ---------------------------------------*/

    const vision =
        document.getElementById("leaderVision");

    if (vision) {

        vision.textContent =
            leader.vision || "No vision information available.";

    }


    /*---------------------------------------
      ACHIEVEMENTS
    ---------------------------------------*/

    const achievements =
        document.getElementById("leaderAchievements");

    achievements.innerHTML = "";

    if (
        Array.isArray(leader.achievements) &&
        leader.achievements.length > 0
    ) {

        leader.achievements.forEach(
            achievement => {

                const li =
                    document.createElement("li");

                li.textContent = achievement;

                achievements.appendChild(li);

            }
        );

    } else {

        achievements.innerHTML =
            "<li>No achievements recorded.</li>";

    }


    /*---------------------------------------
      PROJECTS
    ---------------------------------------*/

    const projects =
        document.getElementById("leaderProjects");

    projects.innerHTML = "";

    if (
        Array.isArray(leader.projects) &&
        leader.projects.length > 0
    ) {

        leader.projects.forEach(
            project => {

                const li =
                    document.createElement("li");

                li.textContent = project;

                projects.appendChild(li);

            }
        );

    } else {

        projects.innerHTML =
            "<li>No projects recorded.</li>";

    }


    /*---------------------------------------
      OPEN MODAL
    ---------------------------------------*/

    const modal =
        document.getElementById("leaderModal");

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}
/*-------------------------------------
Close Leader Modal
--------------------------------------*/

/*=========================================
  LEADER MODAL CONTROLS
=========================================*/

const leaderModal =
    document.getElementById("leaderModal");

const leaderClose =
    document.querySelector(".leader-close");


function closeLeaderModal() {

    if (!leaderModal) return;

    leaderModal.classList.remove("show");

    document.body.style.overflow = "";

}


if (leaderClose) {

    leaderClose.addEventListener(
        "click",
        closeLeaderModal
    );

}


if (leaderModal) {

    leaderModal.addEventListener(
        "click",
        function (event) {

            if (event.target === leaderModal) {

                closeLeaderModal();

            }

        }
    );

}


/* ESC KEY */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            leaderModal &&
            leaderModal.classList.contains("show")
        ) {

            closeLeaderModal();

        }

    }
);
/*=====================================================
   CURRENT LEADERSHIP
=====================================================*/

const committeeContainer =
    document.getElementById("committeeContainer");


function renderCurrentLeaders() {

    if (!committeeContainer) return;

    committeeContainer.innerHTML = "";

    currentLeaders.forEach(leader => {

        committeeContainer.innerHTML += `

            <article class="committee-card">

                <div class="committee-image">

                    <img
                        src="${leader.image}"
                        alt="${leader.name}"
                        loading="lazy"
                    >

                </div>

                <div class="committee-card-body">

                    <span class="committee-card-position">
                        ${leader.position}
                    </span>

                    <h3>
                        ${leader.name}
                    </h3>

                    <p>
                        ${leader.area}
                    </p>

                    <button
                        type="button"
                        class="committee-btn"
                        onclick="showCommitteeLeader(${leader.id})"
                    >
                        View Profile
                    </button>

                </div>

            </article>

        `;

    });

}


renderCurrentLeaders();
/*=====================================================
   CURRENT LEADER PROFILE
=====================================================*/

function showCommitteeLeader(id) {

    const leader =
        currentLeaders.find(
            item => item.id === id
        );

    if (!leader) return;


    const image =
        document.getElementById(
            "committeeModalImage"
        );

    const position =
        document.getElementById(
            "committeeModalPosition"
        );

    const name =
        document.getElementById(
            "committeeModalName"
        );

    const bio =
        document.getElementById(
            "committeeModalBio"
        );

    const area =
        document.getElementById(
            "committeeModalArea"
        );

    const responsibilities =
        document.getElementById(
            "committeeModalResponsibilities"
        );


    /* Image */

    image.src = leader.image;

    image.alt = leader.name;


    /* Basic information */

    position.textContent =
        leader.position;

    name.textContent =
        leader.name;

    bio.textContent =
        leader.bio;

    area.textContent =
        leader.area;


    /* Responsibilities */

    responsibilities.innerHTML = "";


    if (
        Array.isArray(
            leader.responsibilities
        )
    ) {

        leader.responsibilities.forEach(
            responsibility => {

                const li =
                    document.createElement("li");

                li.textContent =
                    responsibility;

                responsibilities.appendChild(li);

            }
        );

    }


    /* Open modal */

    const modal =
        document.getElementById(
            "committeeModal"
        );

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}
/*=====================================================
   CURRENT LEADER MODAL CONTROLS
=====================================================*/

const committeeModal =
    document.getElementById(
        "committeeModal"
    );

const committeeClose =
    document.getElementById(
        "committeeClose"
    );


function closeCommitteeModal() {

    if (!committeeModal) return;

    committeeModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


if (committeeClose) {

    committeeClose.addEventListener(
        "click",
        closeCommitteeModal
    );

}


if (committeeModal) {

    committeeModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                committeeModal
            ) {

                closeCommitteeModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            committeeModal &&
            committeeModal.classList.contains(
                "show"
            )
        ) {

            closeCommitteeModal();

        }

    }
);
/*=====================================================
  FOOTER YEAR
=====================================================*/

const footerYear =
    document.getElementById("footerYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}
