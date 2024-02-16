'use babel';

import P5jsView from './p5js-view';
import { CompositeDisposable } from 'atom';
const Main = require('./main');
const path = require('path');
const osc = require('osc');

export default {
  isActive: false,
  p5jsView: null,
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
    this.p5jsView = new P5jsView(state.p5jsViewState);

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'p5js:toggle': () => this.toggle(),
      'p5js:eval': () => this.eval(),
    }));
  },

  deactivate() {
    this.main.destroy();
    this.subscriptions.dispose();
    this.p5jsView.destroy();
  },

  serialize() {
    return {
      p5jsViewState: this.p5jsView.serialize()
    };
  },

  toggle() {
    console.log('P5js was toggled!');
    if (this.main && this.main.isRunning()) {
      this.main.stop()
      if (this.oscServer) {
        this.oscServer.close();
        this.oscServer = null;
      }
    } else {
      if (this.main) {
        this.main.start()
      } else {
        this.eval()
      }
    }

    this.isActive = !this.isActive
  },

  eval() {
    let editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.save()
        .then(() => this.renderSketch(editor))
    }
  },

  renderSketch(editor) {
    let config = atom.config.get('p5js')
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
    let sketch = require(path)

    if (this.main) {
      this.main.stop()
      this.main = undefined
    }

    this.main = new Main(sketch.bind({
      onOscMessage: ((listener) => {
        if (this.oscServer) {
          if (this.messageListener) {
            this.oscServer.removeListener("message", this.messageListener)
          }
          this.messageListener = listener;
          this.oscServer.on("message", this.messageListener);
        } else {
          notifyError("You need to enable the OSC server in order to being able to listen to OSC messages in the sketch");
        }
      })
    }))

    this.main.start()
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
    console.warn(err)
    // most likely snapshotResult is not defined
    // not sure why that happens but apparently it does
  }
}

function notifyError(message) {
  console.error(message);
  atom.notifications.addError(message);
}
