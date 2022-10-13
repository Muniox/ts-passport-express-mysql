declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            NODE_ENV: 'development' | 'production';
            DBHOST: string;
            DBPORT: number;
            DB: string;
            DBPASSWORD: string;
        }
    }
}

export {};