// 引入express
const express = require("express");
const fs = require("fs");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

router.post("/bannerImg", (req, res) => {
  var sql = "SELECT * FROM iqos_bannerimg";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
})

router.post("/carouselImg", (req, res) => {
  var sql = "SELECT * FROM iqos_carousel";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
})

router.post("/productImg", (req, res) => {
  var sql = "SELECT * FROM iqos_product";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
})

router.post("/set_productImg", (req, res) => {
  var pid = req.body.pid;
  var operate = req.body.operate;
  console.log("pid:"+pid)
  if(operate == 'del'){
    var sql = "DELETE FROM iqos_product WHERE pid=?";
    pool.query(sql,[pid], (err, result) => {
      if (err) throw err;
      res.send({ code: 200, data: result });
    })
  }else{ 
    var product_pic = req.body.product_pic;
    var base64Data = product_pic.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer.from(base64Data, 'base64');
    var saveUrl = "./public/images/product/" + (new Date()).getTime() + ".png";
    fs.writeFile(saveUrl, dataBuffer, function(err) {
      if (err) {
          res.send(err);
      } else {
          var img = saveUrl.slice(9)
          if(operate == 'edit'){
            var sql = "UPDATE iqos_product SET product_pic=? WHERE pid=?";
            pool.query(sql,[img,pid],(err, result) => {
              if (err) throw err;
              res.send({ code: 200, data: img });
            })
          }else{
            var sql = "INSERT INTO iqos_product(pid,product_pic) VALUES(null,?)";
            pool.query(sql,[img],(err, result) => {
              if (err) throw err;
              res.send({ code: 200, data: img });
            })
          }
          
      }
    });
  }
})

router.post("/set_carouselImg", (req, res) => {
  var cid = req.body.cid;
  var operate = req.body.operate;
  if(operate == 'del'){
    var sql = "delete from iqos_carousel where cid= ?";
    pool.query(sql,[cid], (err, result) => {
      if (err) throw err;
      res.send({ code: 200, data: result });
    })
  }else{ 
    var carousel_pic = req.body.carousel_pic;
    var base64Data = carousel_pic.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer.from(base64Data, 'base64');
    var saveUrl = "./public/images/product/" + (new Date()).getTime() + ".png";
    fs.writeFile(saveUrl, dataBuffer, function(err) {
      if (err) {
          res.send(err);
      } else {
          var img = saveUrl.slice(9)
          if(operate == 'edit'){
            var sql = "UPDATE iqos_carousel SET carousel_pic=? WHERE cid=?";
            pool.query(sql,[img,cid],(err, result) => {
              if (err) throw err;
              res.send({ code: 200, data: img });
            })
          }else{
            var sql = "INSERT INTO iqos_carousel(cid,carousel_pic) VALUES(null,?)";
            pool.query(sql,[img],(err, result) => {
              if (err) throw err;
              res.send({ code: 200, data: img });
            })
          }
          
      }
    });
  }
})



router.post("/set_bannerImg", (req, res) => {
  var details_pic = req.body.details_pic;
  var iid = req.body.iid;
  var base64Data = details_pic.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer.from(base64Data, 'base64');
  var saveUrl = "./public/images/product/" + (new Date()).getTime() + ".png";
  fs.writeFile(saveUrl, dataBuffer, function(err) {
    console.log(1)
    if (err) {
        res.send(err);
    } else {
        var sql = "UPDATE iqos_bannerimg SET details_pic=? WHERE iid=?";
        var img = saveUrl.slice(9)
        pool.query(sql,[img, iid], (err, result) => {
          if (err) throw err;
          res.send({ code: 200, data: img });
        })
    }
});

  
})

router.post("/weixin", (req, res) => {
  var sql = "SELECT * FROM iqos_weixin";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
})
router.post("/set_weixin", (req, res) => {
  var operate = req.body.operate;
  if(operate == 'img'){
    var wx_pic = req.body.wx_pic;
    var base64Data = wx_pic.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer.from(base64Data, 'base64');
    var saveUrl = "./public/images/product/" + (new Date()).getTime() + ".png";
    fs.writeFile(saveUrl, dataBuffer, function(err) {
      if (err) {
          res.send(err);
      } else {
          var sql = "UPDATE iqos_weixin SET wx_pic=? WHERE wxid=1";
          var img = saveUrl.slice(9)
          pool.query(sql,[img], (err, result) => {
            if (err) throw err;
            res.send({ code: 200, data: img });
          })
      }
    });
  }else{
    var wx_txt = req.body.wx_txt;
    var sql = "UPDATE iqos_weixin SET wx_txt=? WHERE wxid=1";
    pool.query(sql,[wx_txt], (err, result) => {
      if (err) throw err;
      res.send({ code: 200, data: result });
    })
  }
  
});

router.post("/headTxt", (req, res) => {
  var sql = "SELECT * FROM iqos_bannertxt";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
})
router.post("/set_headTxt", (req, res) => {
  var head_title = req.body.head_title;
  var head_txt = req.body.head_txt;
  var sql = "UPDATE iqos_bannertxt SET head_title=?,head_txt=? WHERE tid=1";
  pool.query(sql,[head_title,head_txt], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
  
})

module.exports = router;