
// ==========================================
// STUDENTHUB - PRACTICAL 6
// Student Profiles using Fetch API
// ==========================================

const studentList = document.getElementById("studentList");
const studentSearch = document.getElementById("studentSearch");
const departmentFilter = document.getElementById("departmentFilter");
const studentSort = document.getElementById("studentSort");

const studentPrevious = document.getElementById("studentPrevious");
const studentNext = document.getElementById("studentNext");

const studentPageInfo = document.getElementById("studentPageInfo");
const studentStatus = document.getElementById("studentStatus");
const studentEmptyMessage = document.getElementById("studentEmptyMessage");

let allStudents = [];
let filteredStudents = [];

let currentPage = 1;
const studentsPerPage = 6;


// 1. FETCH STUDENT DATA

async function loadStudents() {

    try {

        studentStatus.textContent = "Loading students...";

        const response = await fetch("data/students.json");

        if (!response.ok) {
            throw new Error("Unable to load student data.");
        }

        allStudents = await response.json();

        filteredStudents = [...allStudents];

        displayStudents();

    } catch (error) {

        studentStatus.textContent =
            "Sorry! Student data could not be loaded.";

        studentList.innerHTML = "";

        console.error("Error loading students:", error);

    }

}


// 2. DISPLAY STUDENT CARDS

function displayStudents() {

    studentList.innerHTML = "";

    const totalPages = Math.ceil(
        filteredStudents.length / studentsPerPage
    );

    if (filteredStudents.length === 0) {

        studentStatus.textContent = "Showing 0 students.";

        studentEmptyMessage.hidden = false;

        studentPageInfo.textContent = "Page 0";

        studentPrevious.disabled = true;
        studentNext.disabled = true;

        return;

    }

    studentEmptyMessage.hidden = true;

    const startIndex = (currentPage - 1) * studentsPerPage;

    const currentStudents = filteredStudents.slice(
        startIndex,
        startIndex + studentsPerPage
    );

    currentStudents.forEach(function(student) {

        const card = document.createElement("article");
        card.className = "student-card";

        const heading = document.createElement("h3");
        heading.textContent = student.name;

        const roll = document.createElement("p");
        roll.textContent = "Roll Number: " + student.rollNo;

        const department = document.createElement("p");
        department.textContent = "Department: " + student.department;

        const year = document.createElement("p");
        year.textContent = "Academic Year: " + student.year;

        const email = document.createElement("p");
        email.textContent = "Email: " + student.email;

        const skills = document.createElement("p");
        skills.textContent = "Skills: " + student.skills.join(", ");

        card.append(
            heading,
            roll,
            department,
            year,
            email,
            skills
        );

        studentList.appendChild(card);

    });

    studentStatus.textContent =
        `Showing ${filteredStudents.length} students.`;

    studentPageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;

    studentPrevious.disabled = currentPage === 1;
    studentNext.disabled = currentPage === totalPages;

}


// 3. SEARCH AND FILTER STUDENTS

function filterStudents() {

    const searchValue =
        studentSearch.value.toLowerCase().trim();

    const departmentValue = departmentFilter.value;

    filteredStudents = allStudents.filter(function(student) {

        const matchesSearch =
            student.name.toLowerCase().includes(searchValue) ||
            student.rollNo.toLowerCase().includes(searchValue);

        const matchesDepartment =
            departmentValue === "all" ||
            student.department === departmentValue;

        return matchesSearch && matchesDepartment;

    });

    currentPage = 1;

    sortStudents();

}


// 4. SORT STUDENTS

function sortStudents() {

    const sortValue = studentSort.value;

    filteredStudents.sort(function(a, b) {

        if (sortValue === "name-asc") {
            return a.name.localeCompare(b.name);
        }

        if (sortValue === "name-desc") {
            return b.name.localeCompare(a.name);
        }

    });

    displayStudents();

}


// 5. PAGINATION

studentNext.addEventListener("click", function() {

    const totalPages = Math.ceil(
        filteredStudents.length / studentsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        displayStudents();

    }

});


studentPrevious.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayStudents();

    }

});


// 6. EVENT LISTENERS

studentSearch.addEventListener("input", filterStudents);

departmentFilter.addEventListener("change", filterStudents);

studentSort.addEventListener("change", sortStudents);


// START APPLICATION

loadStudents();

console.log("StudentHub Student Profiles loaded successfully.");
