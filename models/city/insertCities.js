const fs = require('fs');
const City = require('./city');
const csv = require('csv-parser')

// Function to read CSV file, parse its content, and insert into the database
async function insertCSVData(csvFilePath) {
    // Array to store parsed CSV data
    const data = [];
    console.log("zxkc")
    // Read the CSV file
    fs.createReadStream(csvFilePath)
        .on('error', (err) => {
            console.error('Error reading CSV file:', err);
        })
        .pipe(csv())
        .on('data', (row) => {
            // Process each row of the CSV file
            // console.log(row)
            const obj = {
                name: row.city,
                latitude: row.latitude,
                longitude: row.longitude

            }
            data.push(obj);
        })
        .on('end', async () => {
            try {
                // Insert data into the database using Sequelize
                await City.sync(); // Ensure the table is created
                await City.bulkCreate(data);
                console.log('Data inserted successfully');
            } catch (error) {
                console.error('Error inserting data:', error);
            }
        });

}

// Call the function with the path to your CSV file
// const csvFilePath = '../cities.csv';

module.exports = insertCSVData;