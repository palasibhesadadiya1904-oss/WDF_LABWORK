
// ==========================================
// STUDENTHUB - PRACTICAL 6
// Fetch API, Search, Filter, Sort and Pagination
// ==========================================

const eventList = document.getElementById("eventList");
const eventSearch = document.getElementById("eventSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortEvents = document.getElementById("sortEvents");

const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");

const pageInfo = document.getElementById("pageInfo");
const eventStatus = document.getElementById("eventStatus");
const emptyMessage = document.getElementById("emptyMessage");

let allEvents = [];
let filteredEvents = [];

let currentPage = 1;
const eventsPerPage = 6;


// 1. FETCH JSON DATA

async function loadEvents() {

    try {

        eventStatus.textContent = "Loading events...";

        const response = await fetch("data/events.json");

        if (!response.ok) {
            throw new Error("Unable to load event data.");
        }

        allEvents = await response.json();

        filteredEvents = [...allEvents];

        displayEvents();

    } catch (error) {

        eventStatus.textContent =
            "Sorry! Events could not be loaded.";

        eventList.innerHTML = "";

        console.error("Error loading events:", error);

    }

}


// 2. DISPLAY EVENT CARDS

function displayEvents() {

    eventList.innerHTML = "";

    const totalPages = Math.ceil(
        filteredEvents.length / eventsPerPage
    );

    if (filteredEvents.length === 0) {

        eventStatus.textContent = "Showing 0 events.";
        emptyMessage.hidden = false;

        pageInfo.textContent = "Page 0";
        previousPage.disabled = true;
        nextPage.disabled = true;

        return;

    }

    emptyMessage.hidden = true;

    const startIndex = (currentPage - 1) * eventsPerPage;

    const currentEvents = filteredEvents.slice(
        startIndex,
        startIndex + eventsPerPage
    );

    currentEvents.forEach(function(event) {

        const card = document.createElement("article");

        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.title}</h3>

            <p class="event-category">
                ${event.category}
            </p>

            <p><strong>Date:</strong> ${event.date}</p>

            <p><strong>Time:</strong> ${event.time}</p>

            <p><strong>Venue:</strong> ${event.venue}</p>

            <p>${event.description}</p>
        `;

        eventList.appendChild(card);

    });

    eventStatus.textContent =
        `Showing ${filteredEvents.length} events.`;

    pageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;

    previousPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;

}


// 3. SEARCH AND FILTER EVENTS

function filterEvents() {

    const searchValue = eventSearch.value.toLowerCase().trim();

    const categoryValue = categoryFilter.value;

    filteredEvents = allEvents.filter(function(event) {

        const matchesSearch =
            event.title.toLowerCase().includes(searchValue) ||
            event.venue.toLowerCase().includes(searchValue) ||
            event.description.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            event.category === categoryValue;

        return matchesSearch && matchesCategory;

    });

    currentPage = 1;

    sortEventData();

}


// 4. SORT EVENTS

function sortEventData() {

    const sortValue = sortEvents.value;

    filteredEvents.sort(function(a, b) {

        if (sortValue === "date-asc") {
            return new Date(a.date) - new Date(b.date);
        }

        if (sortValue === "date-desc") {
            return new Date(b.date) - new Date(a.date);
        }

        if (sortValue === "title-asc") {
            return a.title.localeCompare(b.title);
        }

        if (sortValue === "title-desc") {
            return b.title.localeCompare(a.title);
        }

    });

    displayEvents();

}


// 5. PAGINATION

nextPage.addEventListener("click", function() {

    const totalPages = Math.ceil(
        filteredEvents.length / eventsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        displayEvents();

    }

});


previousPage.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayEvents();

    }

});


// 6. EVENT LISTENERS

eventSearch.addEventListener("input", filterEvents);

categoryFilter.addEventListener("change", filterEvents);

sortEvents.addEventListener("change", function() {

    sortEventData();

});


// START APPLICATION

loadEvents();

console.log("StudentHub Events JavaScript loaded successfully.");
