import multer from "multer";

const fileUpload = (fileName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${fileName}`)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    })

    const upload = multer({ storage: storage })

    return upload.single(fileName)

}

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}