import type{ ICreateUser } from "../../types/user";

export function validateUser(data: ICreateUser){
    const name = data.name;

    if(!name ||
        name.trim().length === 0 
    ){
        throw new Error("Name is required");
    }else if(name.trim().length > 50){
        throw new Error("Name must be 50 characters or less");
    }

    const username = data.username;

    if(!username ||
        username.trim().length === 0 
    ){
        throw new Error("Username is required");
    }else if(username.trim().length > 30){
        throw new Error("Username must be 30 characters or less");
    }

    const email = data.email;

    if(!email ||
        email.trim().length === 0
    ){
        throw new Error("Email is required")
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        throw new Error("Please provide a valid email");
    }

    const phone = data.phone;

    if(!phone ||
        phone.trim().length === 0 
    ){
        throw new Error("Phone is required");
    }else if(!/^\+?[0-9\s\-()]+$/.test(phone)){
        throw new Error("Phone must contain only valid phone characters");
    }

    const website = data.website;

    if(!website ||
        website.trim().length === 0
    ){
        throw new Error("Website is required");
    }else if(website.trim().length > 100){
        throw new Error("Website must be 100 characters or less");
    }

    const city = data.city;

    if(!city ||
        city.trim().length === 0 
    ){
        throw new Error("City is required");
    }else if(city.trim().length > 50){
        throw new Error("City must be 50 characters or less");
    }

    const company = data.company;

    if(!company ||
        company.trim().length === 0 
    ){
        throw new Error("Company is required");
    }else if(company.trim().length > 100){
        throw new Error("Company must be 100 characters or less");
    }
}