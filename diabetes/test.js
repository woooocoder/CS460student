import { toObject } from './data.js'; 
import csv from '/diabetes.csv?url&raw';

import { SciChart3DSurface } from 'scichart/Charting3D/Visuals/SciChart3DSurface';
import { NumericAxis3D } from 'scichart/Charting3D/Visuals/Axis/NumericAxis3D';
import { XyzDataSeries3D } from 'scichart/Charting3D/Model/XyzDataSeries3D';
import { SpherePointMarker3D } from 'scichart/Charting3D/Visuals/RenderableSeries/PointMarker3D';
import { CameraController } from 'scichart/Charting3D/Visuals/Camera/CameraController';
import { OrbitModifier3D } from 'scichart/Charting3D/Visuals/ChartModifiers/OrbitModifier3D';


// Container for the chart
const divElementId = "scichart-root";

// Get the data from CSV
const data = toObject(csv);
console.log(data);

// Map the data to X, Y, Z, and color values
const diabetes = data.map((item, id) => ({
    id: id,
    x: parseFloat(item.Insulin) || 0, // X-axis: Insulin
    y: parseFloat(item.BMI) || 0, // Y-axis: BMI
    z: parseFloat(item.Glucose) || 0, // Z-axis: Glucose
    color: item.Outcome === "1" ? "#FF0000" : "#00FF00", // Red for Outcome 1, Green otherwise
}));

// Create the SciChart3D Surface
(async () => {
    const { sciChart3DSurface, wasmContext } = await SciChart3DSurface.create(divElementId);

    // Add X, Y, Z axes
    sciChart3DSurface.xAxis = new NumericAxis3D(wasmContext);
    sciChart3DSurface.yAxis = new NumericAxis3D(wasmContext);
    sciChart3DSurface.zAxis = new NumericAxis3D(wasmContext);

    // Create the 3D scatter series
    const scatterSeries = new ScatterRenderableSeries3D(wasmContext, {
        dataSeries: new XyzDataSeries3D(wasmContext, {
            xValues: diabetes.map(point => point.x),
            yValues: diabetes.map(point => point.y),
            zValues: diabetes.map(point => point.z),
        }),
        pointMarker: new SpherePointMarker3D(wasmContext, {
            size: 10,
            // Use a function to assign colors dynamically for each point
            fill: (point) => point.color,  // Dynamic color for each point
        }),
    });

    // Add the scatter series to the chart
    sciChart3DSurface.renderableSeries.add(scatterSeries);

    // Configure the camera for better view
    sciChart3DSurface.camera = new CameraController(wasmContext, {
        position: new Vector3(400, 400, 400), // Adjust position as needed
        target: new Vector3(0, 0, 0),
    });

    // Enable zoom, rotate, and pan gestures
    sciChart3DSurface.chartModifiers.add(new OrbitModifier3D());
})();
