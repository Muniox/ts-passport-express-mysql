declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            NODE_ENV: 'development' | 'production';
            DBHOST: string;
            DBPORT: string;
            DB: string;
            DBPASSWORD: string;
            DBUSER: string;
        }
    }
}

export {};