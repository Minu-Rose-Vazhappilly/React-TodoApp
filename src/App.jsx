import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addTodoList, deleteTodoList, editTodoList, todoList } from './services/allAPI'

function App() {
  const [userInput,setUserInput] = useState({
    name:"",
    completed:false,
  })
  const [up,setUpTask] = useState({})
  console.log(up);
  
  console.log(userInput);
  
  const [task,setTask] = useState({})
  console.log(task);
  useEffect(()=>{
     fetchTodo();
  },[])

  const fetchTodo = async ()=>{

    try{
      const list =  await todoList()
      console.log(list.data);
      setTask(list.data)
      
    }catch(err){
      return err
    }
    
  }
  const handleSearch = async ()=>{
    try{
        const addtask = await addTodoList(userInput)
        fetchTodo()
    }catch(err){
        console.log(err);
        
    }
  
  }

  const deleteTodo = async (id)=>{

    try{
      await deleteTodoList(id)
      fetchTodo()
    }catch(err){
      console.log(err);
      
    }
    
  }

  const updateTask = async (item,completedValue)=>{
      const updated = task.find(i=>i.id == item.id)
      console.log(updated);
      
      if(updated){
        //setUpTask({...updated,userInput:{...updated.userInput,completed:completedValue}})
        const newTask = {
      ...updated,
      userInput: {
        ...updated.userInput,
        completed: completedValue
      }
    };
    try{
        const updatedTask = await editTodoList(newTask.id,newTask.userInput);
        setTask(updatedTask.data)
        fetchTodo()
      }catch(err){
        console.log(err);
        
      }
        
      }
      
  }
  
  return (
   <>
   <div className='d-flex justify-content-center align-items-center flex-column'>
     <h1 className='text-center text-primary'>Todo App</h1>
     <div className='d-flex'>
       <input type="text" className='form-control' onChange={(e)=>setUserInput({...userInput,name:e.target.value})} />
       <button className='btn btn-primary ms-5' onClick={handleSearch}>ADD</button>
     </div>
   </div>


    



 <div className='d-flex justify-content-center align-items-center mt-5'>
    <div className="card" style={{width: "500px",height:"auto"}}>
    
      {
        task?.length>0 ?(task?.map(item=>(
              <div className="card-body">
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <h5 className="card-text"><input type="checkbox" value={item.userInput.completed} checked={item.userInput.completed} onChange={(e)=>updateTask(item,e.target.checked)}/></h5>
          {
            item.userInput.completed  ? (<h5 className="card-title"><del>Task:{item.userInput.name}</del></h5>):(<h5 className="card-title">Task:{item.userInput.name}</h5>)
          }
          
        </div>
        <h5><button className='btn btn-primary' onClick={()=>deleteTodo(item.id)}><i className="fa-solid fa-trash"></i></button></h5>
      </div>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
            ))):(
              <p className='text-center'>No tasks todo</p>
            )
            
          
      }
  </div>
 </div>
   
   </>
  )
}

export default App
