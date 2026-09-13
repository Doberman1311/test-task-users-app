// Type User Data all 

export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    // Type full address data
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        }
    },
    phone:  string,
    website: string,
    // Type company data
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    }
}
// Interface create User
export interface ICreateUser {
    name: string,
    username: string,
    email: string,
    phone: string,
    website: string,
    city: string,
    company: string
}

