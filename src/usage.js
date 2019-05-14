const commandLineUsage = require('command-line-usage')

const sections = [
  {
    header: 'electron-test-build',
    content: 'Create builds of your app with a custom version of Electron.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'app-folder',
        alias: 'a',
        typeLabel: '{underline path}',
        description: 'Path to your app. Should contain the built binary.'
      },
      {
        name: 'electron-folder',
        alias: 'e',
        typeLabel: '{underline path}',
        description: 'Path to your Electron build. Should contain the Electron binary.'
      },
      {
        name: 'output-folder',
        alias: 'o',
        typeLabel: '{underline path}',
        description: 'Path to your Electron build. Should contain the Electron binary. Will be emptied.'
      },
      {
        name: 'name',
        alias: 'n',
        typeLabel: '{underline string}',
        description: `App's name. Should match the binary name.`
      },
      {
        name: 'version',
        alias: 'v',
        typeLabel: '{underline string}',
        description: `App's version.`
      },
      {
        name: 'icon',
        alias: 'i',
        typeLabel: '{underline path}',
        description: '[Optional] Path to an icon.'
      },
      {
        name: 'copyright',
        alias: 'c',
        typeLabel: '{underline string}',
        description: '[Optional] Copyright notice to add.'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  }
]

function printHelp () {
  console.log(commandLineUsage(sections))
  process.exit(0)
}

module.exports = {
  printHelp
}
