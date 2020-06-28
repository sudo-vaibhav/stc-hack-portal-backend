const multer = require("multer")
const path = require("path")

//storage mechanism for multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads/eventUpload')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

module.exports = fileStorage