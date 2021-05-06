const globby = require('globby')
const fse = require('fs-extra')
const fs = require('fs')
const { Readable, PassThrough } = require('stream')

function mergeStreams(streams) {
    let pass = new PassThrough()
    const len = streams.length
    if (len === 0) {
    	pass.emit('end')
    } else {
    	let i = 0
    	function iteration() {
    		if (i >= len) {
    			pass.emit('end')
    			return
    		}
			const stream = streams[i]
			pass = stream.pipe(pass, {end: false})

			i++
			stream.once('end', iteration)
    	}
    	iteration()
	}
    return pass
}

async function concat(globs, writeStream, separator) {
	const files = await globby(globs)
	const streams = []
	for (let i = 0, len = files.length; i < len; i++){
		if (i > 0 && separator) {
			streams.push(Readable.from([separator]))
		}
		streams.push(fs.createReadStream(files[i]))
	}
	const stream = mergeStreams(streams)
	stream.once('end', () => stream.pipe(writeStream))
}

module.exports = {
	concat,
}
