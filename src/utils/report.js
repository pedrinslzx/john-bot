/* eslint no-console: 0 */
/* eslint no-shadow: 0 */
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export function getReports(type = '') {
  try {
    const reportFile = readFileSync(join(__dirname, 'report.json'))
    const report = JSON.parse(reportFile)
    return type !== '' && typeof type === 'string'
      ? report[type] || null
      : report
  } catch (error) {
    console.error('[report]', error)
    return null
  }
}

export function addReport(type, newReport) {
  try {
    let reportFile = readFileSync(join(__dirname, 'report.json'))
    const report = JSON.parse(reportFile)
    report[type] = report[type] || []
    report[type].push(newReport)
    reportFile = JSON.stringify(report, null, 2)
    writeFileSync(join(__dirname, 'report.json'), reportFile)
    return report[type] || null
  } catch (error) {
    console.error('[report]', error)
    return null
  }
}

export function addReports(type, ...reports) {
  try {
    const [report] = reports.map(report => addReport(type, report))
    return report
  } catch (error) {
    console.error('[report]', error)
    return null
  }
}
