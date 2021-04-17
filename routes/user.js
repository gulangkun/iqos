// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

const fs = require("fs");

const jwt = require("../jwt.js");

// 用户登录 要传入 手机号和密码
router.post("/login", (req, res) => {
  var phone = req.body.phone;
  var upwd = req.body.upwd;
  var sql = "SELECT uid FROM iqos_user WHERE phone=? AND upwd=?";
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // session 的登陆id
      req.session.uid = result[0].uid;
      // console.log(req.session.uid)
      let token = jwt.generateToken(result[0].uid);
      res.send({ code: 200, data: result, token: token });
    } else {
      res.send({ code: 400, msg: "用户名或密码错误" });
    }
  })
});



module.exports = router;