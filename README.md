# Coffee Stock Example Project

Basic Ionic mobile application that allows for coffee flavour management.
The targeted platforms are **iOS** and **Android**.

## Environment Setup<a name="environment-setup"></a>

The following resources are perfect for getting your environment set up:

* [Base Environment Setup](https://ionicframework.com/docs/installation/environment)
* [iOS Environment Setup (Requires macOS)](https://ionicframework.com/docs/installation/ios)
* [Android Environment Setup](https://ionicframework.com/docs/installation/android)

## Running

*Because of the native dependencies within this app you cannot reliably run it
using ```ionic serve``` or the ```ionic devapp```*.

Both platforms require some environment setup. Please have a look at the
[Environment](#environment-setup) section of the readme for more information.

### Android

You can run the following commands in sequence within the project directory:

```bash
$ npm install
$ ionic cordova platform add android
$ ionic cordova prepare android
$ ionic cordova run android
```

If you run into issues, please make sure your [environment](environment-setup) 
is set up correctly. You can also head over to the [official docs](https://ionicframework.com/docs/building/android) 
for additional troubleshooting.

### iOS

Unfortunately I cannot create a reliable guide here.
I would recommend having a look over at [the official docs](https://ionicframework.com/docs/building/ios).