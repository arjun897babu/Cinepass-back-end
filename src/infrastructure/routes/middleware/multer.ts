import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, '..', '..', 'uploads'))
  },
  filename: (req, file, callBack) => {
   callBack(null,Date.now()+'_'+path.extname(file.originalname))
  },
})

export const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } })
