import { updateHTMLFile, getRepositories } from './fetchRepos';
import loadCredentials from './credentialsLoader';

async function main() {
  const { username, token } = loadCredentials(); // Load credentials
  const htmlFilePath = "index.html"; // Path to your HTML file
  const repositories = await getRepositories(username, token); // Pass token here
  const htmlLinks = repositories.map(url => `<li><a href="${url}">${url.split('/').pop()}</a></li>`).join('\n');

  updateHTMLFile(htmlFilePath, htmlLinks);
  console.log("Updated the HTML file with the latest repository links.");
}

main();
