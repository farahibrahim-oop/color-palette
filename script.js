document.addEventListener("DOMContentLoaded", loadPalettes);

document.getElementById("savePalette").addEventListener("click", function (event) {
    event.preventDefault(); 

    let name = document.getElementById("paletteName").value ;
    let color1 = document.getElementById("color1").value;
    let color2 = document.getElementById("color2").value;
    let color3 = document.getElementById("color3").value ;

    if (!name) {
        alert("Please enter a name for your palette.");
        return;
    }

    let palette = { name, colors: [color1, color2, color3] };
    savePalette(palette);

   
    location.reload();
});

function savePalette(palette) {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    palettes.push(palette);
    localStorage.setItem("palettes", JSON.stringify(palettes));
    loadPalettes();
}

function loadPalettes() {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    let container = document.getElementById("palettesContainer");
    container.innerHTML = "";

    palettes.forEach((palette, index) => {
        let div = document.createElement("div");
        div.classList.add("palette");

        
        
        let nameHeading = document.createElement("h2");
        nameHeading.textContent = palette.name; 
        div.appendChild(nameHeading); 
        nameHeading.style.color = palette.colors[0]; 

        let colorsDiv = document.createElement("div");
        palette.colors.forEach(color => {
            let colorBox = document.createElement("div");
            colorBox.style.background = color;
            colorBox.style.width = "30px";
            colorBox.style.height = "30px";
            colorBox.style.display = "inline-block";
            margin = "4px";
            colorsDiv.appendChild(colorBox);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            deletePalette(index);
        };

        
        div.appendChild(colorsDiv);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

function deletePalette(index) {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    palettes.splice(index, 1);
    localStorage.setItem("palettes", JSON.stringify(palettes));
    loadPalettes();
}
