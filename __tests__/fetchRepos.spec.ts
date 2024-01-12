import * as fs from 'fs';
import { Octokit } from '@octokit/core';
import { getRepositories, updateHTMLFile, ensureFileExists } from '../src/fetchRepos';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

// Create a manual mock for @octokit/core
jest.mock('@octokit/core', () => {
  return {
    Octokit: jest.fn().mockImplementation(() => {
      return { request: jest.fn() };
    })
  };
});

// fetchRepos.spec.ts
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockResolvedValue({
      mockData: [
        { html_url: typeof String('https://github.com/user/repo1') },
        { html_url: typeof String('https://github.com/user/repo2') }
      ]
    })
  }))
}));


describe('fetchRepos', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  describe('getRepositories', () => {
    it('should fetch repository URLs', async () => {
      const mockToken = 'mock-token';
      const mockData = {
        data: [
          { html_url: typeof String('https://github.com/user/repo1') },
          { html_url: typeof String('https://github.com/user/repo2') }
        ]
      };

      // Set up the mock implementation
      const octokitInstance = new Octokit();
      octokitInstance.request.mockResolvedValue(mockData);

      const repos = await getRepositories('user', mockToken);
      expect(repos).toEqual(['https://github.com/user/repo1', 'https://github.com/user/repo2']);
      expect(octokitInstance.request).toHaveBeenCalledWith('GET /users/{username}/repos', {
        username: 'user'
      });
    });

    describe('updateHTMLFile', () => {
      it('should update HTML file with repository links', () => {
        const htmlFilePath = '../index.html';
        const htmlContent = '<ul id="repo-list"></ul>';
        const expectedUpdatedContent = '<ul id="repo-list">\n<li><a href="https://github.com/user/repo1">repo1</a></li>\n<li><a href="https://github.com/user/repo2">repo2</a></li>\n</ul>';

        jest.spyOn(fs, 'readFileSync').mockReturnValue(htmlContent);
        jest.spyOn(fs, 'writeFileSync');

        updateHTMLFile(htmlFilePath, '<li><a href="https://github.com/user/repo1">repo1</a></li>\n<li><a href="https://github.com/user/repo2">repo2</a></li>');

        expect(fs.writeFileSync).toHaveBeenCalledWith(htmlFilePath, expectedUpdatedContent, { encoding: 'utf8' });
      });
    });

    describe('ensureFileExists', () => {
      const templatesDir = '../templates';
      const htmlFilePath = '../index.html';

      it('should create index.html from template if it does not exist', () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
          return path !== htmlFilePath; // index.html does not exist, but templates directory does
        });
        (fs.readFileSync as jest.Mock).mockReturnValue('<html></html>');

        ensureFileExists(htmlFilePath, 'index.html');

        expect(fs.writeFileSync).toHaveBeenCalledWith(htmlFilePath, '<html></html>', { encoding: 'utf8' });
      });

      it('should return an error message if the templates directory does not exist', () => {
        (fs.existsSync as jest.Mock).mockImplementation((path) => {
          return path !== templatesDir; // templates directory does not exist
        });

        const result = ensureFileExists(htmlFilePath, 'index.html');

        expect(result).toBe(`The templates directory at ${templatesDir} does not exist. Please create it.`);
      });
    });
  });
});