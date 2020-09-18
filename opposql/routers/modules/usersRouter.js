const express = require('express');
//引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const { create, verify } = require('./token');

const router = express.Router();//router==app

// 验证用户名是否存在 /user/checkname
router.get('/checkname',async (req,res) => {
    let { name } = req.query
    try {
        let sql = `SELECT * FROM userinf WHERE name='${name}'`
        let p = await query(sql)//[{},{}]
        let inf = {}
        if (p.length) {
            inf = {
                code:3000,
                flag:false,
                message:'用户名已存在，不能注册'
            }
        } else {
            inf = {
                code:2000,
                flag:true,
                message:'可以注册'
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code:err.errno,
            flag:false,
            message:'查询失败'
        }
        res.send(inf)
    }
})

// 需求：注册 /user/reg
router.post('/reg',async (req,res) => {
    let { name,pwd } = req.body
    try {
        let sql = `INSERT INTO userinf(name, pwd) VALUES('${name}','${pwd}')`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code:2000,
                flag:true,
                message:'注册成功'
            }
        } else {
            inf = {
                code:3000,
                flag:false,
                message:'注册失败'
            }
        }
        res.send(inf)
    } catch(err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf)
    }
})

// 登录 /user/login
router.get('/login',async (req,res) => {
    let {name,pwd,keep} = req.query
    console.log(name,pwd,keep)
    try {
        let sql = `SELECT * FROM userinf WHERE name='${name}' and pwd='${pwd}'`;
        let p = await query(sql)
        let inf = {}
        if (p.length) {
            let token = ''
            if (keep == 'true') {
                token = create(pwd)
            } else {
                token = create(pwd,60 * 60 * 24)
            }
            inf = {
                code: 2000,
                flag: true,
                message: '登录成功',
                data: {
                    token
                }
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '登录失败'
            }
        }
        res.send(inf)
    } catch(err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})

//需求:验证token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNDU2MTIzIiwiaWF0IjoxNTkzNjAxMzg3LCJleHAiOjE1OTM2ODc3ODd9.7LOtUPyURoQF80oRQa_4VxH6_AuiUaR-xKm9H4EClKU
router.get('/verify', (req, res) => {
    // console.log(6666);
    let { token } = req.query;
    let result = verify(token);
    let inf = {};
    if (result) {
        //校验成功
        inf = {
            code: 2000,
            flag: true,
            message: '校验成功'
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '校验失败'
        }
    }
    res.send(inf);
});

// 修改信息
router.put('/edit/:uid', async (req, res) => {
    // console.log(6666);
    //name:账号  psw:密码  keep:是否要七天免登陆 true 就可以生成token
    let obj = req.body; //{name:'小青',psw:'66778'}
    // console.log(obj);
    let str = '';
    //拼接出sql语句想要的结构
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);
    // console.log(str);
    let uid = req.params.uid;//获取uid

    try {
        // console.log(9999);
        let sql = `UPDATE userinf SET ${str} WHERE id=${uid}`;
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

// 删除用户
router.delete('/del/:uid', async (req, res) => {
    let id = req.params.uid;//获取uid
    try {
        // console.log(9999);
        let sql = `DELETE FROM userinf WHERE id=${id}`;
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

// 删除多个用户
router.delete('/delall/', async (req, res) => {
    let idstr = req.body.ids; // ids 是前端拼接好的uid的字符串，必须要拼接成 21,26,27
    try {
        // console.log(9999);
        let sql = `DELETE FROM userinf WHERE id in(${idstr})`;
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

//需求：查询用户列表  分页查询 page:1 页码  size:5 每页5条 SELECT * FROM userinf LIMIT 5,5
router.get('/userlist', async (req, res) => {

    let { page, size } = req.query;
    page = page || 1;
    size = size || 5;

    //SELECT * FROM userinf LIMIT 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * size;
    /*
        page  size  index
        1      5     0
        2      5     5
        3      5     10
    */

    try {
        let sql = `SELECT * FROM userinf LIMIT ${index},${size}`;
        let p = await query(sql);//[{},{}]
        let sql2 = `SELECT * FROM userinf`;
        let arr = await query(sql2);//所有的数据 []
        let inf = {};
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: arr.length,
                page,
                size,
                data: p
            }
        } else {
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

//需求：查询uid为xx的用户信息  SELECT * FROM userinf WHERE uid=31
//  /user/user/
router.get('/user/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let sql = `SELECT * FROM userinf WHERE id=${id}`;
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
                message: '查询成功'
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

module.exports = router