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

    static  getUserId = async (username: string) => {
        console.log(username);
        const [id] = (await pool.execute<IUser[]>('SELECT `userId` from `users` WHERE `userName` = :username',{
            username
        }))[0];
        return id;
    }
}

export default UserRecord;