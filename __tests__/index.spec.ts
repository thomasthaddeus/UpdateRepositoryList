// index.spec.ts

import { main } from '../src/index';
import * as loadCredentials from '../src/credentialsLoader';
import { getRepositories, updateHTMLFile } from '../src/fetchRepos';
import { mocked } from 'jest-mock';

jest.mock('../src/credentialsLoader', () => ({
  __esModule: true, // This is required for default exports
  default: jest.fn().mockReturnValue({ username: 'mockuser', token: 'mocktoken' })
}));

jest.mock('../src/fetchRepos', () => ({
  getRepositories: jest.fn().mockResolvedValue(['repo1', 'repo2']),
  updateHTMLFile: jest.fn()
}));

const exitSpy = jest.spyOn(process, 'exit').mockImplementation((code?: number): never => {
  throw new Error(`Exit with code ${code}`);
});

describe('main function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute all steps successfully', async () => {
    loadCredentials.mockReturnValue({ username: 'testuser', token: 'testtoken' });
    mocked(getRepositories).mockResolvedValue(['https://github.com/testuser/repo1', 'https://github.com/testuser/repo2']);
    mocked(updateHTMLFile).mockImplementation(() => {});
    console.info = jest.fn();  // Mock console.info to suppress output during tests

    await main();

    expect(loadCredentials).toHaveBeenCalled();
    expect(getRepositories).toHaveBeenCalledWith('testuser', 'testtoken');
    expect(updateHTMLFile).toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith('Updated the HTML file at index.html with the latest repository links.');
    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });

  it('should log error and exit if credentials are missing', async () => {
    loadCredentials.mockImplementation(() => {
      throw new Error('Credentials missing');
    });

    console.error = jest.fn();  // Mock console.error to suppress output during tests
    // process.exit = jest.fn();   // Mock process.exit to prevent exiting the test environment

    await main();

    expect(console.error).toHaveBeenCalledWith('An error occurred: Credentials missing');
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
