import { Octokit, RequestInterface } from '@octokit/core';
import { JestMockCompatible } from '@jest/types'; // Import the appropriate Jest types

// Extend the RequestInterface with Jest mock functions
declare module '@octokit/core' {
  interface RequestInterface extends JestMockCompatible {
    mockResolvedValue(value: any): void;
    mockRejectedValue(value: any): void;
    // Add other Jest mock methods you use, like mockRejectedValue or mockImplementation
  }
}

// Mock setup
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn() as unknown as RequestInterface
  }))
}));
