export interface Config {
    serverPort: number;
    jwtSecretKey: string;
    jwtExpiredIn: string;
    databaseUrl: string;
}