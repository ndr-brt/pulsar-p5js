'use babel';

import AtomP5jsView from './atom-p5js-view';
import { CompositeDisposable } from 'atom';
const P5 = require('./p5');
const path = require('path');
const osc = require('osc');

export default {
  isActive: false,
  atomP5jsView: null,
  subscriptions: null,
  config: {
    'oscServer': {
      type: 'boolean',
      default: false,
      description: 'Listen to osc messages'
    },
    'oscPort': {
      type: 'integer',
      default: 57121,
      description: 'Osc server port'
    }
  },

  activate(state) {
    this.atomP5jsView = new AtomP5jsView(state.atomP5jsViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-p5js:toggle': () => this.toggle(),
      'atom-p5js:eval': () => this.eval(),
    }));
  },

  deactivate() {
    this.p5.destroy();
    this.subscriptions.dispose();
    this.atomP5jsView.destroy();
  },

  serialize() {
    return {
      atomP5jsViewState: this.atomP5jsView.serialize()
    };
  },

  toggle() {
    console.log('AtomP5js was toggled!');
    if (this.p5 && this.p5.isRunning()) {
      this.p5.stop()
      if (this.oscServer) {
        this.oscServer.close();
        this.oscServer = null;
      }
    } else {
      if (this.p5) {
        this.p5.start()
      } else {
        this.eval()
      }
    }

    this.isActive = !this.isActive
  },

  eval() {
    let editor = atom.workspace.getActiveTextEditor()
    editor.save()
      .then(() => {
        let config = atom.config.get('atom-p5js')
        if (config.oscServer && !this.oscServer) {
          this.oscServer = new osc.UDPPort({
            localAddress: "0.0.0.0",
            localPort: config.oscPort
          });

          this.oscServer.on("ready", function () {
            console.log("Listening for OSC over UDP.");
          });

          this.oscServer.on("error", function (err) {
            console.log(err);
          });

          this.oscServer.open()
        }

        let path = editor.getPath()
        removeCache(path)

        if (this.currentSketch && this.currentSketch.destroy) {
          this.currentSketch.destroy()
        }
        let definition = require(path)
        this.currentSketch = Object.create(definition.prototype);

        if (this.p5) {
          this.p5.stop()
          this.p5 = undefined
        }

        this.p5 = new P5(this.currentSketch.handle.bind({
          onOscMessage: ((listener) => {
            console.log(this.oscServer)
            console.log(this)
            if (this.oscServer && this.messageListener) {
              this.oscServer.removeListener("message", this.messageListener)
            }
            this.messageListener = listener;
            this.oscServer.on("message", this.messageListener);
          })
        }))

        this.p5.start()
      })
  }

};

function removeCache(filePath) {
  delete require.cache[filePath];

  try {
    let relativeFilePath = path.relative(path.join(atom.getLoadSettings().resourcePath, 'static'), filePath);
    if (process.platform === 'win32') {
      relativeFilePath = relativeFilePath.replace(/\\/g, '/');
    }
    delete snapshotResult.customRequire.cache[relativeFilePath];
  } catch (err) {
    console.error(err)
    // most likely snapshotResult is not defined
    // not sure why that happens but apparently it does
  }
}
