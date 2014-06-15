var fs = require('fs')
var path = require('path')
var child_process = require('child_process')

var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var storage_path = path.join(home, '.tap-failed')

if (fs.existsSync(storage_path)) {
  var raw_storage = fs.readFileSync(storage_path, {encoding: 'utf8'})
  var storage = JSON.parse(raw_storage)
  var files = storage[process.cwd()]
  if (files.length) {
    console.log('running files: %s', JSON.stringify(files))
    var tap = child_process.spawn('tap', files, {cwd: '/Users/wmcdonald/devel/newrelic/nodejs_agent'})
    tap.stdout.pipe(process.stdout)
  } else {
    console.log('no remaining tests')
  }

} else {
  console.log('no remaining tests')
}
