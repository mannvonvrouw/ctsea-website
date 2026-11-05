const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cat-of-the-day', 'index.html');

async function updateCat() {
    try {
        console.log("Fetching cat from API...");
        const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=true');
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || data.length === 0) {
            throw new Error("No cat data received from API");
        }

        const cat = data[0];
        const catUrl = cat.url;
        const breedName = (cat.breeds && cat.breeds.length > 0) ? cat.breeds[0].name : "Unknown Breed";

        console.log(`Fetched cat URL: ${catUrl}`);
        console.log(`Fetched breed: ${breedName}`);

        if (!fs.existsSync(filePath)) {
            throw new Error(`HTML file not found at path: ${filePath}`);
        }

        let html = fs.readFileSync(filePath, 'utf8');

        const newImgTag = `<img id="cat-img" src="${catUrl}" alt="Cat of the Day" style="max-width: 100%; height: auto;">`;
        html = html.replace(/<img[^>]*id="cat-img"[^>]*>/, newImgTag);
        
        html = html.replace(/<p id="cat-breed">.*?<\/p>/, `<p id="cat-breed">Breed: ${breedName}</p>`);

        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Successfully updated index.html");
    } catch (error) {
        console.error("FAILED TO UPDATE CAT:", error.message);
        process.exit(1);
    }
}

updateCat();
