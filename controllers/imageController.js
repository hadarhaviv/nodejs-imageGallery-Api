const imagesModel = require("../models/images-model");

class ImageController {
  static getImages(params = {}, select = {}, options = {}) {
    return new Promise((resolve, reject) => {
      imagesModel.find(params, select, options, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static saveImage(image) {
    return new Promise((resolve, reject) => {
      const curImage = new imagesModel(image);
      curImage.save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = ImageController;
