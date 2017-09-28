var _ = require('lodash').noConflict(),
    util = require('../../util'),

    /**
     * Replenishes missing ids in v2.0.0.x collections.
     *
     * @param {*} currentItem - A collection entity on which to check for ids.
     * @returns {*} - The updated item, with the correct id fields in place.
     */
    populateIds = function (currentItem) {
        // ID sanitization
        if (currentItem._postman_id) {
            currentItem.id = currentItem._postman_id;
            delete currentItem._postman_id;
        }
        !currentItem.id && (currentItem.id = util.uid());

        var itemArray = currentItem.items || currentItem.item;
        itemArray && itemArray.length && _.forEach(itemArray, populateIds);
        return currentItem;
    };

module.exports = {
    authMap: {
        basic: 'basicAuth',
        digest: 'digestAuth',
        hawk: 'hawkAuth',
        oauth1: 'oAuth1',
        awsv4: 'awsSigV4',
        noauth: 'normal'
    },
    modeMap: {
        urlencoded: 'urlencoded',
        formdata: 'params',
        raw: 'raw',
        file: 'binary'
    },
    populateIds: populateIds
};