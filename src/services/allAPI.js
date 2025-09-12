import baseurl from "./baseUrl";
import commonAPI from "./commonAPI";

export const todoList = async ()=>{

    return await commonAPI("GET",`${baseurl}`,{})
}

export const addTodoList = async (userInput)=>{
    return await commonAPI("POST",`${baseurl}`,{userInput})
}
 export const deleteTodoList = async (id)=>{
    return await commonAPI("DELETE",`${baseurl}/${id}`,{})
 }
 export const editTodoList = async (id,userInput)=>{
    return await commonAPI("PUT",`${baseurl}/${id}`,{userInput})
 }
