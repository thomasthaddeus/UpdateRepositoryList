// fetchRepos.ts

import { Octokit } from "@octokit/core";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const templatesDir = join(__dirname, 'templates');

export async function getRepositories(username: string): Promise<string[]> {
  const octokit = new Octokit();
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: username
    });
    return response.data.map(repo => repo.html_url);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

export function ensureFileExists(filePath: string, templateFileName: string) {
  if (!existsSync(filePath)) {
    const templatePath = join(templatesDir, templateFileName);
    const content = readFileSync(templatePath, { encoding: 'utf8' });
    writeFileSync(filePath, content, { encoding: 'utf8' });
  }
}

function ensureListSectionExists(htmlContent: string, listSectionTemplateFileName: string): string {
  const listStartTag = '<ul id="repo-list">';
  const listEndTag = '</ul>';
  const start = htmlContent.indexOf(listStartTag);
  const end = htmlContent.indexOf(listEndTag, start);

  if (start === -1 || end === -1) {
    const listSectionTemplatePath = join(templatesDir, listSectionTemplateFileName);
    const listSectionContent = readFileSync(listSectionTemplatePath, { encoding: 'utf8' });
    return htmlContent + listSectionContent;
  }

  return htmlContent;
}

export function updateHTMLFile(htmlFilePath: string, htmlLinks: string) {
  ensureFileExists(htmlFilePath, 'index.html');

  let htmlContent = readFileSync(htmlFilePath, { encoding: 'utf8' });
  htmlContent = ensureListSectionExists(htmlContent, 'listSection.html');

  const listStartTag = '<ul id="repo-list">';
  const listEndTag = '</ul>';
  const start = htmlContent.indexOf(listStartTag) + listStartTag.length;
  const end = htmlContent.indexOf(listEndTag, start);

  htmlContent = htmlContent.substring(0, start) + "\n" + htmlLinks + htmlContent.substring(end);
  writeFileSync(htmlFilePath, htmlContent, { encoding: 'utf8' });
}

async function main() {
  const username = "thomasthaddeus"; // Replace with the GitHub username
  const htmlFilePath = "index.html"; // Path to your HTML file
  const repositories = await getRepositories(username);
  const htmlLinks = repositories.map(url => `<li><a href="${url}">${url.split('/').pop()}</a></li>`).join('\n');

  updateHTMLFile(htmlFilePath, htmlLinks);
  console.log("Updated the HTML file with the latest repository links.");
}

main();
