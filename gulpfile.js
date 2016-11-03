var gulp = require('gulp'); //gulp
var rename = require('gulp-rename'); //重命名
var uglify = require('gulp-uglify'); //js混淆
var concat = require('gulp-concat'); //合并
var sass = require('gulp-sass'); // sass 编译
var sourcemaps = require('gulp-sourcemaps');//sass map
var jshint = require('gulp-jshint'); //js代码校验

//判断开发环境，默认正式环境
var dev = process.argv.splice(3)[0]==='-dev';

// 文件路径
var style=['src/sass/app.scss'];
var script=['node_modules/angular/angular.js','node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js','node_modules/angular-animate/angular-animate.js','node_modules/angular-sanitize/angular-sanitize.js','node_modules/angular-ui-router/release/angular-ui-router.js','src/js/app.js'];

// sass编译
gulp.task('sass', function() {
	gulp.src(style)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle:dev?'nested':'compressed' //outputStyle Type: String Default: nested Values: nested, expanded, compact, compressed
		}).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('static/css/'));
});

//js合并 混淆
gulp.task('jsmin',function(){
		var to ='static/js/',name='app.js';
		if(dev){
			gulp.src(script).pipe(concat(name)).pipe(rename({ suffix: '.min' })).pipe(gulp.dest(to));
		}else{
			gulp.src(script).pipe(concat(name)).pipe(rename({ suffix: '.min' })).pipe(uglify()).pipe(gulp.dest(to));
		}
});

//js校验
gulp.task('jshint', function() {
	return gulp.src(['src/js/router.js','gulpfile.js'])
		.pipe(jshint({eqeqeq:false}))
		.pipe(jshint.reporter('default')); // 对代码进行报错提示
});

//自动监听
gulp.task('watch', function() {
	gulp.watch(style, ['sass']);
	gulp.watch(script, ['jshint','jsmin']);
});

//help
gulp.task('default', function() {
	console.log(' | 老徐的前端自动化部署工具');
	console.log(' | blog：//www.loveqiao.com');
	console.log(' | git ：//github.com/waihaolaoxu/gulp.git');
});
