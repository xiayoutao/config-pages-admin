const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const exec = require('child_process').exec;
const path = require('path');
const del = require('del');

const env = process.env.npm_config_production;
var distPath = path.resolve('./dist');

// 编译
gulp.task('build', function () {
  return exec('vue-cli-service build');
});

// 合并${distPath}/public/config/[index-${env}, init].js 至 ${distPath}/config/index.js
gulp.task('concat:config', function () {
  let configJs = env ? `${distPath}/config/index-prod.js` : `${distPath}/config/index.js`;
  return gulp.src([configJs, `${distPath}/config/init.js`])
    .pipe(gulpConcat('config.js'))
    .pipe(gulp.dest(`${distPath}`));
});

// 清空
gulp.task('clean', function () {
  return del([`${distPath}`]);
});

gulp.task('default', gulp.series('clean', 'build', 'concat:config', async function () {
  // 清除, 编译 / 处理项目中产生的文件
  del([`${distPath}/config/`]);
}));
