import { getRepositories, updateHTMLFile } from '../src/fetchRepos';
import * as fs from 'fs';

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

jest.mock('fs');

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
});
