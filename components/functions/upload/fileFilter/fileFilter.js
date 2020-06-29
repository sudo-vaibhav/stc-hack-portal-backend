const multer = require("multer")

//to filter files according to mimetype
const fileFilter = (req, file, cb) => {
  //criteria to accept a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg') {
      cb(null, true)
  } else {
      cb(null,false)
  }
}

module.exports = fileFilter