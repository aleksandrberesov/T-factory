const fs = require('fs');
const path = require('path');

// Function to get the version from another module
function getVersion(modulePath) {
    const module = require(modulePath);
    return module.version;
}

// Function to increment the version
function incrementVersion(version) {
    const versionParts = version.split('.').map(Number);
    versionParts[versionParts.length - 1]++;
    return versionParts.join('.');
}

// Function to update the version in the other module
function updateVersion(modulePath, newVersion) {
    const module = require(modulePath);
    module.version = newVersion;
    fs.writeFileSync(modulePath, JSON.stringify(module, null, 2));
}

module.exports = {
    getVersion,
    incrementVersion,
    updateVersion
};
