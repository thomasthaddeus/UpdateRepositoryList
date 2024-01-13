interface Credentials {
    username: string;
    token: string;
}
declare function loadCredentials(): Credentials;
export default loadCredentials;
export declare function mockReturnValue(arg0: {
    username: string;
    token: string;
}): void;
export declare function mockImplementation(arg0: () => never): void;
