const { checkFieldValueExists, insertRow } = require('../dbQueries/dbQueries');
const userFields = require('./userFields'); // Import user fields

async function registerUser(userData) {
    const { username, password, mobile_number, name, lastname, email, address } = userData;
    // Check if the username already exists
    const usernameExists = await checkFieldValueExists('ecommerceshop.users', 'username', username);
    if (usernameExists) {
        throw new Error("Username already exists");
    }
    // Insert the new user with the hashed password
    await insertRow('ecommerceshop.users', Object.keys(userFields), Object.values(userData));
}

module.exports = {
    registerUser
};