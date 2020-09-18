const express = require('express');
//引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const router = express.Router();//router==app

// 查询全部用户反馈信息
router.get('/searchAllTalk', async (req, res) => {
    try {
        let sql = `SELECT * FROM userTalk`;
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

module.exports = router