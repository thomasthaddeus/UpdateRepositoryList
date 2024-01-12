// index.ts

import { updateHTMLFile, getRepositories } from './fetchRepos';
import loadCredentials from './credentialsLoader';

export async function main() {
  console.info('Starting script execution...');

  try {
    const { username, token } = loadCredentials(); // Load credentials
    console.info('Credentials loaded successfully.');

    const htmlFilePath = process.env.HTML_FILE_PATH || 'index.html';
    console.info(`Updating HTML file at: ${htmlFilePath}`);

    const repositories = await getRepositories(username, token);
    console.info(`Fetched ${repositories.length} repositories.`);

    const htmlLinks = repositories.map(url => `<li><a href="${url}">${url.split('/').pop()}</a></li>`).join('\n');

    updateHTMLFile(htmlFilePath, htmlLinks);
    console.info(`Updated the HTML file at ${htmlFilePath} with the latest repository links.`);

  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

main();
