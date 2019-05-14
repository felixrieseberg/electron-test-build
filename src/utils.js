const sanitize = require('sanitize-filename')

function sanitizeAppName (name) {
  return sanitize(name)
}

module.exports = {
  sanitizeAppName
}
