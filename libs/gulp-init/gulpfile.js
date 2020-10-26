// 判断环境
const mode = isENV() // development or production
const config = require("./config/")(mode);

// 这里得到全部的任务队列
exports.default = config;

// 判断环境
function isENV() {
    let mode = "development"
    let NODE_ENV = process.env.NODE_ENV
    switch (NODE_ENV) {
        case "development": {
            break
        }
        case "production": {
            mode = "production"
            break
        }
        default: {
            console.log("warning: Please use `npm run serve` or `npm run build` to run the template project,\nProject default runtime development environment");
            mode = "development"
            break
        }
    }
    return mode
}




