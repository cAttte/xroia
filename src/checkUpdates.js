const { CancelablePromise } = require("cancelable-promise")
const fetch = require("node-fetch")
const curPackage = require("../package.json")

module.exports = function checkUpdates() {
    return new CancelablePromise(async resolve => {
        const newPackageURL = `https://raw.githubusercontent.com/${curPackage.repository}/master/package.json`
        const newPackage = await fetch(newPackageURL)
            .then(res => res.json())
            .catch(() => resolve({ latest: true, cur: curPackage.version }))

        resolve({
            latest: curPackage.version === newPackage.version,
            cur: curPackage.version,
            new: newPackage.version
        })
    })
}
