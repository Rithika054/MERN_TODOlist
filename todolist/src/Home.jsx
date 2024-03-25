import React, { useState ,useEffect} from 'react';
import Create from './Create';
import axios from 'axios'
import { BsCircleFill, BsCheckCircleFill, BsFillTrashFill,BsFillCheckCircleFill } from 'react-icons/bs';


function Home() {
  const[todos,setTodos]=useState([])
  useEffect(() =>{
    axios.get('https://mern-tod-olist.vercel.app/get/')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  } ,[])

  const handleEdit = (id) =>{
    axios.put('https://mern-tod-olist.vercel.app/update/'+id)
    .then(result => {
      location.reload()
    })
    .catch(err =>console.log(err))

  }

  const handleDelete= (id) =>{
    axios.delete('https://mern-tod-olist.vercel.app/delete/'+id)
    .then(result => {
      location.reload()
    })
    .catch(err =>console.log(err))
  }
  return (
    <div className='home'>
      <h1>To-Do List </h1>
      <Create/>{
            todos.length===0
            ?
            <div><h2>No Records Found</h2></div>
            :
            todos.map(todo => (
              <div className='task'>
                <div className ='checkbox' onClick={() => handleEdit(todo._id)}>
                  {todo.done ? 
                    <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                  : <BsCircleFill className='icon'/>
                  }
                  <p  className={todo.done ? "line_through" : ""}>{todo.task}</p> 
                </div>
                <div> 
                  <span> <BsFillTrashFill className='icon'
                          onClick={() => handleDelete(todo._id)}/></span>
                </div>
              </div>
        ))
            }
    </div>
  );
}

export default Home;

