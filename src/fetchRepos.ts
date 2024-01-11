import { Octokit } from "@octokit/core";

async function getRepositories(username: string): Promise<string[]> {
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

async function main() {
    const username = "thomasthaddeus"; // Replace with the GitHub username
    const repositories = await getRepositories(username);
    const htmlLinks = repositories.map(url => `<li><a href="${url}">${url.split('/').pop()}</a></li>`).join('\n');
    console.log(htmlLinks);
    // Further code to update the landing page goes here
}

main();
