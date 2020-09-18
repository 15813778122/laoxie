const express = require('express');
//引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const router = express.Router();//router==app

// 修改商品
router.put('/editgood/:uid', async (req, res) => {
    // console.log(6666);
    //name:账号  psw:密码  keep:是否要七天免登陆 true 就可以生成token
    let obj = req.body; //{gname:'Reno2 Z 8G',price:'1699',oldprice:'2199',stock:'1',img:'https://www.baidu.com.....'}
    // console.log(obj);
    let str = '';
    //拼接出sql语句想要的结构
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);
    // console.log(str);
    let id = req.params.uid;//获取uid

    try {
        // console.log(9999);
        let sql = `UPDATE shop SET ${str} WHERE id=${id}`;
        let p = await query(sql);//[{},{}]
        // console.log(p);
        let inf = {};
        if (p.affectedRows) {
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功'
            }
        } else {
            //修改失败
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 删除商品
router.delete('/delgood/:key', async (req, res) => {
    let id = req.params.key;//获取uid
    try {
        // console.log(9999);
        let sql = `DELETE FROM shop WHERE goods_id=${id}`;
        let p = await query(sql);//[{},{}]
        // console.log(p);
        let inf = {};
        if (p.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            //删除失败
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 删除多个商品
router.delete('/delallgood/', async (req, res) => {
    let idstr = req.body.ids; // ids 是前端拼接好的uid的字符串，必须要拼接成 21,26,27
    console.log(ids)
    try {
        // console.log(9999);
        let sql = `DELETE FROM shop WHERE goods_id in(${idstr})`;
        let p = await query(sql);//[{},{}]
        // console.log(p);
        let inf = {};
        if (p.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            //删除失败
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 查询id为xx的商品信息
router.get('/searchshop/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let sql = `SELECT * FROM shop WHERE id=${id}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 查询全部商品信息
router.get('/searchAllshop', async (req, res) => {
    try {
        let sql = `SELECT * FROM shop`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 查询多个商品信息
router.post('/searchmoreshop', async (req, res) => {
    let idstr = req.body.ids; // ids 是前端拼接好的uid的字符串，必须要拼接成 21,26,27
    try {
        console.log(idstr);
        let sql = `SELECT * FROM shop WHERE FIND_IN_SET(id,'${idstr}')`;
        let p = await query(sql);//[{},{}]
        console.log(p);
        let inf = {};
            //查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data:{
                    p
                }
            }

        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 新增商品
router.post('/addshop', async (req, res) => {
    // console.log(6666);
    // console.log(req.body);
    // let { gname, price,oldprice,stock,img } = req.body;
    let { goods_name, goods_nowprice,goods_oldprice,goods_stock } = req.body;
    // console.log(gname, price,oldprice,stock,img);
    try {
        // let sql = `INSERT INTO shop(gname, price,oldprice,stock,img) VALUES('${gname}','${price}','${oldprice}','${stock}','${img}')`;
        let sql = `INSERT INTO shop(goods_name, goods_nowprice,goods_oldprice,goods_stock) VALUES('${goods_name}','${goods_nowprice}','${goods_oldprice}','${goods_stock}')`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.affectedRows) { //受影响多少行 > 0 就是成功
            //查到数据：不能注册
            inf = {
                code: 2000,
                flag: true,
                message: '新增成功'
            }
        } else {
            //查不到数据:允许注册
            inf = {
                code: 3000,
                flag: false,
                message: '新增失败'
            }
        }
        res.send(inf);//响应数据给前端 
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});


module.exports = router