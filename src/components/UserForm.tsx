import { useState } from "react";
import type { ICreateUser } from "../types/user";
import { validateUser } from "../utils/validation/userValidation";

type Props = {
    onSubmit: (userData: ICreateUser)=> void
    initialData?: ICreateUser
}

const initialFormData: ICreateUser = {
        name: '',
        username: "",
        email: "",
        phone: "",
        website: "",
        city: "",
        company: ""
    }

function UserForm({onSubmit, initialData}: Props){
    


    const [formData, setFormData] = useState<ICreateUser>(initialData ?? initialFormData);
    const [error, setError] = useState<string | null>(null);

    return (
        <form 
        className="max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={(e)=>{
            e.preventDefault();
            try{
                setError(null);
                validateUser(formData);
                onSubmit(formData);
            }catch(error){
                if(error instanceof Error){
                    setError(error.message);
                }
            }
            
        }}>
            {error && <p
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >{error}</p>}
            <input  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type="text" placeholder="Provide you name" value={formData.name} onChange={(e)=>{
                setFormData({ ...formData, name: e.target.value })
            }}/>
            <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type="text" placeholder="Provide you username" value={formData.username} onChange={(e)=>{
                setFormData({...formData, username: e.target.value})
            }}/>
            <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
             type="text" placeholder="Provide you email" value={formData.email} onChange={(e)=>{
                setFormData({...formData, email: e.target.value})
            }}/>
             <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="text" placeholder="Provide you phone" value={formData.phone} onChange={(e)=>{
                setFormData({ ...formData, phone: e.target.value })
            }}/>
            <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
             type="text" placeholder="Provide you website" value={formData.website} onChange={(e)=>{
                setFormData({...formData, website: e.target.value})
            }}/>
            <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
             type="text" placeholder="Provide you city" value={formData.city} onChange={(e)=>{
                setFormData({...formData, city: e.target.value})
            }}/>
             <input className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="text" placeholder="Provide you company" value={formData.company} onChange={(e)=>{
                setFormData({...formData, company: e.target.value})
            }}/>
            <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >{initialData ? "Update user" : "Create user"}</button>
        </form>
    )
}


export default UserForm;