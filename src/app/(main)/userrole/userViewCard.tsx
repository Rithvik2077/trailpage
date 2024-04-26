

export default function UserViewCard({user, header, userFunction}) {
    // console.log(user)
    const {id, username, email, rolename, groupname, categoryname, can_create_survey} = user;
    const ulClass = header?"flex bg-slate-400 py-4 px-4 mx-8 items-center gap-1":"flex bg-slate-200 py-4 px-4 mx-8 items-center hover:bg-slate-300 gap-1";
    const liClass = header?"flex-1 font-extrabold":"flex-1"

    return (
            <ul className={ulClass}>
                <li className={liClass}>{username}</li>
                <li className={liClass}>{email}</li>
                <li className={liClass}>{rolename}</li>
                <li className={liClass}>{groupname || <span className="bg-red-400 px-2 py-1 rounded-full cursor-pointer" onClick={()=>userFunction(user)}>Assign</span>}</li>
                <li className={liClass}>{categoryname || <span className="bg-red-400 px-2 py-1 rounded-full cursor-pointer" onClick={()=>userFunction(user)}>Assign</span>}</li>
                <li className={liClass}>{header?<span>Create Survey</span>:can_create_survey?<span className="bg-green-400 py-1 px-2 rounded-full">Yes</span>:<span className="bg-red-400 py-1 px-2 rounded-full">No</span>}</li>
                {!header? <span className="bg-sky-400 px-4 py-1 rounded-full cursor-pointer" onClick={()=>userFunction(user)}>Edit</span>:<span className="bg-sky-400 px-4 py-1 rounded-full cursor-pointer opacity-0 pointer-events-none">Edit</span>}
            </ul>
    )
}