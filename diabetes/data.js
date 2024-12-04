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
 * @todo handle parsing of Outcome. It's currently stored in the format of
 *      'Outcome\r': '0\r' || '1\r'
 */
export async function readCSV(path) {
    const csvData = await fetchCSV(path)
    const rows = csvData.split('\n') // 1 Sample
    
    // Predictor row
    const headers = rows[0].split(',').slice(0, 9)

    const data = rows.slice(1).map(row => {
        const values = row.split(',')
        const sample = headers.reduce((acc, header, index) => {
            acc[header] = values[index]
            return acc
        }, {})
        return sample
    })

    console.log(data)
    return data
}