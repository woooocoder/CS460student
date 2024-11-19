import * as Tweakpane from 'https://unpkg.com/tweakpane@4.0.1/dist/tweakpane.js';
import * as TweakpaneRotationInputPlugin from './tweakpane-plugin-rotation.js';

const pane = new Tweakpane.Pane();

  pane.registerPlugin(TweakpaneRotationInputPlugin);

  const params = {
    euler: { x: 0.0, y: 0.0, z: 0.0 },
    quat: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
  };

  // euler
  const guiEuler = pane.addBinding(params, 'euler', {
    view: 'rotation',
    rotationMode: 'euler',
    order: 'XYZ', // Extrinsic rotation order. optional, 'XYZ' by default
    unit: 'deg', // or 'rad' or 'turn'. optional, 'rad' by default
  });

  // quaternion
  const guiQuat = pane.addBinding(params, 'quat', {
    view: 'rotation',
    rotationMode: 'quaternion', // optional, 'quaternion' by default
    picker: 'inline', // or 'popup'. optional, 'popup' by default
    expanded: true, // optional, false by default
  });

  guiEuler.on('change', ({ value }) => {
    console.log(value); // do something
  });