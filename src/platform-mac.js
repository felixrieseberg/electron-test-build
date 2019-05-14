const fs = require('fs-extra')
const path = require('path')
const debug = require('debug')('electron-test-build')

const { sanitizeAppName } = require('./utils')

function getBinaryName (options = {}) {
  return `${sanitizeAppName(options.name)}.app`
}

function getBinaryPath (options = {}) {
  return path.join(options.appFolder, `${getBinaryName(options)}`)
}

function getElectronPath (options = {}) {
  return path.join(options.electronFolder, `Electron.app`)
}

async function prepareFolder(options = {}) {
  debug(`Emptying output folder ${options.outputFolder}`)
  await fs.emptyDir(options.outputFolder)

  const src = getBinaryPath(options)
  const dest = path.join(options.outputFolder, getBinaryName(options))
  debug(`Copying ${src} to ${dest}`)
  await fs.copy(src, dest)
}

async function deleteSignature(options = {}) {
  const signaturePath = path.join(getBinaryPath(options), 'Contents/_CodeSignature')
  debug(`Deleting code signature in ${signaturePath}`)
  await fs.remove(signaturePath)
}

async function overwrite(options = {}, target = '') {
  try {
    await fs.remove(path.join(getBinaryPath(options), target))
    await fs.copy(
      path.join(getElectronPath(options), target),
      path.join(getBinaryPath(options), target),
      {
        filter: (from, to) => {
          debug(`Copying from ${from} to ${to}`)
          return true
        }
      }
    )
  } catch (error) {
    // We'll try to copy symlinks into the same symlink, which will fail
    if (error && error.toString().includes('to a subdirectory of itself')) {
      debug(`Ignoring error`, error)
    } else {
      throw error
    }
  }
}

async function execute(options = {}) {
  await prepareFolder(options)

  // Copy innards over
  await overwrite(options, 'Contents/Frameworks')
  await overwrite(options, 'Contents/MacOS')
  await overwrite(options, 'Contents/Resources/electron.asar')

  // Rename executable
  const oldBinary = path.join(getBinaryPath(options), `Contents/MacOS/${options.name}`)
  const newBinary = path.join(getBinaryPath(options), `Contents/MacOS/electron`)
  debug(`Removing ${oldBinary}`)
  await fs.remove(oldBinary)
  await fs.rename(newBinary, oldBinary)

  const oldHelper = path.join(getBinaryPath(options), `Contents/Frameworks/${options.name} Helper.app`)
  const newHelper = path.join(getBinaryPath(options), `Contents/Frameworks/Electron Helper.app`)
  debug(`Removing ${newHelper}`)
  await fs.remove(oldHelper)
  await fs.rename(newHelper, oldHelper)

  // Delete signature
  await deleteSignature(options)
}

module.exports = {
  execute
}
