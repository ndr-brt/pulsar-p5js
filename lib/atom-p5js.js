'use babel';

import AtomP5jsView from './atom-p5js-view';
import { CompositeDisposable } from 'atom';
const P5 = require('./p5');
const importFresh = require('import-fresh');

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
    if (this.isActive) {
      this.p5.stop()
    } else {
      this.eval()
    }

    this.isActive = !this.isActive
  },

  eval() {
    let editor = atom.workspace.getActiveTextEditor()
    editor.save();
    let path = editor.getPath()
    console.log(path)
    let definition = importFresh(path)
    console.log(definition.prototype)
    let sketch = Object.create(definition.prototype);
    console.log(sketch)

    if (this.p5) {
      this.p5.stop()
      this.p5 = undefined;
    }
    this.p5 = new P5(sketch.handle)
    this.p5.start()
  }

};
