type Credentials = {
    email: string;
    password: string;
    role?: string;      
};
export const validUser: Credentials = {
    email: 'john@test.com',
    password: '123456'
};
export function getLoginUrl(env: string): string {
    return `https://${env}.example.com/login`;
}