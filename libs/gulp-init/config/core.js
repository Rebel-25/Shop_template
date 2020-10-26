const gulp = require("gulp")
const { src, dest, watch } = gulp
const Path = require("path");
// 处理全部的路径配置
const config = require("./config")
// const path = Path.join(__dirname,"..",src)
const Del = require('del');
module.exports = {
    // 监听编译函数
    WatchCompile: function (fallbackArr) {
        return function () {
            // 处理细微监听
            WatcherEarnest(fallbackArr)
        }
    },
    Copy: function (bundle) {
        return function () {
            return src(Path.join(__dirname, "..", `${config.srcDir}${bundle}`, "**", "*"))
                .pipe(dest(Path.join(__dirname, "..", `${config.output}${bundle}`)));
        }
    },
    Clean:function(){
        return  Del(Path.join(__dirname,"..",`${config.output}`,))
    }
}

// 细微的监听
function WatcherEarnest(fallbackArr) {
    Array.from(fallbackArr).forEach(fallback => {
        let { Watcher, Fun } = WatchDeal(fallback)
        Watcher.on("change", Fun)
        Watcher.on("add", Fun)
        Watcher.on("delete", Fun)
    })

}
function WatchDeal(fallback) {
    let watchPath = "src/" + fallback.Postfix
    return {
        Watcher: watch([watchPath]),
        Fun: fallback.Compile
    }
}

