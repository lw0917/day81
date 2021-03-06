var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');
var data=require('./mock/data.json');
var fs=require('fs');
var url=require('url');
var path=require('path');

  gulp.task('css',function(){
      return gulp.src('./src/sass/*.scss')
             .pipe(sass())
             .pipe(gulp.dest('./src/css'))
  })
  gulp.task('watch',function(){
      return gulp.watch('./src/sass/*.scss',gulp.series('css'))
  })

  gulp.task('dev',function(){
      return gulp.src('./src')
             .pipe(server({
                 port:9090,
                 middleware:function(req,res,next){
                       var pathname=url.parse(req.url).pathname;
                       if(pathname==='/favicon.ico'){
                           return res.end('')
                       }
                       pathname=pathname==='/'?'index.html':pathname;
                       if(pathname==='/api/list'){
                             res.end(JSON.stringify({code:1,msg:data}))
                       }else{
                          res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
                       }
                 }
             }))
  })

  gulp.task('default',gulp.series('css','dev','watch'))