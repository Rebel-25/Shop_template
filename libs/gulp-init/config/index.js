const gulp = require("gulp")
const { series, parallel } = gulp
const Core = require("./core");
const development = require("./development");
const production = require("./production")
// 处理全部的路径配置
const config = require("./config")
module.exports = function (mode) {
    // 选择 development 或 production 之中的一个
    switch (mode) {
        case "development": {
            return DevelopCompile(config)
            break
        }
        case "production": {
            return ProductionCompile(config)
            break
        }
        default: {
            return DevelopCompile(config)
            break
        }
    }
}

// development
function DevelopCompile(config) {
    let { HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile ,BrowserSyncServer} = development(config)
    // dev 开启调试服务器 start serve
    BrowserSyncServer()
    return series(HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile,
        Core.Copy("static"), Core.Copy("assets"),
            parallel([ Core.WatchCompile([
                { Compile: HTMLCompile, Postfix: "*.html" },
                { Compile: CSSCompile, Postfix: "css/*.css" },
                { Compile: JSCompile, Postfix: "js/*.js" },
                { Compile: LESSCompile, Postfix: "css/*.less" },
                { Compile: SASSCompile, Postfix: "css/*.scss" },
                { Compile: Core.Copy("static"), Postfix: "static/**/*" },
                { Compile: Core.Copy("assets"), Postfix: "assets/**/*" },
            ])])
        )
}

//  production build 生产 
function ProductionCompile(config) {
    let { HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile } = production(config)
    return series(Core.Clean, HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile)
}

