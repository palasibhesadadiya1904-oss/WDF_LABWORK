
// ==========================================
// STUDENTHUB - PRACTICAL 4
// JavaScript DOM Manipulation and Interactivity
// ==========================================


// 1. COLLAPSIBLE FAQ

const faqQuestions = document.querySelectorAll("[data-faq-question]");

faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const answer = question.nextElementSibling;

        const isOpen = question.getAttribute("aria-expanded") === "true";

        question.setAttribute("aria-expanded", !isOpen);

        if (answer) {
            answer.hidden = isOpen;
        }

    });

});


// 2. MODAL POPUP

const modal = document.querySelector("#studentModal");
const openModalButtons = document.querySelectorAll("[data-modal-open]");
const closeModalButtons = document.querySelectorAll("[data-modal-close]");

function openModal() {
    if (modal) {
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
    }
}

function closeModal() {
    if (modal) {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
    }
}

openModalButtons.forEach(function(button) {
    button.addEventListener("click", openModal);
});

closeModalButtons.forEach(function(button) {
    button.addEventListener("click", closeModal);
});

if (modal) {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


// 3. CONTENT SLIDER

const slides = document.querySelectorAll("[data-slide]");
const previousButton = document.querySelector("#previousSlide");
const nextButton = document.querySelector("#nextSlide");

let currentSlide = 0;

function showSlide(index) {

    if (slides.length === 0) {
        return;
    }

    slides.forEach(function(slide, i) {
        slide.hidden = i !== index;
    });

    currentSlide = index;
}

if (slides.length > 0) {

    showSlide(currentSlide);

    if (nextButton) {
        nextButton.addEventListener("click", function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (previousButton) {
        previousButton.addEventListener("click", function() {
            currentSlide =
                (currentSlide - 1 + slides.length) % slides.length;

            showSlide(currentSlide);
        });
    }
}


// 4. NOTIFICATION BANNER

const notification = document.querySelector("#notificationBanner");
const closeNotification = document.querySelector("#closeNotification");

if (closeNotification && notification) {

    closeNotification.addEventListener("click", function() {
        notification.hidden = true;
    });

}


// 5. HAMBURGER MENU

const menuButton = document.querySelector("#menuButton");
const navigationMenu = document.querySelector("#mainNavigation");

if (menuButton && navigationMenu) {

    menuButton.addEventListener("click", function() {

        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", !isExpanded);

        navigationMenu.classList.toggle("menu-open");

    });

}


// 6. LIGHT AND DARK THEME SWITCHER

const themeButton = document.querySelector("#themeButton");

function applyTheme(theme) {

    document.body.classList.toggle("dark-theme", theme === "dark");

    if (themeButton) {
        themeButton.textContent =
            theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";

        themeButton.setAttribute(
            "aria-pressed",
            theme === "dark"
        );
    }

}

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("studenthub-theme") || "light";
} catch (error) {
    console.log("Theme preference could not be loaded.");
}

applyTheme(savedTheme);

if (themeButton) {

    themeButton.addEventListener("click", function() {

        const newTheme =
            document.body.classList.contains("dark-theme")
                ? "light"
                : "dark";

        applyTheme(newTheme);

        try {
            localStorage.setItem("studenthub-theme", newTheme);
        } catch (error) {
            console.log("Theme preference could not be saved.");
        }

    });

}

console.log("StudentHub Practical 4 JavaScript loaded successfully.");
