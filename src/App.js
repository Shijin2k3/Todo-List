import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const[isCompleteScreen,setIsCompleteScreen]= useState(false);
  const [allTodos,setAllTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [completedTodo,setCompletedTodo]=useState([]);
  const [currentEdit,setCurrentEdit]=useState("");
  const [currentEditedItem,setCurrentEditedItem]=useState("");

  function handleAddBtn(e){
    e.preventDefault();
    if(!newTitle || !newDescription){
      alert("please enter valid title and description")
      return;
    }
    let newTodoItem={
      title:newTitle,
      description:newDescription
    };
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);

     setNewTitle("");
    setNewDescription("");  
   
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
    
  };
   const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  }
  const handleCompleted =(index)=>{
   
   
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd +"-"+ mm +"-"+ yyyy +  " at " +h+":"+m+":"+s;
     let filteredItem={
      ...allTodos[index],
      completedOn:completedOn,
     };
     let updatedCompletedArr=[...completedTodo];
     updatedCompletedArr.push(filteredItem);
     localStorage.setItem('completedlist',JSON.stringify(updatedCompletedArr));
     setCompletedTodo(updatedCompletedArr);
     handleDeleteTodo(index);
  }
  const handleDeleteCompletedTodo=(index)=>{
    let reducedCompletedTodo=[...completedTodo];
    reducedCompletedTodo.splice(index,1);
    localStorage.setItem('completedlist',JSON.stringify(reducedCompletedTodo));
    setCompletedTodo(reducedCompletedTodo);
  } 
  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let completedSavedTodo=JSON.parse(localStorage.getItem('completedlist'));
    if(savedTodo){
      setAllTodos(savedTodo);
    }
    if(completedSavedTodo){
      setCompletedTodo(completedSavedTodo);
    }
  },[])
  //editbtn
  const handleEdit=(index,item)=>{

  setCurrentEdit(index);
  setCurrentEditedItem(item);

  }
  const handleUpdateTitle=(value)=>{
  setCurrentEditedItem((prev)=>{
    return {...prev,title:value}
  })
  } 
  const handleUpdateDescription=(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
  })
}
  const handleUpdateBtn=()=>{
    let newTodo=[...allTodos];
    newTodo[currentEdit]=currentEditedItem;
    setAllTodos(newTodo);
    setCurrentEdit("");
    localStorage.setItem('todolist',JSON.stringify(newTodo));
  
  }

  return (
    <div className="App">
      <h1>My Tasks</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title : </label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter the task...'/>
          </div>
          <div className='todo-input-item'>
            <label>Description : </label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='Enter the description...'/>
          </div>
          <div className='todo-input-item'>
              <button className='primaryBtn' onClick={handleAddBtn}>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && "active"}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && "active"}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>  
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            if(currentEdit === index){
              return (
            <div className='edit-wrapper' key={index}>
              <input placeholder='Update Title' onChange={(e)=> handleUpdateTitle(e.target.value)} value={currentEditedItem.title}/>
              <textarea placeholder='Update Description' onChange={(e)=> handleUpdateDescription(e.target.value)} value={currentEditedItem.description}/>
              <button className='primaryBtn' onClick={handleUpdateBtn}>Update</button>
              </div>
              )
            }else{  
            return(
          <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3> 
              <p>{item.description}</p>
            </div>
            <div>
            <AiOutlineDelete className='icon'onClick={()=>handleDeleteTodo(index)} title='delete?'/>
            <BsCheckLg className='check-icon' onClick={()=>handleCompleted(index)} title='complete?'/>
            <AiOutlineEdit className='check-icon' onClick={()=>handleEdit(index,item)} title='Edit?'/>
            </div>
          </div>
  
            )
            }
          })}
           {isCompleteScreen===true && completedTodo.map((item,index)=>{
            return(
          <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>{item.completedOn}</small></p>
            </div>
            <div>
            <AiOutlineDelete className='icon'onClick={()=>handleDeleteCompletedTodo(index)} title='delete?'/>
            
            </div>
          </div>
  
            )
          })}
         
          
        </div>
      </div>

    </div>
  );
}

export default App;
