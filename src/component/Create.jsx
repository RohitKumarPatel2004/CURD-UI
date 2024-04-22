import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './CreateValidation';

const Create = () => {
    const [values, setData] = useState({
        name: '',
        email: '',
        password:''
    });

    const navigate = useNavigate();

    const [errors ,setErrors]=useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = Validation(values);
        setErrors(newErrors);
        if (Object.keys(newErrors).every((key) => newErrors[key] === "")){
        axios.post('http://localhost:3000/users/data', values)
            .then(res => {
                console.log(res);
                setData(res.data[0]);
                navigate('/');
            })
            .catch(err => console.log(err));

        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-2xl font-bold mb-4">Create User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input type="text" id="name" placeholder="Enter name" name="name" 
                            onChange={e => setData({ ...values, name: e.target.value })}
                            className="mt-1 block w-full  rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                {errors.name && <span className="text-xs text-red-900">{errors.name}</span>}

                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="Enter email" name="email"
                            onChange={e => setData({ ...values, email: e.target.value })}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                {errors.email && <span className="text-xs text-red-900">{errors.email}</span>}

                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Update Password"
                            name="password"
                            onChange={e => setData({ ...values, password: e.target.value })}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        />
                       {errors.password && <span className="text-xs text-red-900">{errors.password}</span>}

                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-teal-700">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
