// import multer from 'multer'

// const storage = multer.diskStrorage({
//     filename: function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export default upload; // ✅ THIS LINE is what you were missing

