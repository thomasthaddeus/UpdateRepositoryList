// credentialsLoader.spec.ts

import loadCredentials from '../src/credentialsLoader';

describe('credentialsLoader', () => {
  it('should load credentials from environment variables', () => {
    process.env.MY_GITHUB_USERNAME = 'testuser';
    process.env.MY_GITHUB_TOKEN = 'testtoken';

    const credentials = loadCredentials();

    expect(credentials).toEqual({ username: 'testuser', token: 'testtoken' });
  });

  it('should throw an error if username is missing', () => {
    delete process.env.MY_GITHUB_USERNAME;
    process.env.MY_GITHUB_TOKEN = 'testtoken';

    expect(() => loadCredentials()).toThrow('GitHub username is not set in environment variables');
  });

  it('should throw an error if token is missing', () => {
    process.env.MY_GITHUB_USERNAME = 'testuser';
    delete process.env.MY_GITHUB_TOKEN;

    expect(() => loadCredentials()).toThrow('GitHub token is not set in environment variables');
  });
});
