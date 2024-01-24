import { BadRequestException } from "@nestjs/common";
import { limits } from "argon2";
import { diskStorage } from "multer";

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg'];
const maxFileSize = 5 * 1024 * 1024

export const multerOptions = {
    storage: diskStorage({
        destination: "./static/upload",
        filename(req, file, callback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = file.originalname.split(".").pop();
            callback(null, uniqueSuffix + "." + extension);
        },
    }),
    fileFilter: (req, file, callback) => {
        if(allowedFileTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new BadRequestException('File type not allowed'), false);
        }
    },
    limits: {
        fileSize: maxFileSize
    }
}