const Subject = require("./subjects"); // Assuming the file path is correct

// Array of subject names
const subjectNames = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography',
    'Computer Science', 'Economics', 'Art', 'Music', 'Physical Education', 'Psychology',
    'Sociology', 'Political Science', 'Literature', 'Philosophy', 'Statistics', 'Anthropology',
    'Environmental Science', 'Astrophysics', 'Astronomy', 'Botany', 'Zoology', 'Linguistics',
    'Anthropology', 'Sanskrit', 'French', 'German', 'Spanish', 'Chinese', 'Japanese',
    'Korean', 'Italian', 'Russian', 'Portuguese', 'Arabic', 'Latin', 'Greek'
];

// Create an array to hold promises for each subject creation
const promises = [];

const insertSubect = () => {
    // Iterate over the subject names array and create instances of Subject model
    subjectNames.forEach(subjectName => {
        promises.push(
            Subject.create({ subjectName })
                .then(subject => {
                    console.log(`Subject ${subject.subjectName} created successfully.`);
                })
                .catch(err => {
                    console.error(`Error creating subject ${subjectName}:`, err);
                })
        );
    });

    // Execute all promises
    Promise.all(promises)
        .then(() => {
            console.log('All subjects inserted successfully.');
            // Close the database connection if needed
        })
        .catch(err => {
            console.error('Error inserting subjects:', err);
            // Close the database connection if needed
        });

}


module.exports = insertSubect;


