const request = require("request");

//使用模块
request('https://api.asilu.com/weather/', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    //body下载到的数据
    console.log('body:', body); // Print the HTML for the Google homepage.
});