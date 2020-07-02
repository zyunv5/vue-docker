var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
mongoose.connect("mongodb://localhost/mongodb", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("数据库连接成功");
});

const randomSchema = mongoose.Schema({
  create_time: {
    type: Date,
    default: Date.now,
  },
  num: {
    type: Number,
  },
});

var RandomMoo=mongoose.model("random", randomSchema);

const PORT = 8080;
const HOST = "0.0.0.0";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/random", (req, res, next) => {
  new RandomMoo({ num: parseInt(Math.random() * 10) })
    .save()
    .then((response) => {
      response
        ? res.json({
            status: 0,
            msg: "添加成功",
          })
        : res.json({
            status: 1,
            msg: "添加失败",
          });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/randomList", (req, res, next) => {
  RandomMoo
    .find({})
    .then((response) => {
      response.length > 0
        ? res.json({
            status: 0,
            msg: "查询成功",
            data: response,
          })
        : res.json({
            status: 1,
            msg: "查询失败",
          });
    })
    .catch((err) => {
      console.log(err);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
