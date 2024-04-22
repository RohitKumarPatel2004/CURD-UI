
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/users/delete/${id}`)
            .then(res => {
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto">
            <div className="my-8 flex justify-center">
                <Link to="/create" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow-md">
                    Create +
                </Link>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-teal-500 text-white">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((login, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="border px-4 py-2">{login.id}</td>
                            <td className="border px-4 py-2">{login.name}</td>
                            <td className="border px-4 py-2">{login.email}</td>
                            <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                                <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow-md">
                                    <Link to={`/read/${login.id}`} className="hover:text-white">Read</Link>
                                </button>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md">
                                    <Link to={`/update/${login.id}`} className="hover:text-white">Update</Link>
                                </button>
                                <button onClick={() => handleDelete(login.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;

