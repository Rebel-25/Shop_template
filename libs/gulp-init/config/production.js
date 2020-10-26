const gulp = require("gulp")
const { src, dest } = gulp
const htmlmin = require('gulp-htmlmin');
const cleanCss = require("gulp-clean-css");
const Less = require('gulp-less');
const Sass = require('gulp-sass');
const Autoprefixer = require('gulp-autoprefixer');
const JSUglify = require("gulp-uglify");
const JSBabel = require('gulp-babel');
const Plumber = require('gulp-plumber');
let SelfConfig = {
    HtmlminOptions: {
        // 这里是全部的配置可以查看https://github.com/kangax/html-minifier#options-quick-reference
        html5: true,// html5 规范
        minifyCSS: {
            level: 2
        },// 压缩css， 可能的值，是true, false, options, function(text,type), 具体参看clean-css
        minifyJS: {
            // https://github.com/mishoo/UglifyJS2
            parse: {
                // parse options
            },
            compress: {
                // compress options
            },
            mangle: {
                // mangle options
                properties: {
                    // mangle property options
                }
            },
            output: {
                // output options
            },
            sourceMap: {
                // source map options
            },
            nameCache: null, // or specify a name cache object
            toplevel: false,
            ie8: true,
            warnings: false,
        },// 压缩js，  可能的值，是true, false, options, function(text,type), 具体参看UglifyJS
        collapseWhitespace: true,// 折叠全部的标签， 也就是压缩
        sortAttributes: true,// 按照属性的频率排序
        collapseBooleanAttributes: true, // 省略布尔值

    },
    CleanCssOption: {
        // 这里全部配置可以查看 https://github.com/jakubpawlowicz/clean-css
        level: 2, //代表极度优化处理
        advanced: true,// 是否合并选择器
        removeDuplicateRules: true, // 删除重复属性，但是不会去掉同样的选择器，只会合并重复的属性
        compatibility: 'ie8',// 兼容性
        format: false, // 去掉不规范的换行，整齐的格式化操作，开发环境beautify，生产环境false
        /** 
         * keep-breaks
         * body{color:red}
         * div{font-size:10px}
         * beautify
         * body {
         *   color: red
         * }
         * div {
         *   font-size: 10px
         * }
        */
    },
    LessOptions: {
        javascriptEnabled: true, // javascript 支持
        ieCompat: true // ie8支持
    },
    SassOptions: {

    },
    JSUglifyOptions: {
        parse: {
            // parse options
        },
        compress: {
            // compress options
        },
        mangle: {
            // mangle options

            properties: {
                // mangle property options
            }
        },
        output: {
            // output options
        },
        sourceMap: {
            // source map options
        },
        nameCache: null, // or specify a name cache object
        toplevel: false,
        ie8: false,
        warnings: false,
    },
    JSBabelOptions: {
        presets: ['@babel/env']
    },
    AutoprefixerOptions:{
        // https://github.com/postcss/autoprefixer#options
        browsers: ['last 2 versions'],
        cascade: false
    }
}

module.exports = function (config) {
    return {
        // html
        HTMLCompile: function () {
            let srcDir = config.srcDir;
            return src(`${srcDir}*.html`)
                .pipe(Plumber())
                .pipe(htmlmin(SelfConfig.HtmlminOptions))
                .pipe(dest(config.output))
        },
        // css
        CSSCompile: function () {
            return src(`${config.css}*.css`)
                .pipe(Plumber())
                .pipe(cleanCss(SelfConfig.CleanCssOption))
                .pipe(Autoprefixer(SelfConfig.AutoprefixerOptions))
                .pipe(dest(`${config.output}css/`))
        },
        // js
        JSCompile: function () {
            return src(`${config.js}*.js`)
                .pipe(Plumber())
                .pipe(JSBabel(SelfConfig.JSBabelOptions))
                .pipe(JSUglify(SelfConfig.JSUglifyOptions))
                .pipe(dest(`${config.output}js/`))
        },
        // 专门处理LESS
        LESSCompile: function () {
            return src([`${config.css}/*.less`])
                .pipe(Plumber())
                .pipe(Less(SelfConfig.LessOptions))
                .pipe(cleanCss(SelfConfig.CleanCssOption))
                .pipe(Autoprefixer(SelfConfig.AutoprefixerOptions))
                .pipe(dest(`${config.output}css`))
        },
        // 处理SASS
        SASSCompile: function () {
            return src([`${config.css}/*.scss`, `${config.css}/*.sass`])
                .pipe(Plumber())
                .pipe(Sass(SelfConfig.SassOptions))
                .pipe(cleanCss(SelfConfig.CleanCssOption))
                .pipe(Autoprefixer(SelfConfig.AutoprefixerOptions))
                .pipe(dest(`${config.output}css`))
        },
        
    }
}





