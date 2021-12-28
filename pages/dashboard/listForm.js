import React, { useState } from 'react';

const ListForm = ({ addItem }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(userInput);
        setUserInput("");
    }
    return (
        <form  className="m-6" onSubmit={handleSubmit}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="Enter here..."/>
            <button className="bg-sky-400 text-white p-1 m-6">Submit</button>
        </form>
    );
};

export default ListForm;