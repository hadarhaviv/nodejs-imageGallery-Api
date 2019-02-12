const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const generatefileName = require("../utills/generatefileName");

router.get("/", async (req, res, next) => {
  try {
    const images = await imageController.getImages();
    res.json(images);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get("/:hashtag", async (req, res, next) => {
  const curHashtag = req.params.hashtag;
  console.log("curhashtag: ", curHashtag);
  try {
    const images = await imageController.getImages({
      hashtags: { $regex: `.*${curHashtag}` }
    });
    // {
    //   hashtags: { $in: [`${curHashtag}`] }
    // }
    console.log("images: ", images);
    res.json(images);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/uploadimage", (req, res, next) => {
  const uploadedFile = req.files.myImage;
  const hashtags = req.body.hashtags.split(",");
  let newFileName = generatefileName();
  let newImage = {
    path: `http://localhost:5000/uploads/${newFileName}.jpg`,
    hashtags
  };
  const saveImageRes = imageController.saveImage(newImage);
  uploadedFile.mv(`uploads/${newFileName}.jpg`, err => {
    if (err) {
      res.json({
        message: `${req.files.name} was not saved`,
        err: JSON.stringify(err)
      });
    } else {
      res.json({ message: ` saved` });
    }
  });
});

module.exports = router;
