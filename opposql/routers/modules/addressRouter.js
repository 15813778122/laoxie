const express = require('express');
//引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const router = express.Router();//router==app

// 新增地址
router.post('/addarea', async (req, res) => {
    // console.log(6666);
    // console.log(req.body);
    let { uname, phone,area,address,coding } = req.body;
    try {
        let sql = `INSERT INTO address(uname, phone,area,address,coding) VALUES('${uname}','${phone}','${area}','${address}','${coding}')`;
        let p = await query(sql);//[{},{}]
        // console.log(p)
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