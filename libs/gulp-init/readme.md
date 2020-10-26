# gulp-init
A gulp4 template 
An init template

## Installation
```
git clone git@github.com:AmandaYi/gulpfile.git gulp-init
```

## Use
---
* development environment
`npm run serve` or `yarn serve`

* build
`npm run build` or `yarn build`

## Options And About
1. development environment
By modifying the `config\development.js` file, you can change the configuration of the development environment

2. production environment
By modifying the `config\production.js` file, you can change the configuration of the development environment

3. About Picture Processing
No... Because everyone's needs are different, some need wizard maps, some need base64, so you can write a function to handle it by yourself.
Demo

1. In `config\development.js` or `config\production.js` file

```javascript
let SelfConfig = {
    ...
    // You can add subObject
    ImagesOption: {

    }
    ...
}

module.exports = function (config) {
    return {
        ...
        // html
        HTMLCompile: function () {
        ...
        // You can add this Func ImagesCompile
        ImagesCompile: function () {
            
            return src( ...
            do code ...
            ......
        }
        ......
        ......

```
2. step2 
In `config\index.js` file
Find func `DevelopCompile` or `ProductionCompile`
```javascript
// development
function DevelopCompile(config) {
    let { HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile ,BrowserSyncServer} = development(config)
    // dev 开启调试服务器 start serve
    BrowserSyncServer()
    return series(HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile,
        // You can add this Func ImagesCompile
        ImagesCompile
        Core.Copy("static"), Core.Copy("assets"),
            parallel([ Core.WatchCompile([
                { Compile: HTMLCompile, Postfix: "*.html" },
                { Compile: CSSCompile, Postfix: "css/*.css" },
                { Compile: JSCompile, Postfix: "js/*.js" },
                { Compile: LESSCompile, Postfix: "css/*.less" },
                { Compile: SASSCompile, Postfix: "css/*.scss" },
                { Compile: Core.Copy("static"), Postfix: "static/**/*" },
                { Compile: Core.Copy("assets"), Postfix: "assets/**/*" },
                // If you want to watch Images, you can add a watcher, Be sure to specify the road strength of the picture
                // 如果监听图片，可以添加图片观察者， 请务必说明图片的路径
                // { Compile: ImagesCompile, Postfix: /assets\/images\/*.{png,jpg,gif,jpeg}/ },                
            ])])
        )
}
// Production
function ProductionCompile(config) {
    let { HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile ,
    // You can add this Func ImagesCompile
    ImagesCompile
    } = production(config)
    return series(Core.Clean, HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile,
    // Must be run this Func ImagesCompile
    ImagesCompile
    )
}
```

## Options
By changing the parameters of the object, the environment can be easily adjusted.

### The details(Options) are as follows
In `config\development.js` or `config\production.js` file
You can find `SelfConfig` object.By changing this object, you can change the configuration of the development environment

List ( Subobjects of `SelfConfig` )

1. HtmlminOptions
You can Click this link: [https://github.com/kangax/html-minifier#options-quick-reference](https://github.com/kangax/html-minifier#options-quick-reference)

2. CleanCssOption
You can Click this link: [https://github.com/jakubpawlowicz/clean-css#constructor-options](https://github.com/jakubpawlowicz/clean-css#constructor-options)

3. LessOptions
You can Click this link: [http://lesscss.org/](http://lesscss.org/)

4. SassOptions
You can Click this link: [https://github.com/sass/node-sass#options](https://github.com/sass/node-sass#options)

5. JSUglifyOptions
You can Click this link: [https://github.com/mishoo/UglifyJS2#minify-options](https://github.com/mishoo/UglifyJS2#minify-options)

6. JSBabelOptions
You can Click this link: [https://babeljs.io/docs/en/options](https://babeljs.io/docs/en/options)

7. AutoprefixerOptions
You can Click this link: [https://www.npmjs.com/package/autoprefixer#options](https://www.npmjs.com/package/autoprefixer#options)

...more

## License

---
ISC License © 2019 AmandaYi