const path = require('path');
const versionManager = require('./versionManager');
const modulePath = path.resolve(__dirname, '../package.json'); // Update with the actual path to your module

const args = process.argv.slice(2);
const newVersionArg = args.find(arg => arg.startsWith('--newVersion='));

console.log(newVersionArg);

if (newVersionArg) {
    const newVersion = newVersionArg.split('=')[1];
    console.log('Setting Version to:', newVersion);
    versionManager.updateVersion(modulePath, newVersion);
    console.log('Version updated successfully.');
} else {
    const currentVersion = versionManager.getVersion(modulePath);
    console.log('Current Version:', currentVersion);

    const newVersion = versionManager.incrementVersion(currentVersion);
    console.log('New Version:', newVersion);

    versionManager.updateVersion(modulePath, newVersion);
    console.log('Version updated successfully.');
}
