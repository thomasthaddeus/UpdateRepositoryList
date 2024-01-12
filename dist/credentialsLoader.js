"use strict";
// credentialsLoader.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockImplementation = exports.mockReturnValue = void 0;
var dotenv = __importStar(require("dotenv"));
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
exports.default = loadCredentials;
function mockReturnValue(arg0) {
    throw new Error('Function not implemented.');
}
exports.mockReturnValue = mockReturnValue;
function mockImplementation(arg0) {
    throw new Error('Function not implemented.');
}
exports.mockImplementation = mockImplementation;
//# sourceMappingURL=credentialsLoader.js.map