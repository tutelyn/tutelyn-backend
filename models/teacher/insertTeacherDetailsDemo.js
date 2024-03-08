const TeacherDetails = require("./teacherDetails")
const Teacher = require("./teacher")

async function insertTeachers() {
    // for (let i = 0; i < 200; i++) {
    //     await Teacher.create({ email: `joy${i}@email.com`, password: "dadjakldjakls$", userName: `joy${i}` });
    //     await TeacherDetails.create({
    //         firstName: `FirstName${i}`,
    //         lastName: `LastName${i}`,
    //         phNumber: Math.floor(Math.random() * 9000000000) + 1000000000, // Generating 10 digit phone number
    //         gender: Math.random() < 0.5 ? 'Male' : 'Female',
    //         yearOfExp: Math.floor(Math.random() * 20) + 1, // Random experience between 1 and 20 years
    //         specification: ['Maths', 'Physics', 'Chemistry'], // Example array of specialties
    //         subjects: ['Subject1', 'Subject2'], // Example array of subjects
    //         subjectsIdString: `-${Math.floor(Math.random() * 50)}-,-${Math.floor(Math.random() * 50)}-,-${Math.floor(Math.random() * 50)}-,-${Math.floor(Math.random() * 50)}-,`,
    //         latitude: Math.random() * 180 - 90, // Random latitude between -90 and 90
    //         longitude: Math.random() * 360 - 180, // Random longitude between -180 and 180
    //         pinCode: Math.floor(Math.random() * 90000) + 10000, // Generating 5 digit pin code
    //         address: `Address${i}`,
    //         qualification: ['Bachelor', 'Master'], // Example array of qualifications
    //         aaddharNo: `${Math.floor(Math.random() * 900000000000) + 100000000000}`, // Generating 12 digit Aadhar number
    //         teacherId: i + 1
    //     });
    // }

    for (let i = 0; i < 50; i++) {
        await Teacher.create({ email: `joy${i}@email.com`, password: "dadjakldjakls$", userName: `joy${i}` });
        await TeacherDetails.create({
            firstName: `FirstName${i}`,
            lastName: `LastName${i}`,
            phNumber: Math.floor(Math.random() * 9000000000) + 1000000000, // Generating 10 digit phone number
            gender: Math.random() < 0.5 ? 'Male' : 'Female',
            yearOfExp: Math.floor(Math.random() * 20) + 1, // Random experience between 1 and 20 years
            specification: ['Maths', 'Physics', 'Chemistry'], // Example array of specialties
            subjects: ['Subject1', 'Subject2'], // Example array of subjects
            subjectsIdString: "-33-",
            latitude: 77.83968577, // Random latitude between -90 and 90
            longitude: 66.10755794, // Random longitude between -180 and 180
            pinCode: 733134, // Generating 5 digit pin code
            address: `Address${i}`,
            qualification: ['Bachelor', 'Master'], // Example array of qualifications
            aaddharNo: `454545454545`, // Generating 12 digit Aadhar number
            teacherId: i + 1
        });
    }
}

module.exports = insertTeachers;