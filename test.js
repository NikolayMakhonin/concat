const {execFile} = require('child_process')

var child = execFile('node', [
    'cli', 'assets/**',
], function(err, stdout, stderr) {
	if (stderr) {
		console.error(stderr)
		process.exit(1)
		return
	}
    if (stdout !== 'file1file2') {
    	console.error(`stdout: "${stdout}" !== "file1file2"`)
		process.exit(1)
		return
    }

    console.log('Test OK')
})
