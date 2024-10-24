const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


async function imageValidation(files) {
    try {
        if (!files || Object.keys(files).length === 0) {
            return 'No file is uploaded!'
        }

        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!Array.isArray(files)) {
            files = [files]
        }

        if (Array.isArray(files)) {

            // Handle multiple files
            for (const file of files) {

                if (!allowedTypes.includes(file.mimetype)) {
                    return 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.'
                }

                // Validate file size
                if (file.size > maxSize) {
                    return 'File size exceeds the 5MB limit.'
                }
                file.name = Date.now() + '-' + file.name;

                await sharp(file.data)
                    .resize({
                        width: 360
                    })
                    .png({ quality: 70, compressionLevel: 5 })
                    .jpeg({ quality: 70 })
                    .toFile(`uploads/${file.name}`)
            }

            return
        }
        //else {
        //     if (!allowedTypes.includes(files.mimetype)) {
        //         return 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.';
        //     }
        //     // Validate file size
        //     if (files.size > maxSize) {
        //         return 'File size exceeds the 2MB limit.';
        //     }
        //     // If only one file is uploaded, handle it separately
        //     files.name = Date.now() + '-' + files.name
        //     // let uploadPath = path.join(uploadDir, files.name);
        //     await sharp(files.data)
        //         .resize({
        //             width: 200
        //         })
        //         .png({ quality: 70, compressionLevel: 5 })
        //         .jpeg({ quality: 70 })
        //         .toFile(`uploads/${files.name}`)
        // }
        // return

    } catch (error) {
        return error
    }
};



module.exports = {
    imageValidation
}