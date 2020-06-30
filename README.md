# Demo how to use Bevm-calls to ByzCoin with React Native

Using crypto in javascript is always difficult.
Some information can be found here:

https://github.com/c4dt/crypto-ts

Of course this does not apply to React Native, which is again different.
This time one of the big differences is how it treats packages using the bundler `Metro`.
The `Metro` bundler is again different from the webpack bundler, but it's faster, so it's good to support it.

## Starting point

To create the demo app, I started with the official method of creating a new react native version described here:

https://reactnative.dev/docs/environment-setup

This is the bare-bones React Native app with TypeScript.

## Bevm libraries

On this basis I imported the files for bevm from:

https://stackblitz.com/edit/typescript-dl6gas

For the bevm-library, the only thing I modified is to change the call to `ByzCoinRPC.fromByzcoin`:

```javascript
        const byzcoinRPC = await ByzCoinRPC.fromByzcoin(roster, serverConfig.byzCoinID,
            undefined, undefined, undefined, undefined, false);
```

These `undefined`, ..., `false` indicates that ByzCoin should not verify the forward-links when getting a proof.
Every check for a forward-link in React Native takes about 11 seconds!
In Nativescript it's about 200ms, and I have no idea why it's so different...

## Crypto, URL, ...

Now for all those libraries that exist in node and/or web and/or nativescript, there seem to be two main projects in 
React Native land:

- [rn-nodeify](https://npmjs.com/rn-nodeify) - modifies packages in `node_modules`
- [node-libs-react-native](https://npmjs.com/node-libs-react-native) - imports a lot of node-compatible packages

While `rn-nodeify` has some more automation, I couldn't get it to work nicely with the `Metro` bundler.
Also, the fact that it modifies the files in `node_modules` seemed wrong, and we had lots of troubles in
nativescript with a similar approach `nativescript-nodeify`.
The problems that arose where that the bundler was not always synched with what libraries have been imported, more 
specifically if the libraries were `npm link`ed in the project for easier development.

The full explanation of what I did is here:

https://docs.celo.org/developer-guide/overview/introduction/dappkit/setup

One thing I had to add was support for the `URL` module, which is used by `@dedis/cothority`.
This module comes from the browser-world, and a compatible module is `whatwg-url`.
So I added the following line to `global.ts`:

```javascript
global.URL = require('whatwg-url').URL
```

# Other crazyness I saw with React Native

Like with NativeScript, React Native has some bad ends.
Here a list of those that I encountered - I hope it helps someone!

## `npm start`

When running `npm start`, it should theoretically come up with a browser interface to allow running the app in a 
simulator or in the browser.
However, on my computer, I always had to do:

```bash
rm -rf .expo
```

So I added that line to the `npm start` entry.

Also, for stopping, I get thousands of `pgrep` when trying to use `<ctrl+c>`.
So I do what every good user does:

```bash
pkill -9 -f bevm-rn
pkill -9 -f expo-cli
```

Also available as `npm stop`...

## Running android simulation

The first time after running `npm start`, the simulator always refuses to run.
I always have to `Clear All` in the android simulator before being able to start the simulator.
When clicking on `Run on Android device/simulator`, the system starts to compile and the displays nothing.
I always have to click a second time to get the welcome screen to show up.

# Last general remark

I start to know NativeScript and Angular, but React is new to me.
Please be sure to correctly use the library with all it's nice stuff.
Don't program standard JS/HTML, but use the callbacks and states and props and whatever that React comes with.

(c) 2020 by Linus Gasser for the https://c4dt.org
