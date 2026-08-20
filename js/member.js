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

    const event =
    events.find(item=>item.id===id);

    if(!event) return;

    alert(

`${event.title}

Date: ${event.date}

Time: ${event.time}

Location: ${event.location}

Organizer: ${event.organizer}

${event.description}`

);

}
