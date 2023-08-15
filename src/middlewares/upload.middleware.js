const multer = require('multer');
const path = require('path');

const acceptedTypes = ["image/png", "image/jpg", "image/jpeg"];
// Create instance from multer.
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '../../public'),
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, `${date}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 500000,
  },
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    if (!acceptedTypes.includes(mimetype)) {
      cb({
        status: 400,
        errorName: 'file not allowed',
        error: `Only ${acceptedTypes.join(', ')} are allowed`
      });
    };
    cb(null, true) // false indicates that image will not upload
  }
});

module.exports = upload