// external import
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// database
const sequelize = require("./db/database")

//models
const Teacher = require('./models/teacher/teacher')
const Student = require('./models/student/student')
const StudentDetails = require("./models/student/studentDetails")
const TeacherDetails = require('./models/teacher/teacherDetails')
const insertSubject = require("./models/subject/insertSubject")
const insertTeachers = require("./models/teacher/insertTeacherDetailsDemo")
// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const subjectRouter = require("./routes/getSubjects")
const forgetpasswordRouter = require('./routes/otpGenerate')
const authRouter = require('./routes/auth');
const updateDetailsRouter = require('./routes/updateUserDetails');
const getTeacherRouter = require('./routes/getTeachersRoute');
const createBatch = require('./routes/handleBatch')
const studentDetails = require('./routes/studentProfile')
const insertCSVData = require('./models/city/insertCities');
const TeacherClass = require('./models/teacherClass/teacherClass');
const Batch = require('./models/batch/batch');
const Student_Batch = require('./models/batch/student_batch');

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/csv', express.static(path.join(__dirname, 'csv')));

app.use("/auth", authRouter);
app.use('/', indexRouter);
app.use('/forgot-password', forgetpasswordRouter);
app.use('/users', usersRouter);
app.use('/update-details', updateDetailsRouter);
app.use('/subjects', subjectRouter)
app.use('/teacher', getTeacherRouter)
app.use('/batch', createBatch)
app.use('/student', studentDetails)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "path not found" })
});

Student.hasOne(StudentDetails, { foreignKey: 'studentId' });
Teacher.hasOne(TeacherDetails, { foreignKey: 'teacherId' });
Teacher.hasMany(TeacherClass, { foreignKey: 'teacherid' });
TeacherClass.hasMany(Batch, { foreignKey: 'classid' });



Student.belongsToMany(Batch, { through: Student_Batch });

sequelize.sync({ force: true }).then((r) => {
  insertSubject();
  // insertTeachers();
  // insertCSVData('./csv/cities.csv');
  console.log("sync");


}).catch((e) => {
  console.log("error1", e);
})

module.exports = app;
