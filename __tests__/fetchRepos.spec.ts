import * as fs from 'fs';
import { getRepositories, updateHTMLFile, ensureFileExists } from '../src/fetchRepos';

// Mock the entire fs module
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));


// Mock @octokit/core
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockResolvedValue({
      data: [
        { html_url: 'https://github.com/user/repo1' },
        { html_url: 'https://github.com/user/repo2' }
      ]
    })
  }))
}));

describe('fetchRepos', () => {
  describe('getRepositories', () => {
    it('should fetch repository URLs', async () => {
      const repos = await getRepositories('user');
      expect(repos).toEqual(['https://github.com/user/repo1', 'https://github.com/user/repo2']);
    });
  });

  describe('updateHTMLFile', () => {
    it('should update HTML file with repository links', () => {
      const htmlFilePath = 'path/to/index.html';
      const htmlContent = '<ul id="repo-list"></ul>';
      const expectedUpdatedContent = '<ul id="repo-list">\n<li><a href="https://github.com/user/repo1">repo1</a></li>\n<li><a href="https://github.com/user/repo2">repo2</a></li>\n</ul>';

      jest.spyOn(fs, 'readFileSync').mockReturnValue(htmlContent);
      jest.spyOn(fs, 'writeFileSync');

      updateHTMLFile(htmlFilePath, '<li><a href="https://github.com/user/repo1">repo1</a></li>\n<li><a href="https://github.com/user/repo2">repo2</a></li>');

      expect(fs.writeFileSync).toHaveBeenCalledWith(htmlFilePath, expectedUpdatedContent, { encoding: 'utf8' });
    });
  });

  describe('ensureFileExists', () => {
    const templatesDir = 'path/to/templates';
    const htmlFilePath = 'path/to/index.html';
    const templateFilePath = `${templatesDir}/index.html`;

    it('should create index.html from template if it does not exist', () => {
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        if (path === htmlFilePath) {
          return false; // index.html does not exist
        }
        if (path === templatesDir) {
          return true; // templates directory exists
        }
        return false;
      });
      (fs.readFileSync as jest.Mock).mockReturnValue('<html></html>');

      ensureFileExists(htmlFilePath, 'index.html');

      expect(fs.writeFileSync).toHaveBeenCalledWith(htmlFilePath, '<html></html>', { encoding: 'utf8' });
    });

    it('should return an error message if the templates directory does not exist', () => {
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        if (path === templatesDir) {
          return false; // templates directory does not exist
        }
        return true;
      });

      const result = ensureFileExists(htmlFilePath, 'index.html');

      expect(result).toBe(`The templates directory at ${templatesDir} does not exist. Please create it.`);
    });
  });
});
