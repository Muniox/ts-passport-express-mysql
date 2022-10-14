declare module 'global' {
    declare global{
    namespace Express {
        export interface User {
            userId: string;
        }
    }
}
}