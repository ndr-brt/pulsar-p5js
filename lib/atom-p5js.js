'use babel';

import AtomP5jsView from './atom-p5js-view';
import { CompositeDisposable } from 'atom';
const path = require('path');

export default {
  isActive: false,
  atomP5jsView: null,
  subscriptions: null,
  sketch: null,
  p5: null,

  activate(state) {
    this.atomP5jsView = new AtomP5jsView(state.atomP5jsViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-p5js:toggle': () => this.toggle(),
      'atom-p5js:eval': () => this.eval(),
    }));

    this.p5 = document.createElement('script');
    this.p5.src = require.resolve('p5')
    document.getElementsByTagName('head')[0].appendChild(this.p5);
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomP5jsView.destroy();
    document.getElementsByTagName('head')[0].removeChild(this.p5);
    this.p5 = undefined;
  },

  serialize() {
    return {
      atomP5jsViewState: this.atomP5jsView.serialize()
    };
  },

  toggle() {
    console.log('AtomP5js was toggled!');
    if (this.sketch) {
      this.stop()
    } else {
      if (this.sketch) {
        this.start()
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

        this.sketch = document.createElement('script');
        this.sketch.src = path
        this.start()

        document.addEventListener('DOMNodeInserted', () => {
          let canvasList = document.getElementsByTagName('canvas')
          console.log(canvasList)
          let canvas = canvasList.item(0)
          console.log(canvas)
          canvas.style.position = 'absolute'
          canvas.style.top = '0px'
          canvas.style.left = '0px'
          canvas.style['z-index'] = -1
        })
      })
  },

  start() {
    if (this.sketch) {
      document.getElementsByTagName('head')[0].appendChild(this.sketch);
      document.body.classList.add('p5js-enabled');
    }
  },

  stop() {
    if (this.sketch) {
      document.getElementsByTagName('head')[0].removeChild(this.sketch)
      document.body.classList.remove('p5js-enabled')
      this.sketch = undefined
    }
  }

};
