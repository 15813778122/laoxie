//引入express开启静态资源服务器
const express = require('express');
const router = express.Router();//router==app
// 引入json解析中间件
var bodyParser = require('body-parser');

// 添加json解析
router.use(bodyParser.json());//转json数据的 {"key":"value","key":"value"}
router.use(bodyParser.urlencoded({ extended: false }));//转键值对数据 key=value&key=value

//导入子路由
const usersRouter = require('./modules/usersRouter');
const goodsRouter = require('./modules/goodsRouter');
const orderRouter = require('./modules/orderRouter');
const userTalkRouter = require('./modules/userTalkRouter');
const addressRouter = require('./modules/addressRouter');

router.all("*",function(req,res,next){

	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin","*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers","content-type");
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() == 'options')
		res.send(200);  //让options尝试请求快速结束
	else
		next();
})

//CORS跨域：方便和小伙伴共享接口：加上这段话，再设置防火墙，别人就可以访问你的接口了(记得保证服务器开启)
//把这个路由配置放在所有路由的前面，方便调用next操作
// router.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

//     // 跨域请求CORS中的预请求
//     if (req.method == "OPTIONS") { //特殊请求：发送了请求头的那些请求
//         res.sendStatus(200); /*让options请求快速返回*/
//     } else {
//         next();
//     }
// })




router.use('/user', usersRouter);//启用子路由:use里面的函数是中间件
//中间件本质上是函数，但是函数不一定是中间件 (req, res, next)
router.use('/good', goodsRouter);//启用子路由
router.use('/order', orderRouter);//启用子路由
router.use('/userTalk', userTalkRouter);//启用子路由
router.use('/address', addressRouter);//启用子路由

//导出路由
module.exports = router;

