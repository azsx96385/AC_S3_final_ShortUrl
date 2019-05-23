//引入套件===============================
const express = require("express");
const exphbs = require("express-handlebars");
const bdParser = require("body-parser");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const session = require("express-session");

//設定套件===============================

//express
const app = express();
app.listen(process.env.PORT || 3000, () => {
  console.log("App is running");
});
//[設定]mongoose 設定與啟用 | "mongodb://127.0.0.1/todo" [mongodb|位置|資料庫名稱]
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/shortUrl", {
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!!");
});
db.once("open", () => {
  console.log("mongodb connected!!");
});

//.env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//[設定] 使用 express session
app.use(session({ secret: "okokok" })); // secret: 定義一組自己的私鑰（字串)

//handle bars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body-parser
app.use(bdParser.urlencoded({ extended: true }));

//flash
app.use(flash());

//自建中介曾
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.successMessage = req.flash("successMessage");
  next();
});

//路由區===============================
app.use(express.static("public"));
app.use("/", require("./route/shorturl"));
