#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const commandLineArgs = require('command-line-args')

const { printHelp } = require('./usage')

const optionDefinitions = [
  { name: 'app-folder', alias: 'a', type: String },
  { name: 'electron-folder', alias: 'e', type: String },
  { name: 'output-folder', alias: 'o', type: String },
  { name: 'version', alias: 'v', type: String },
  { name: 'icon', alias: 'i', type: String },
  { name: 'name', alias: 'n', type: String },
  { name: 'copyright', alias: 'c', type: String },
  { name: 'help', alias: 'h', type: Boolean }
]

async function main () {
  const startTime = Date.now()
  const rawOptions = commandLineArgs(optionDefinitions)
  if (rawOptions.help) printHelp()

  const options = ensureOptions(rawOptions)

  console.log(`Replacing Electron in this Slack build. Configuration:`)
  console.log(`  - Path to app folder: ${options.appFolder}`)
  console.log(`  - Path to Electron folder: ${options.electronFolder}`)
  console.log(`  - Path to icon: ${options.icon || '(unchanged)'}`)
  console.log(`  - Version: ${options.version || '(unchanged)'}}`)
  console.log(`  - Name: ${options.name}`)
  console.log(`  - Copyright notice: ${options.copyright || '(unchanged)'}`)
  console.log(`  - Creating output in: ${options.outputFolder}\n`)

  if (process.platform === 'win32') {
    require('./platform-win').execute(options)
  }

  if (process.platform === 'darwin') {
    require('./platform-mac').execute(options)
  }

  console.log(`🚀 All done (in %dms). Output ready in: ${options.outputFolder}`, new Date() - startTime)
}

function ensureOptions (options = {}) {
  const warnings = []

  if (!options['app-folder']) {
    warnings.push('Argument missing: app-folder')
  }

  if (!options['electron-folder']) {
    warnings.push('Argument missing: electron-folder')
  }

  if (!options['electron-folder']) {
    warnings.push('Argument missing: output-folder')
  }

  if (process.platform ==='win32' && !options.version) {
    warnings.push('Argument missing: version')
  }

  if (!options.name) {
    warnings.push('Argument missing: name')
  }

  const icon = options.icon && path.join(options.icon)
  if (icon && !fs.existsSync(icon)) {
    warnings.push(`Icon path cannot be found: ${icon}`)
  }

  const appFolder = options['app-folder'] && path.join(options['app-folder'])
  if (appFolder && !fs.existsSync(appFolder)) {
    warnings.push(`App folder path cannot be found: ${appFolder}`)
  }

  const electronFolder = options['electron-folder'] && path.join(options['electron-folder'])
  if (electronFolder && !fs.existsSync(electronFolder)) {
    warnings.push(`Electron folder path cannot be found: ${electronFolder}`)
  }

  const outputFolder = options['output-folder'] && options['output-folder'].startsWith('.')
    ? path.join(process.cwd(), options['output-folder'])
    : options['output-folder'] && path.join(options['output-folder'])

  if (!outputFolder ) {
    warnings.push('Argument missing: output-folder')
  }

  if (warnings.length > 0) {
    warnings.forEach((w) => console.log(w))
    console.log(`To see the help, run the tool with --help. We will now exit.`)
    process.exit()
  }

  return {
    version: options.version,
    appFolder,
    electronFolder,
    icon,
    name: options.name,
    copyright: options.copyright,
    outputFolder
  }
}

main()
