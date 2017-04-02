// Dependencies
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const watch = require('gulp-watch');

// Task
gulp.task('default', function() {
	console.log("livereload starting to watch");
		// listen for changes
	livereload({start:true});
	
	gulp.watch(['public/**/**'], () => {
		// force a reload
		livereload.reload();
		// console.log("livereload reload triggered");
	});
});