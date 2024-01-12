// credentialsLoader.ts

import * as dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from .env file into process.env

interface Credentials {
    username: string;
    token: string;
}

function loadCredentials(): Credentials {
    const username = process.env.MY_GITHUB_USERNAME;
    const token = process.env.MY_GITHUB_TOKEN;

    if (!username) {
        throw new Error('GitHub username is not set in environment variables');
    }

    if (!token) {
        throw new Error('GitHub token is not set in environment variables');
    }

    return { username, token };
}

export default loadCredentials;

export function mockReturnValue(arg0: { username: string; token: string; }) {
    throw new Error('Function not implemented.');
}

export function mockImplementation(arg0: () => never) {
    throw new Error('Function not implemented.');
}
