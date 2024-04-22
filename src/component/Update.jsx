import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Validation from './CreateValidation';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/users/read/${id}`)
            .then(res => {
                const { name, email, password } = res.data[0]; 
                setValues({ name, email, password });
            })
            .catch(err => console.log(err));
    }, [id]); 

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
    const [errors ,setErrors]=useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = Validation(values);
        setErrors(newErrors);
        if (Object.keys(newErrors).every((key) => newErrors[key] === "")){
         axios.put(`http://localhost:3000/users/update/${id}`, values)
            .then(res => {
                console.log('Updated:', res.data);
                navigate('/'); 
            })
            .catch(err => console.error(err));
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-2xl font-bold mb-4">Update Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Update name"
                            name="name"
                            value={values.name}
                            onChange={handleInput}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        />
                          {errors.name && <span className="text-xs text-red-900">{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Update email"
                            name="email"
                            value={values.email}
                            onChange={handleInput}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        />
                          {errors.email && <span className="text-xs text-red-900">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Update Password"
                            name="password"
                            value={values.password}
                            onChange={handleInput}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        />
                          {errors.password && <span className="text-xs text-red-900">{errors.password}</span>}
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-teal-700"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;
