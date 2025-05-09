// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.addEventListener('scroll', function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    });
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Generic function to dynamically create HTML elements from a JSON file
function createElementsFromJSON(sectionId, jsonFile, imageSubfolder) {
    const container = document.querySelector(`#${sectionId} .container`);
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch(jsonFile)
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card ${sectionId === 'skills' ? 'skillsText' : 'portfolioContent'}" data-cy="${sectionId === 'skills' ? 'skill-item' : 'portfolio-item'}">
                        <div class="card-body">
                            <img src="./images/${imageSubfolder}/${item.image}" alt="${item.title}"/>
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                            <div class="btn-container">
                                ${item.site ? `<a href="${item.site}" class="btn btn-success">Site</a>` : ''}
                                ${item.git ? `<a href="${item.git}" class="btn btn-success">Lien GitHub</a>` : ''}
                            </div>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch((error) => {
            console.error(`Erreur lors du chargement des données pour ${sectionId}:`, error);
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createElementsFromJSON('skills', 'data/skills.json', 'skills_img');
createElementsFromJSON('portfolio', 'data/portfolio.json', 'portfolio_img');

