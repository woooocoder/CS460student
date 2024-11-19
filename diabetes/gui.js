import { Pane } from './imports/tweakpane-4.0.5.js';

export function initPane() {
    const PARAMS = {
        BMI: 32,
        Age: 33,
        BloodPressure: 70,
        Insulin: 80,
        Pregnancies: 0,
        SkinThickness: 21,
        Glucose: 120,
        Pedigree: 0.5
    };

    const paneContainer = document.createElement('div');
    paneContainer.id = 'pane-container';
    document.body.appendChild(paneContainer);

    paneContainer.style.position = 'fixed';
    paneContainer.style.top = '0'; 
    paneContainer.style.right = '0'; 
    paneContainer.style.padding = '10px';paneContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    paneContainer.style.color = 'white'; 
    paneContainer.style.zIndex = '1000'; 

    const pane = new Pane({ container: paneContainer });

    pane.addBinding(PARAMS, 'BMI', { min: 10, max: 75, step: 1 });
    pane.addBinding(PARAMS, 'Age', { min: 18, max: 81, step: 1 });
    pane.addBinding(PARAMS, 'Glucose', { min: 0, max: 200, step: 1 });
    pane.addBinding(PARAMS, 'BloodPressure', { min: 0, max: 125, step: 1 });
    pane.addBinding(PARAMS, 'SkinThickness', { min: 0, max: 100, step: 1 });
    pane.addBinding(PARAMS, 'Pregnancies', { min: 0, max: 17, step: 1 });
    pane.addBinding(PARAMS, 'Insulin', { min: 0, max: 850, step: 3 });
    pane.addBinding(PARAMS, 'Pedigree', { min: 0, max: 2.5, step: 0.1 });
}
