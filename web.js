const axios = require('axios');
const fs = require('fs');

const baseUrl = 'xyz'; //url of the website
const searchQuery = 'javascript'; // Example search query
const maxPages = 3; // Number of pages to scrape
const outputFile = 'job_listings.txt'; // Output file to store scraped data

async function scrapeJobListings() {
    try {
        let jobListings = [];

        for (let i = 1; i <= maxPages; i++) {
            const url = `${baseUrl}?q=${searchQuery}&pg=${i}`;
            const response = await axios.get(url);

            const jobs = parseJobListings(response.data);
            jobListings = jobListings.concat(jobs);
        }

        saveToFile(jobListings);
        console.log('Scraping completed successfully.');
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

function parseJobListings(data) {
    // Implement parsing logic to extract job listings from the HTML response
    // Return an array of job listings
}

function saveToFile(data) {
    try {
        let text = '';
        data.filter(job => job && job.title && job.company && job.location && job.link)
            .forEach(job => {
                text += `Title: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nURL: ${job.link}\n\n`;
            });

        console.log('Text to write to file:', text); // Debugging statement
        fs.writeFileSync(outputFile, text, 'utf-8');
        console.log(`Data saved to ${outputFile}`);
    } catch (error) {
        console.error('Error saving data to file:', error);
    }
}

scrapeJobListings();
