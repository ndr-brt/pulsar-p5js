'use babel';

import AtomP5jsView from './atom-p5js-view';
import { CompositeDisposable } from 'atom';
const P5 = require('./p5');
const path = require('path');

export default {
  isActive: false,
  atomP5jsView: null,
  subscriptions: null,

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
        let path = editor.getPath()
        // removeCache(path)
        // let definition = require(path)
        // let sketch = Object.create(definition.prototype, {
        //   window: { writable: false, configurable:true, value: window },
        //   ciccia: { writable: false, configurable:true, value: 200 },
        // });
        //
        // if (this.p5) {
        //   this.p5.stop()
        //   this.p5 = undefined
        // }
        // this.p5 = new P5(sketch.handle)
        // this.p5.start()
        // console.log(require.cache[require.resolve('p5')])
        console.log(window)
        let script = document.createElement('script');
        script.src = require.resolve('p5')
        document.getElementsByTagName('head')[0].appendChild(script);

        let simple = document.createElement('script');
        simple.src = path
        document.getElementsByTagName('head')[0].appendChild(simple);

        document.addEventListener('DOMNodeInserted', () => {
          let canvasList = document.getElementsByTagName('canvas')
          console.log(canvasList)
          let canvas = canvasList.item(0)
          console.log(canvas)
          canvas.setAttribute("style", "position: absolute; top: 0px; left: 0px; z-index: -1;");
          document.body.classList.add('p5js-enabled')
        })

        // canvas.style.position = 'absolute'
        // canvas.style.top = '0px'
        // canvas.style.left = '0px'
        // canvas.style['z-index'] = -1

        // element.appendChild(canvas[0])
        // document.appendChild(element)
        // <canvas id="defaultCanvas0" class="p5Canvas" width="1295" height="1016" style="width: 1295px; height: 1016px; position: absolute; top: 0px; left: 0px; z-index: -1;"></canvas>
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
