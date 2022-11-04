import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser=useLoaderData();
    const [user, setUser] = useState({});

    const handleUpdateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/users/${storedUser._id}`,{
            method:'PUT',
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.modifiedCount){
                alert('Updated Successfully')
                console.log(data);
            }
            
        })

    }

    const handleInputBlur = event => {
        const value = event.target.value;
        const field = event.target.name;
        console.log(event.target);
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser)
    }
    return (
        <div>
           <h1>user Name :  {storedUser.name}</h1>
             <form onSubmit={handleUpdateUser}>
                <input onBlur={handleInputBlur} type="text" name='name' defaultValue={storedUser.name} placeholder='name' required />
                <br />
                <input onBlur={handleInputBlur} type="text" name='address' defaultValue={storedUser.address} placeholder='address' required />
                <br />
                <input onBlur={handleInputBlur} type="email" name='email' defaultValue={storedUser.email} placeholder='email' required />
                <br />
                <button type='submit'> Update User</button>
            </form>

        </div>
    );
};

export default Update;