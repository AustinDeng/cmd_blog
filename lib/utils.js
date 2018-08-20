var fs = require('fs')
var MarkdownIt = require('markdown-it')
var nunjucks = require('nunjucks')
var rd = require('rd')
var path = require('path')
var md = new MarkdownIt({
    html: true,
    // CSS language prefix for fenced blocks. Can be useful for external highlighters.
    langPrefix: 'code-' 
})
// 渲染文章
function renderPost(dir, file) {
    var content = fs.readFileSync(file).toString()
    var post = parseSourceContent(content.toString())
    post.content = markdownToHTML(post.source)
    post.layout = post.layout || 'post'
    var config = loadConfig(dir)
    var html = renderFile(path.resolve(dir, '_layout', post.layout + '.html'), {
        post: post,
        config: config
    })
    return html
}
// 渲染文章列表
function renderIndex(dir) {
    var list = []
    var sourceDir = path.resolve(dir, '_posts')
    eachSourceFile(sourceDir, function(f, s) {
        var source = fs.readFileSync(f).toString()
        var post = parseSourceContent(source)
        post.timestamp = new Date(post.data)
        // 拼接文章的 url
        post.url = '/posts/' + stripExtname(f.slice(sourceDir.length + 1)) + '.html'
        list.push(post)
    })
    // 时间先后排序
    list.sort(function(a, b) {
        return b.timestamp - a.timestamp
    })
    var config = loadConfig(dir)
    var html = renderFile(path.resolve(dir, '_layout', 'index.html'), {
        posts: list,
        config: config
    })
    return html
}
// 遍历所有文章
function eachSourceFile(sourceDir, callback) {
    rd.eachFileFilterSync(sourceDir, /\.md$/, callback)
}
// 去掉文件的拓展名
function stripExtname(name) {
    var i = 0 - path.extname(name).length
    if (i === 0) 
        i = name.length
    return name.slice(0, i)
}
// 解析文章内容
function parseSourceContent(data) {
    // windows 平台下换行是 \r\n 
    // liunx 平台换行 \n
    var split = '---\r\n'
    var i = data.indexOf(split)
    var info = {}

    if (i !== -1) {
        var j = data.indexOf(split, i + split.length)
        if (j !== -1){
            var str = data.slice(i + split.length, j).trim()
            data = data.slice(j + split.length)
            str.split('\n').forEach(line => {
                var i = line.indexOf(':')
                if (i !== -1 ){
                    var name = line.slice(0, i).trim()
                    var value = line.slice(i + 1).trim()
                    info[name] = value
                }
            });
        }  
    }
    info.source = data
    return info
}
// 渲染模板
function renderFile(file, data) {
    return nunjucks.renderString(fs.readFileSync(file).toString(), {
        filename: file,
        data: data
    })
}
// 将 Markdown 转换为 HTML
function markdownToHTML(content) {
    return md.render(content || '')
}
// 读取配置文件
function loadConfig(dir) {
    var content = fs.readFileSync(path.resolve(dir,'config.json')).toString()
    var data = JSON.parse(content)
    return data
}

// 导出函数为一个模块
module.exports = {
    markdownToHTML,
    renderFile,
    renderIndex,
    renderPost,
    parseSourceContent,
    stripExtname,
    eachSourceFile,
    loadConfig
}