const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Folder where files will be uploaded
  },
  filename: function (req, file, cb) {
    console.log(req.body.time)
    cb(null, file.fieldname + '-' + req.body.time + path.extname(file.originalname))
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // Limit file size to 1MB
}).single('file');

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      if (req.file === undefined) {
        res.status(400).json({ error: 'No file selected' });
      } else {
        console.log(req.file)
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.fieldname + '-' + req.body.time + path.extname(req.file.originalname)}`;
        console.log(imageUrl)
        res.json({
          "status": 200,
          "pic-url": imageUrl
        });
        // res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
      }
    }
  });

});

router.post('/get-image-url', (req, res) => {
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.body.pic}`;
  console.log(imageUrl)
  res.send(imageUrl);
});

module.exports = router
