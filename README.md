# Update Repository List GitHub Action

[![Codecov](https://github.com/thomasthaddeus/UpdateRepositoryList/actions/workflows/ci.yml/badge.svg)](https://github.com/thomasthaddeus/UpdateRepositoryList/actions/workflows/ci.yml) [![Update Landing Page](https://github.com/thomasthaddeus/UpdateRepositoryList/actions/workflows/main.yml/badge.svg)](https://github.com/thomasthaddeus/UpdateRepositoryList/actions/workflows/main.yml)

This GitHub Action automatically queries your GitHub repositories and updates an HTML file (your landing page) with a list of these repositories. It's configurable to run on a schedule or in response to specific GitHub events.

I started this project so that I could create a landing page on my GitHub.io website. Then use that to link to projects and websites throughout my account.

## Features

- Automatically fetches a list of GitHub repositories for a specified user.
- Updates an HTML file with the latest list of repositories.
- Customizable to run on different triggers like push, pull request, or on a schedule.

## Getting Started

These instructions will guide you through setting up and running the action on your own repository.

### Prerequisites

- A GitHub account.
- A GitHub repository where you want to use this action.
- (Optional) A Personal Access Token (PAT) if you need to access private repositories.

### Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thomasthaddeus/UpdateRepositoryList.git
   ```

2. **Set up the environment variables**:

   Create a `.env` file in your project root and add the following:

   ```env
   MY_GITHUB_USERNAME=your-github-username
   MY_GITHUB_TOKEN=your-github-token
   ```

## Local Development

To run and test the script locally, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the script:

   ```bash
   npm run start
   ```

### Setup

1. **Clone the Repository**

   Clone this repository into your GitHub account.

2. **Configure Environment Variables**

   - Create a `.env` file at the root of your project.
   - Add your GitHub username and (optionally) a personal access token to the `.env` file:

    ```env
    MY_GITHUB_USERNAME=your-username
    MY_GITHUB_TOKEN=your-personal-access-token
    ```

3. **GitHub Secrets**

   For production use, set your GitHub username and personal access token as secrets in your repository settings:

   - `MY_GITHUB_USERNAME`
   - `MY_GITHUB_TOKEN` (your PAT)

### GitHub Actions Workflow

1. **Set Secrets**:

   Add `MY_GITHUB_USERNAME` and `MY_GITHUB_TOKEN` as secrets in your GitHub repository settings.

2. **Workflow Configuration**:

   Edit `.github/workflows/main.yml` to configure the triggers for running the action.

3. **Customize Landing Page Template**

   Modify the HTML templates in the `templates` directory as needed to fit the design of your landing page.

### HTML File Configuration

- Set the path to your HTML file in the workflow file using the `HTML_FILE_PATH` environment variable.

### Usage

Once set up, the action will run according to the triggers defined in your workflow file. You can customize the triggers in the `.github/workflows/main.yml` file.

## Running Tests

To ensure the reliability of the code, you can run the included tests:

```bash
npm test
```

This will execute the test cases defined in the `__tests__` directory using Jest.

## Contributing

We welcome contributions to this project! Whether it's bug fixes, feature additions, or improvements in documentation, your help is appreciated. Here's how you can contribute:

1. **Fork the Repository**: Create a fork of this repository.
2. **Create a Feature Branch**: `git checkout -b feature/YourAmazingFeature`.
3. **Commit Your Changes**: `git commit -m 'Add some amazing feature'`.
4. **Push to the Branch**: `git push origin feature/YourAmazingFeature`.
5. **Open a Pull Request**: Go to your forked repo on GitHub and open a pull request.

## Reporting Issues

If you encounter any issues or have suggestions for improvements, please report them using the repository's [issue tracker](https://github.com/thomasthaddeus/UpdateRepositoryList/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- [@thaddeusmaxima](https://twitter.com/thaddeusmaxima)
- [Thaddeus Thomas LinkedIn](https://linkedin.com/in/thaddeusthomas)
- [Project Link](https://github.com/thomasthaddeus/UpdateRespositoryList)

## Acknowledgments

<!-- - Mention anyone or any project that inspired or contributed to this project. -->
