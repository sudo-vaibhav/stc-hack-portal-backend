const multer = require("multer")

//to filter files according to mimetype
const fileFilter = (req, file, cb) => {
  //criteria to accept a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb("wrong image format", false)
  }
}

module.exports = fileFilter