# cmd_blog

自动生成静态博客页面的命令行工具

## 运行

### 克隆到本地
    $ git clone git@github.com:AustinDeng/cmd_blog.git

### 安装依赖
    $ cd cmd_blog/
    
    $ npm install

### 链接

    $ npm link
    $ myblog help
    
    Usage: myblog [options] [command]

    Options:
    
    -V, --version          output the version number
    -h, --help             output usage information
    
    Commands:
    
    help                   显示使用帮助
    create [dir]           创建一个空文件
    preview [dir]          实时预览
    build [options] [dir]  生成静态HTML

## 项目结构
    
    cmd_blog
    ├── bin
    |  └── myblog                         // myblog 命令的执行文件
    ├── lib
    |  ├── cmd_build.js                   // build 命令
    |  ├── cmd_create.js                  // create 命令
    |  ├── cmd_preview.js                 // preview 命令
    |  └── utils.js                       // 工具类
    ├── package-lock.json
    ├── package.json                      // 包含项目依赖
    └── tpl                               // 样式模板文件
       ├── assets
       |  └── style.css                   // 样式文件
       ├── config.json                    // 配置文件
       └── _layout                        // 模板文件
          ├── index.html
          └── post.html

## 命令介绍

### create [dir]

基于模板生成新的 blog

    $ myblog create newBlog
    OK
    
    $ tree -l 4
    newBlog
       ├── assets
       |  └── style.css
       ├── config.json         // 配置文件
       ├── posts               // 构建之后的文章目录 
       ├── _layout
       |  ├── index.html
       |  └── post.html
       └── _posts              // 文章目录 
          └── 2018-11
             └── hello-world.md

    directory: 6 file: 5

### preview [dir]          

实时预览

    $ myblog preview
    Server start at:http://127.0.0.1:3001
    

打开: http://127.0.0.1:3001
![2.jpg](https://i.loli.net/2018/11/18/5bf1276815571.jpg)

http://127.0.0.1:3001/posts/2018-11/hello-world.html
![3.jpg](https://i.loli.net/2018/11/18/5bf127d96e010.jpg)

### build [options] [dir]  

生成静态HTML

    $ myblog build
    生成页面: posts\2018-11\cmd-blog.html
    生成页面: posts\2018-11\hello-node.html
    生成页面: posts\2018-11\hello-world.html
    生成页面: index.html
    