var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')
var utils = require('./utils')

module.exports = function(dir) {
    dir = dir || '.'
    // 初始化 Express
    var app = express()
    var router = express.Router()
    app.use('/assets', serveStatic(path.resolve(dir, 'assets')))
    app.use(router)
    // 渲染文章
    router.get('/posts/*', function(req, res, next) {
        var name = utils.stripExtname(req.params[0])
        var file = path.resolve(dir, '_posts', name + '.md')
        var html = utils.renderPost(dir, file)
        // 设置编码格式,防止乱码
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        res.end(html)
    })
    // 渲染列表
    router.get('/', function(req,res, next) {
        var html = utils.renderIndex(dir)
        // 设置编码格式,防止乱码
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        res.end(html)
    })
    // 设置监听端口
    app.listen(3000, () => {
        console.log('Server start at:' + '127.0.0.1:' + '3000')
    })
}
