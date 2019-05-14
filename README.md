# electron-test-build

This tool takes a built Electron app and replaces the version of Electron with a custom build.

> :warning: Currently only supports Windows

## Usage

Install the tool with `npm install --global electron-test-build` or use it with `npx electron-test-build`.

```
  -a, --app-folder path        Path to your app. Should contain the built binary (app).
  -e, --electron-folder path   Path to your Electron build. Should contain the Electron binary (app).
  -o, --output-folder path     Path to your Electron build. Should contain the Electron binary. Will be
                               emptied.
  -n, --name string            App's name. Should match the binary name.
  -v, --version string         App's version. Only used on Windows.
  -i, --icon path              [Optional] Path to an icon. Only used on Windows.
  -c, --copyright string       [Optional] Copyright notice to add. Only used on Windows.
  --help                       Print this usage guide.
```

### Example: macOS

On macOS, have two folders on your desktop:

```
- app
--- Slack.app
- electron
--- Electron.app
```

Then, run:

```sh
electron-test-build --app-folder ~/Desktop/app --electron-folder ~/Desktop/electron --name Slack --output-folder ~/Desktop/output
```

### Example: Windows

On Windows, have two folders on your desktop:

```
- app
--- resources
------ electron.asar
------ [...]
--- chrome_100_percent.pak
--- [...]
--- Slack.exe
--- ffmpeg.dll
--- [...]
- electron
--- resources
------ default_app.asar
------ electron.asar
--- chrome_100_percent.pak
--- [...]
--- electron.exe
--- ffmpeg.dll
--- [...]
```

```ps1
electron-test-build --app-folder C:\Users\felix\Desktop\slack\ --electron-folder 'C:\Users\felix\Desktop\electron\' --version "3.4.90" --icon C:\Users\felix\Code\slack-desktop\resources\win\app.ico --output-folder C:\Users\felix\Desktop\testbuild --name Slack
```

## License

MIT, please see LICENSE.md for details.
