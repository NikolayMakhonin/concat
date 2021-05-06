const {concat} = require('./index')
const yargs = require('yargs')

const argv = yargs(process.argv)
	.option('separator', {
		alias      : 's',
		type       : 'string',
		description: 'separator between files contents',
	})
	.argv

const globs = argv._.slice(2)

const separator = argv.separator && JSON.parse(`{ "separator": "${argv.separator}" }`).separator

concat(globs, process.stdout, separator)
