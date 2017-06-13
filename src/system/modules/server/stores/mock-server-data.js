var R = require('ramda');
var Q = require('q');

var V = require('../../utilities/v');

/**
 * This file contains mock data, in expectation of plugging in the back-end
 * or adjusting the API to provide this information.
 */


// These are mocked client-side details for the logged-in user.
// This is because at this time there is no server api for retrieving these,
// or the existing server api for customer/profile does not return them.
// Note: the keys must correspond to Confirm[KeyName] in the StateStore
function updateProfleWithMockAdditions(clientDetails) {
    return R.merge(clientDetails, {
        Email: clientDetails.Username,
        PreferredContactMode: 'Email'
    })
}


module.exports = {
    updateProfleWithMockAdditions: updateProfleWithMockAdditions
};
