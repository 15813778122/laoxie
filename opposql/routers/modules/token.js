let jwt = require('jsonwebtoken');//引入插件

/*
    功能：
        * 生成token : 秘钥、失效时间
        * 校验token ：token
*/

//秘钥：秘钥如果想更加安全，可以再加密一次
let secret = 'oppo';

//创建token
function create(data, expiresIn = 60 * 60 * 24 * 7) {
    //data:就是你要加密的数据
    //expiresIn：失效时间，s为单位  60 * 60 * 24 * 7==7天
    let token = jwt.sign({ data }, secret, { expiresIn });
    return token;
}
//测试
// let t = create('123456');
// console.log(t);

function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        console.log('token校验：', result)
        res = true;
    } catch (err) {
        res = false;
    }

    return res;
}

// verify(t);

module.exports = {
    create,
    verify
}
