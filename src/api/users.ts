//  Create Api users
import type{ IUser,ICreateUser} from "../types/user";

// Delarate function and get Data,check if response give error and return correct user data
export async function getUsers():Promise<IUser[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if(!response.ok){
        throw new Error("Failed to fetch users");
    }

    const userData = await response.json();
    return userData;
}

// Declarate function getUserById function get user after id and check respone if is error give erron if no error retrurn corect JSON
export async function  getUserById(userId:number): Promise<IUser> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if(!response.ok){
        throw new Error("Failed to get users by Id");
    }

    const userIdData = await response.json();
    return userIdData;
}

// Delcarate function createUser  function create User so interface ICreateUser and check response
export async function createUser(userData: ICreateUser): Promise<IUser> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
    });

    if(!response.ok){
        throw new Error("Failed to create user");
    }

    const createNewUser = await response.json();
    return createNewUser;
}   
// Function get userId and userData so fly query so url and check response if response invalid function throws out Error if response correct function throws out correct json data
export async function updateUser(userId: number, userData: ICreateUser): Promise<IUser> {
        const responese = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        });

        if(!responese.ok){
            throw new Error("Failed to update user");
        }

        const resultUdateUser = await responese.json();
        return resultUdateUser;
}
// Function delete User by id function no return type void and check response if is error
export async function  deleteUser(userId: number): Promise<void>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{method: "DELETE"});

        if(!response.ok){
            throw new Error("Failed to delete user");
        }
}