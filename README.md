# electron-test-build

This tool takes a built Electron app and replaces the version of Electron with a custom build.

> :warning: Currently only supports Windows

## Usage

Install the tool with `npm install --global electron-test-build` or use it with `npx electron-test-build`.

```
  -a, --app-folder        path      Path to your app. Should contain the built binary.
  -e, --electron-folder   path      Path to your Electron build. Should contain the Electron binary.
  -o, --output-folder     path      Path to your Electron build. Should contain the Electron binary. Will be emptied.
  -n, --name              string    App's name. Should match the binary name.
  -v, --version           string    App's version.
  -i, --icon              path      [Optional] Path to an icon.
  -c, --copyright         string    [Optional] Copyright notice to add to the binary.
  --help                            Print this usage guide.
```

## License

MIT, please see LICENSE.md for details.
