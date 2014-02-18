'use strict';

var domain = require('domain');

module.exports = function (gulp) {
  var runTask = gulp._runTask.bind(gulp);

  gulp._runTask = function (task) {
    var d = domain.create();

    d.on('error', function (err) {
      gulp._stopTask(task, {
        duration: [0, 0],
        hrDuration: [0, 0]
      });
      gulp._emitTaskDone(task, 'callback', err);
      gulp.stop(err);
    });

    d.run(function () {
      runTask(task);
    });
  };

  return gulp;
};
