import {pool} from "../utility/db";
import {RowDataPacket} from "mysql2";

export interface IUser extends RowDataPacket {
    userId: string;
    userName: string;
    userSurname: string;
    userEmail: string;
    password: string;
}

class UserRecord {
    userName: string;
    userSurname: string;
    userEmail: string;

    constructor(userName: string, userSurname: string, userEmail: string) {
        this.userName = userName;
        this.userSurname = userSurname
        this.userEmail = userEmail
    }

    static  getAllUserData = async (username: string) => {
        return (await pool.execute<IUser[]>('SELECT `userName`,`userSurname`, `userId`, `password`, `userEmail` from `users` WHERE `userName` = :username',{
            username
        }))[0];
    }

    static  getUserById = async (id: string) => {
        const [user] = (await pool.execute<IUser[]>('SELECT * from `users` WHERE `userId` = :id',{
            id
        }))[0];
        return user;
    }
}

export default UserRecord;