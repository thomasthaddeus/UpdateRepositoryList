"use strict";
// credentialsLoader.ts
exports.__esModule = true;
exports.mockImplementation = exports.mockReturnValue = void 0;
var dotenv = require("dotenv");
dotenv.config(); // Loads environment variables from .env file into process.env
function loadCredentials() {
    var username = process.env.MY_GITHUB_USERNAME;
    var token = process.env.MY_GITHUB_TOKEN;
    if (!username) {
        throw new Error('GitHub username is not set in environment variables');
    }
    if (!token) {
        throw new Error('GitHub token is not set in environment variables');
    }
    return { username: username, token: token };
}
exports["default"] = loadCredentials;
function mockReturnValue(arg0) {
    throw new Error('Function not implemented.');
}
exports.mockReturnValue = mockReturnValue;
function mockImplementation(arg0) {
    throw new Error('Function not implemented.');
}
exports.mockImplementation = mockImplementation;
