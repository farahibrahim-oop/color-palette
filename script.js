document.addEventListener("DOMContentLoaded", loadPalettes);

 // Event listener for saving a new palette
 document.getElementById("savePalette").addEventListener("click", function (event) {
    event.preventDefault(); 

    let name = document.getElementById("paletteName").value;
    let color1 = document.getElementById("color1").value;
    let color2 = document.getElementById("color2").value;
    let color3 = document.getElementById("color3").value;

    // Validate that a name is provided
    if (!name) {
        alert("Please enter a name for your palette.");
        return;
    }

    // Create palette object and save it
    let palette = { name, colors: [color1, color2, color3] };
    savePalette(palette);

    location.reload(); // Refresh the page to update UI
});

// Function to save a palette to localStorage
function savePalette(palette) {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    palettes.push(palette);
    localStorage.setItem("palettes", JSON.stringify(palettes));
    loadPalettes();
}

// Function to load palettes from localStorage and display them
function loadPalettes() {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    let container = document.getElementById("palettesContainer");
    container.innerHTML = "";

    palettes.forEach((palette, index) => {
        let div = document.createElement("div");
        div.classList.add("palette");

        // Create and style palette name heading
        let nameHeading = document.createElement("h2");
        nameHeading.textContent = palette.name; 
        nameHeading.style.color = palette.colors[0]; 
        div.appendChild(nameHeading); 

        // Create color preview boxes
        let colorsDiv = document.createElement("div");
        palette.colors.forEach(color => {
            let colorBox = document.createElement("div");
            colorBox.style.background = color;
            colorBox.style.width = "30px";
            colorBox.style.height = "30px";
            colorBox.style.display = "inline-block";
            colorBox.style.margin = "4px";
            colorsDiv.appendChild(colorBox);
        });

        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            deletePalette(index);
        };

        // Append elements to palette div
        div.appendChild(colorsDiv);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

// Function to delete a palette from localStorage
function deletePalette(index) {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    palettes.splice(index, 1);
    localStorage.setItem("palettes", JSON.stringify(palettes));
    loadPalettes();
}