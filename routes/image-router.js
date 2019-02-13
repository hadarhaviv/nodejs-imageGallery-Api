const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const generatefileName = require("../utills/generatefileName");

router.get("/", async (req, res, next) => {
  try {
    const images = await imageController.getImages({}, null, {
      sort: { date: -1 }
    });
    res.json(images);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get("/:hashtag", async (req, res, next) => {
  const curHashtag = req.params.hashtag;
  try {
    const images = await imageController.getImages({
      hashtags: { $regex: `.*${curHashtag}` }
    });
    res.json(images);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/uploadimage", async (req, res, next) => {
  const uploadedFile = req.files.myImage;
  const hashtags = req.body.hashtags.split(",");
  let newFileName = generatefileName();
  let newImage = {
    path: `http://localhost:5000/uploads/${newFileName}.jpg`,
    hashtags
  };
  try {
    const saveImageRes = await imageController.saveImage(newImage);
    uploadedFile.mv(`uploads/${newFileName}.jpg`, err => {
      if (err) {
        res.json({
          message: `${uploadedFile.name} was not saved`,
          err: JSON.stringify(err)
        });
      } else {
        res.json({ message: `${uploadedFile.name} saved` });
      }
    });
  } catch (err) {
    res.status(404).json({ err: "somthing went wrong image wasnt saved" });
  }
});

module.exports = router;
