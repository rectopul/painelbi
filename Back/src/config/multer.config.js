"use strict";
exports.__esModule = true;
exports.multerOptions = void 0;
var common_1 = require("@nestjs/common");
var multer_1 = require("multer");
var path_1 = require("path");
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: function (req, file, cb) {
            var randomName = Array(32).fill(null).map(function () { return Math.round(Math.random() * 16).toString(16); }).join('');
            cb(null, "".concat(randomName).concat((0, path_1.extname)(file.originalname)));
        }
    }),
    fileFilter: function (req, file, cb) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException("Unsupported file type ".concat((0, path_1.extname)(file.originalname)), common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    limits: {
        fileSize: 15 * 1024 * 1024
    }
};
