"use client"
import React, {useState, useEffect} from "react";
import Loading from "@/components/Common/LoadingScreen";
import UserViewCard from "./userViewCard";
import UserEdit from "./userEdit";
import { url_get_users } from "@/app/lib/apiEndPoints";

export default function UserRoles() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const [id, setId] = useState(0);
   const [user, setUser] = useState({});
    // const {id, username, email, rolename, groupname, categoryname}
    const rowHeaders = {
        username: "Name",
        email: "Email",
        rolename: "Role",
        groupname: "Group",
        categoryname: "Category",
        noButton: true,
    };
    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        setLoading(true);
        const url = url_get_users+"true";
        await fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsers(data.Response.result);
            setLoading(false);
            setShowUsers(true);
            // setUsers(data)
        })
        .catch(err => console.log(err));
    }

    const userEdit = (user) => {
        setEditUser(true);
        // {id, username, email, rolename, groupname, categoryname}
        setUser(user);
        setShowUsers(false);
        setId(id);
    }
    const closeUserEdit = (reloadUsers) => {
        setEditUser(false);
        setUser({});
        setShowUsers(true);
        setId(0);
        if(reloadUsers) {
            loadUsers()
        }
    }
    return (
        <div className="py-2">
            {loading && <Loading size={75}/>}
            {editUser && !showUsers && <UserEdit user={user} onCloseView={closeUserEdit}/>}
            {!loading && showUsers &&
            <div className="flex flex-col gap-1 py-4">
                <UserViewCard user={rowHeaders} header={true} userFunction={() => {}}/>
                {users.map((user, idx) => <UserViewCard user={user} header={false} userFunction={userEdit} key={idx}/>)}
            </div>}
        </div>
    )
}