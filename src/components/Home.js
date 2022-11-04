import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUser, setDisplayUser] = useState(users);
    const handleDelete = (user) => {
        const agreeToDelete = window.confirm(`Are you sure to delete ${user?._id} `);
        if (agreeToDelete) {
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remaining = displayUser.filter(usr => usr._id !== user?._id);
                        setDisplayUser(remaining);
                        alert('user deleted succesfully.');
                    }
                });

        }


    }
    return (
        <div>
            {
                displayUser?.map(user => <p
                    key={user?._id}
                >
                    {user?.email}
                    <Link to={`/update/${user?._id}`}><button style={{margin: "10px"}}>Update</button></Link>
                    <button onClick={() => handleDelete(user)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Home;