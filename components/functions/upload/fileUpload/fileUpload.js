const multer = require("multer")
const fileStorage= require("../fileStorage/fileStorage")
const fileFilter = require("../fileFilter/fileFilter")

//main event upload function
const fileUpload = multer({
  storage: fileStorage,
  limits: {
      fileSize: 1024 * 1024 * 6 // maximum 6MB file size
  },
  fileFilter: fileFilter
})

module.exports = fileUpload 