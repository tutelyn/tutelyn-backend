const Subject = require('./subjects'); // Adjust the path according to your project structure

async function insertSubjects() {
    try {


        const subjects = [];

        for (let i = 1; i <= 200; i++) {
            const randomClass = Math.floor(Math.random() * 12) + 1; // Generate random class between 1 and 12
            const subject = {
                subjectName: `Subject${i}`,
                class: randomClass
            };
            subjects.push(subject);
        }

        // Bulk insert subjects into the database
        await Subject.bulkCreate(subjects);

        console.log('Subjects inserted successfully.');
    } catch (error) {
        console.error('Error inserting subjects:', error);
    }
}

module.exports = insertSubjects;
