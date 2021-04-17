// 引入express模块
const express = require("express");
// 引入body-parser中间件
const bodyParser = require("body-parser");
// 引入cors中间件 解决跨域问题
const cors = require("cors");
// 引入session模块
const session = require("express-session");

// 导入index路由器  主页
const indexRouter = require("./routes/index");
// 导入login路由器  登陆 注册
const loginRouter = require("./routes/user");


/*引入token的模块*/
const jwt = require("./jwt.js")

// 创建服务器
var server = express();

// 设置端口
server.listen(5050);

// 上传文件的限制大小
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 使用cors中间件 解决跨域
server.use(cors({
  origin: ["http://localhost:7000", "http://127.0.0.1:5500", "http://127.0.0.1:7000", "*"],
  credentials: true
}));


server.use((req, res, next) => {
  // console.log(req.url)
  if ((req.url != '/user/loseP' && req.url != '/user/login' && req.url != '/user/reg') && (req.url.startsWith("/user") || req.url.startsWith("/cart") || req.url.startsWith("/orders"))) {
    // console.log("进入")
    let token = req.headers.token;
    let result = jwt.verifyToken(token);
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result === undefined) {
      res.send({ status: 403, msg: "未提供证书" })
    } else if (result.name == 'TokenExpiredError') {
      res.send({ status: 403, msg: '登录超时，请重新登录' });
    } else if (result.name == "JsonWebTokenError") {
      res.send({ status: 403, msg: '证书出错' })
    } else {
      req.user = result;
      next();
    }
  } else {
    next();
  }
});


// session
server.use(session({
  secret: "128位字符串",     // 自定义字符串
  resave: true,             // 每次请求更新数据
  saveUninitialized: true   // 保存初始化数据
}));

// 要在使用路由的前面使用中间件
// 使用body-parser中间件将post请求的数据格式化为对象
server.use(bodyParser.urlencoded({
  // 不使用扩展的qs模块.而是使用querystring模块  格式为对象
  extended: false
}));

// 托管静态资源到public目录
server.use(express.static('public'));

// 使用路由器
server.use("/index", indexRouter);

server.use("/user", loginRouter);

