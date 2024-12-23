// import { Pane } from '/imports/tweakpane-4.0.5.js';
// import * as CameraKitPlugin from '/imports/tweakpane-plugin-camerakit-0.3.0.js'

import { Pane } from 'tweakpane'
import * as CameraKitPlugin from '@tweakpane/plugin-camerakit'

export function initPane() {
    const PREDICTIVE_PARAMS = {
        BMI: 32,
        Age: 33,
        BloodPressure: 70,
        Insulin: 80,
        Pregnancies: 0,
        SkinThickness: 21,
        Glucose: 120,
        Pedigree: 0.5
    };

    const VIEW_PARAMS = {
        Zoom: 0,
        Rotate: 0,
        X: 0,
        Y: 0,
        Z: 0,
        Theme: 'Dark'
    }

    const paneContainer = document.createElement('div');
    paneContainer.id = 'pane-container';
    document.body.appendChild(paneContainer);


    paneContainer.style.position = 'fixed'
    paneContainer.style.display = 'inline'
    paneContainer.style.top = '0'
    paneContainer.style.right = '0'
    paneContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    paneContainer.style.zIndex = '50'
    paneContainer.style.padding = '2%'

    const pane = new Pane({ container: paneContainer });
    pane.registerPlugin(CameraKitPlugin)

    const tab = pane.addTab({
        pages: [
            { title: 'Person' },
            { title: 'View' }
        ]
    })
    
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'BMI', { min: 10, max: 75, step: 1 })
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'Age', { min: 18, max: 81, step: 1 })
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'Glucose', { min: 0, max: 200, step: 1 })
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'BloodPressure', { min: 0, max: 125, step: 1 })
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'SkinThickness', { min: 0, max: 100, step: 1 })
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'Pregnancies', { min: 0, max: 17, step: 1 }) // 0 <= P <= 17
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'Insulin', { min: 0, max: 850, step: 3 })
    tab.pages[0].addBinding(PREDICTIVE_PARAMS, 'Pedigree', { min: 0, max: 2.5, step: 0.1 })
    
    // set state
    const resetPerson = tab.pages[0].addButton({ title: 'Reset Person'})
   
    tab.pages[0].addBlade({ view: 'separator' })

    tab.pages[1].addBinding(VIEW_PARAMS, 'Zoom', { min: -10, max: 10, step: 1 })

    tab.pages[1].addBlade({ view: 'separator' })

    // Implement the change in camera view for zoom and axis!
    tab.pages[1].addBinding(VIEW_PARAMS, 'X', {
        view: 'camerawheel',
        unit: {
            pixels: 50,
            ticks: 10,
            value: 0.2
        },
        min: -10,
        max: 10,
        step: 1
    })

    tab.pages[1].addBinding(VIEW_PARAMS, 'Y', {
        view: 'camerawheel',
        unit: {
            pixels: 50,
            ticks: 10,
            value: 0.2
        },
        min: -10,
        max: 10,
        step: 1
    })

    tab.pages[1].addBinding(VIEW_PARAMS, 'Z', {
        view: 'camerawheel',
        unit: {
            pixels: 50,
            ticks: 10,
            value: 0.2
        },
        min: -10,
        max: 10,
        step: 1
    })
    tab.pages[1].addBlade({ view: 'separator' })
    tab.pages[1].addBinding(VIEW_PARAMS, 'Theme', { options: { Dark: 'Dark', Light: 'Light' } })

    // also set state
    tab.pages[1].addButton({ title: 'Reset View'})
    tab.pages[1].addBlade({ view: 'separator' })

    const update = pane.addButton({
        title: 'Update' 
    })

    update.on('click', () => { 
        // setCameraPosition || validate, run model, setAnimation 
        // validate && fetch('GET', { PREDICTIVE_PARAMS })
        console.log(PREDICTIVE_PARAMS)
    })

}
