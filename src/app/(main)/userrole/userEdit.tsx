import { url_get_users_form_data, url_update_userrolemapping } from '@/app/lib/apiEndPoints';
import React, { useState, useEffect } from 'react';
import Loading from '@/components/Common/LoadingScreen';

const UserEdit = ({ user, onCloseView }) => {
    const [id, setId] = useState(user.id);
    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.rolename);
    const [category, setCategory] = useState(user.categoryname);
    const [group, setGroup] = useState(user.groupname);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [radioOption, setRadioOption] = useState(user.can_create_survey ? 'yes' : 'no');

    useEffect(() => {
        loadFormData();
    }, []);

    const loadFormData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url_get_users_form_data);
            const data = await response.json();
            setRoles(data.Response.result.roles);
            setGroups(data.Response.result.groups);
            setCategories(data.Response.result.categories);
            setLoading(false);
            // localStorage.setItem("roles", JSON.stringify(data.Response.result.roles));
            // localStorage.setItem("groups", JSON.stringify(data.Response.result.groups));
            // localStorage.setItem("categories", JSON.stringify(data.Response.result.categories));
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleSaveChanges = async () => {
        
        setSaving(true);
        // console.log("Updated Email:", email);
        // console.log("Updated Role:", role);
        // console.log("Updated Category:", category);
        // console.log("Updated Group:", group);
        // console.log("Create Survey:", radioOption === 'yes');
        // console.log(roles);
        // console.log(categories);
        // console.log(groups);
        // UserRole.user_id, UserRole.role_id, UserRole.group_id, UserRole.sub_category_id, UserRole.can_create_survey
        const data = {
            user_id: id,
            role_id: role,
            group_id: group,
            sub_category_id: category,
            can_create_survey: radioOption === 'yes'?true:false,
        }
        // console.log(data);
        await fetch(url_update_userrolemapping, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => {
            // res.json()
            setSaving(false);
            onCloseView(true);
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md">
            {loading && <Loading size={25}/>}
            {!loading && (
                <div className='p-6'>
                    <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    value={name}
                    disabled
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                    Role: (Current "{user.rolename}")
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                >
                    {roles.map((role, idx) => (
                        <option value={role.id} key={idx}>{role.rolename}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="group">
                    Group: (Current "{user.groupname}")
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="group"
                    onChange={(e) => {
                        setGroup(e.target.value);
                        const filteredCategories = categories.filter(cat => cat.group_id === e.target.value);
                        setFilteredCategories(filteredCategories);
                    }}
                >
                    {groups.map((group, idx) => (
                        <option value={group.id} key={idx}>{group.groupname}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                    Category: (Current "{user.categoryname}")
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {filteredCategories.map((category, idx) => (
                        <option value={category.id} key={idx}>{category.categoryname}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Can Create Survey?
                </label>
                <span className="flex flex-row gap-6">
                <div onClick={() => setRadioOption('yes')}>
                    <input
                        type="radio"
                        id="yes"
                        value="yes"
                        checked={radioOption === 'yes'}
                        onChange={() => setRadioOption('yes')}
                    />
                    <label htmlFor="yes" className="ml-2">Yes</label>
                </div>
                <div onClick={() => setRadioOption('no')}>
                    <input
                        type="radio"
                        id="no"
                        value="no"
                        checked={radioOption === 'no'}
                        onChange={() => setRadioOption('no')}
                    />
                    <label htmlFor="no" className="ml-2">No</label>
                </div>
                </span>
            </div>
            <div className='flex flex-row items-center gap-6'>
                <button
                    className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSaveChanges}
                    disabled={saving}
                >
                    {saving?"Saving Changes...":"Save Changes"}
                </button>
                <button
                    className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => onCloseView(false)}
                >
                    Cancle
                </button>
            </div>
                </div>
            )}
        </div>
    );
};

export default UserEdit;
