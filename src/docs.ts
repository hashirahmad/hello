/**
 * Ideally it should be `export default { . . . }` yet this does
 * not get parsed by the `createDoc` function. Hence doing it this
 * way. The `module.exports = { . . . }` also works fine.
 */
import packageJson from '../package.json'
import config from './config'
const env = `(${config.NODE_ENV.toUpperCase()}) `
export = {
    name: env + packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    title: env + packageJson.name,
    sampleUrl: true,
    input: ['example'],
    order: ['User', 'PostUser', 'GetUser', 'City', 'Category (official)'],
    template: {
        showRequiredLabels: true,
        withCompare: true,
        withGenerator: false,
        aloneDisplay: false,
    },
}
