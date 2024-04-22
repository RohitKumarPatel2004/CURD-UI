import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 

const Read = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); 

    useEffect(() => {
        axios.get(`http://localhost:3000/users/read/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }, [id]); 

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            
            {data ? (
                <div className="bg-white shadow-md rounded p-4">
                    <p className="mb-2"><span className="font-semibold">Id:</span> {data[0]?.id}</p>
                    <p className="mb-2"><span className="font-semibold">Name:</span> {data[0]?.name}</p>
                    <p className="mb-2"><span className="font-semibold">Email:</span> {data[0]?.email}</p>
                    <p className="mb-2"><span className="font-semibold">Password:</span> {data[0]?.password}</p>
                </div>
            ) : (
                <p>Loading or no data available...</p>
            )}
            <Link to='/' className="block mt-4 text-teal-500 hover:text-teal-700">Back</Link>
        </div>
    );
};

export default Read;
