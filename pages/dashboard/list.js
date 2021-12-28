import React from 'react';


export default function List({list, deleteList}){
    return (
        <ul className="m-6 w-full">
            {list.map(todo => {
                return (
                    <li className="m-6 item" id={todo.id} key={todo.id + todo.uid} name="todo" value={todo.id}>
            <span> {todo.name} </span> <span onClick={()=>deleteList(todo.uid)} className='float-right font-bold cursor-pointer'>X</span>
        </li>
                )
            })}
        </ul>
    );
};
