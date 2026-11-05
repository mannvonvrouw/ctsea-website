const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cat-of-the-day', 'index.html');

async function updateCat() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=true');
        const data = await response.json();
        
        if (!data || data.length === 0) {
            throw new Error("No cat data received from API");
        }

        const cat = data[0];
        const catUrl = cat.url;
        const breedName = (cat.breeds && cat.breeds.length > 0) ? cat.breeds[0].name : "Unknown Breed";

        let html = fs.readFileSync(filePath, 'utf8');

        const newImgTag = `<img id="cat-img" src="${catUrl}" alt="Cat of the Day" style="max-width: 100%; height: auto;">`;
        html = html.replace(/<img[^>]*id="cat-img"[^>]*>/, newImgTag);
        
        html = html.replace(/<p id="cat-breed">.*?<\/p>/, `<p id="cat-breed">Breed: ${breedName}</p>`);

        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated Cat of the Day: ${catUrl}`);
    } catch (error) {
        console.error("Failed to update cat:", error);
        process.exit(1);
    }
}

updateCat();
