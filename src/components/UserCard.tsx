import { useNavigate } from "react-router-dom";
import type { IUser } from "../types/user";

type Props  = {
    user: IUser,
    onEdit: (userId: number) => void,
    onDelete: (userId: number) => void,
}


function UserCard({user, onEdit,onDelete}: Props){
    const navigate = useNavigate();

    return (
        <div className= "cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        onClick={()=>{
            navigate("/users/" + user.id,{ state: user});
        }}>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.address.city}</p>
            <p className="text-gray-600">{user.company.name}</p>
            
            <div className="mt-4 flex gap-2">
            <button 
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            onClick={(e)=>{
                 e.stopPropagation();
                 onEdit(user.id);
            }}>Edit</button>
            <button
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            onClick={(e)=>{
                e.stopPropagation();
                onDelete(user.id);
            }}>Delete</button>
            </div>
        </div>
    )
}

export default UserCard;