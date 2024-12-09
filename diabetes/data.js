export async function fetchCSV(path) {
    const res = await fetch(path)
    const data = await res.text()
    return data
}

/**
 * 
 * @param {*} path : to diabetes csv 
 * @returns Array of sample objects ie..
 *      [
 *          {
 *              Pregnancies: '3',
 *              Glucose: '129',
 *              SkinThickness: '27',
 *              Insulin: '94',
 *              BMI: '28.1',
 *              DiabetesPedigreeFunction: '0.167',
 *              Age: '21',
 *              Outcome: '0'
 *          }
 *      ]  
 */
export async function readCSV(path) {
    const csvData = await fetchCSV(path)
    const rows = csvData.split('\n') // 1 Sample
    
    // Predictor row
    const headers = rows[0].split(',').slice(0, 9)

    const data = rows.slice(1).map(row => {
        const values = row.split(',').map(val => val.trim().replace('/r', ''))
        const sample = headers.reduce((acc, header, index) => {
            acc[header] = values[index] || ''
            return acc
        }, {})
        return sample
    })
 
    return data.filter(sample => Object.keys(sample).length === headers.length)
}

export function toObject(str) {
    const rows = str.split('\n') // 1 Sample
    
    // Predictor row
    const headers = rows[0].split(',').slice(0, 10).map(val => val.trim())
    const data = rows.slice(1).map(row => {
        const values = row.split(',').map(val => val.trim())
        const sample = headers.reduce((acc, header, index) => {
            acc[header] = values[index] || ''
            return acc
        }, {})
        return sample
    })
    console.log(data)
 
    return data.filter(sample => Object.keys(sample).length === headers.length)
}