
// ==========================================
// STUDENTHUB - PRACTICAL 6
// Dynamic FAQs using Fetch API
// ==========================================

const faqList = document.getElementById("faqList");
const faqSearch = document.getElementById("faqSearch");
const faqCategory = document.getElementById("faqCategory");

const faqPrevious = document.getElementById("faqPrevious");
const faqNext = document.getElementById("faqNext");

const faqPageInfo = document.getElementById("faqPageInfo");
const faqStatus = document.getElementById("faqStatus");
const faqEmptyMessage = document.getElementById("faqEmptyMessage");

let allFAQs = [];
let filteredFAQs = [];

let currentPage = 1;
const faqsPerPage = 6;


// 1. FETCH FAQ DATA

async function loadFAQs() {

    try {

        faqStatus.textContent = "Loading questions...";

        const response = await fetch("data/faqs.json");

        if (!response.ok) {
            throw new Error("Unable to load FAQ data.");
        }

        allFAQs = await response.json();

        filteredFAQs = [...allFAQs];

        displayFAQs();

    } catch (error) {

        faqStatus.textContent =
            "Sorry! FAQ data could not be loaded.";

        faqList.innerHTML = "";

        console.error("Error loading FAQs:", error);

    }

}


// 2. DISPLAY FAQ CARDS

function displayFAQs() {

    faqList.innerHTML = "";

    const totalPages = Math.ceil(
        filteredFAQs.length / faqsPerPage
    );

    if (filteredFAQs.length === 0) {

        faqStatus.textContent = "Showing 0 questions.";

        faqEmptyMessage.hidden = false;

        faqPageInfo.textContent = "Page 0";

        faqPrevious.disabled = true;
        faqNext.disabled = true;

        return;

    }

    faqEmptyMessage.hidden = true;

    const startIndex = (currentPage - 1) * faqsPerPage;

    const currentFAQs = filteredFAQs.slice(
        startIndex,
        startIndex + faqsPerPage
    );

    currentFAQs.forEach(function(faq) {

        const card = document.createElement("article");
        card.className = "faq-card";

        const heading = document.createElement("h3");
        heading.textContent = faq.question;

        const category = document.createElement("p");
        category.className = "faq-category";
        category.textContent = faq.category;

        const answer = document.createElement("p");
        answer.className = "faq-answer";
        answer.textContent = faq.answer;

        card.append(heading, category, answer);

        faqList.appendChild(card);

    });

    faqStatus.textContent =
        `Showing ${filteredFAQs.length} questions.`;

    faqPageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;

    faqPrevious.disabled = currentPage === 1;
    faqNext.disabled = currentPage === totalPages;

}


// 3. SEARCH AND FILTER FAQs

function filterFAQs() {

    const searchValue =
        faqSearch.value.toLowerCase().trim();

    const categoryValue = faqCategory.value;

    filteredFAQs = allFAQs.filter(function(faq) {

        const matchesSearch =
            faq.question.toLowerCase().includes(searchValue) ||
            faq.answer.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            faq.category === categoryValue;

        return matchesSearch && matchesCategory;

    });

    currentPage = 1;

    displayFAQs();

}


// 4. PAGINATION

faqNext.addEventListener("click", function() {

    const totalPages = Math.ceil(
        filteredFAQs.length / faqsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        displayFAQs();

    }

});


faqPrevious.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayFAQs();

    }

});


// 5. EVENT LISTENERS

faqSearch.addEventListener("input", filterFAQs);

faqCategory.addEventListener("change", filterFAQs);


// START APPLICATION

loadFAQs();

console.log("StudentHub FAQ JavaScript loaded successfully.");
