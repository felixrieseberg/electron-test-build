const fs = require('fs-extra')
const rcedit = require('rcedit')
const path = require('path')

const { sanitizeAppName } = require('./utils')

function getBinaryName (options = {}) {
  return `${sanitizeAppName(options.name)}.exe`
}

function getBinaryPath (options = {}) {
  return path.join(options.outputFolder, `${getBinaryName(options)}`)
}

function getElectronPath (options = {}) {
  return path.join(options.outputFolder, `electron.exe`)
}

async function prepareFolder (options = {}) {
  await fs.emptyDir(options.outputFolder)
  await fs.copy(options.appFolder, options.outputFolder)
  await fs.copy(options.electronFolder, options.outputFolder)

  // Delete the original file
  if (fs.existsSync(getBinaryPath(options))) {
    await fs.remove(getBinaryPath(options))
  }

  // We expect that an `electron.exe` is now here
  await fs.rename(getElectronPath(options), getBinaryPath(options))
}

async function execRcedit (options = {}) {
  const rcEditOptions = {
    FileDescription: options.name,
    InternalName: options.name,
    OriginalFilename: `${sanitizeAppName(options.name)}.exe`,
    ProductName: options.name,
    Copyright: options.copyright,
    'version-string': options.version,
    'file-version': options.version,
    'product-version': options.version,
    icon: options.icon
  }

  return new Promise((resolve, reject) => {
    rcedit(getBinaryPath(options), rcEditOptions, (error) => {
      if (error) {
        return reject(error)
      }

      return resolve()
    })
  })
}

async function execute (options = {}) {
  await prepareFolder(options)
  await execRcedit(options)
}

module.exports = {
  execute
}
