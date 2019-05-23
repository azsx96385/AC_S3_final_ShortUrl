const router = require("express").Router();
const shortUrlModel = require("../models/shorturl");

router.get("/", (req, res) => {
  res.render("index");
});
//-[生成短網址]----------------------------------
router.post("/shorturl", (req, res) => {
  let { url } = req.body;
  if (!url) {
    req.flash("errorMessage", "系統訊息|欄位漏填");
    console.log("系統訊息|欄位漏填");
    res.redirect("/");
  } else {
    //產生隨機密碼
    let key = Math.random()
      .toString(36)
      .slice(-5);
    let value = url;
    let newshortUrl = new shortUrlModel({ key, value });
    newshortUrl.save().catch(err => {
      console.log(err);
    });
    let shortUrl = `localhost:3000/${key}`;
    res.render("result", { shortUrl, key });
  }
});
//-[重新導向]----------------------------------
router.get("/:key", (req, res) => {
  shortUrlModel.findOne({ key: req.params.key }).then(data => {
    res.redirect(`${data.value}`);
  });
});

module.exports = router;
