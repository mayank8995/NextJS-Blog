import ListForm from './listForm'
import List from './list'
import React, {useEffect, useState} from 'react'
export default function Category(){
    const [category, setcategory ] = useState([]);
    const [uid, setUid] = useState('');
    useEffect(()=>{
      getAllCategories()
    },[])
  const addCategory = (userInput) => {
    console.log("userInput>>>>",userInput)
    createCategory(userInput)
  }

  async function createCategory(userInput){
    try{
      const response = await fetch('http://159.100.241.165:8000/api/v1/blog/category',{
          method: 'POST',
          body:JSON.stringify({name:userInput,description:userInput}),
          headers: {
          'Content-Type':'application/json',
          'access-control-allow-credentials': true, 
          'access-control-allow-origin': '*',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          }
      })
      console.log(response.status)
      if(response.status === 201){
          const data = await response.json()
          console.log("data>>>",data)
          setcategory((prevItem)=>[data,...prevItem])
      }else{
          throw 'Error in creating category'
      }
      }catch(error){
        console.log(error)
      }
  }
  async function getAllCategories(){
    try{
            const response = await fetch('http://159.100.241.165:8000/api/v1/blog/categories?skip=0&limit=100',{
                method: 'GET',
                headers: {
                'Content-Type':'application/json',
                'access-control-allow-credentials': true, 
                'access-control-allow-origin': '*'
                }
            })
            console.log(response.status)
            if(response.status === 200){
                const data = await response.json()
                console.log("data>>>",data)
                setcategory(data)
            }else{
                throw 'Error in fetching categories data'
            }
    }catch(error){
        console.log(error)
    }
}

    async function deleteCategory(uid){
        try{
            const response = await fetch(`http://159.100.241.165:8000/api/v1/blog/category/${uid}`,{
                method: 'DELETE',
                headers: {
                'Content-Type':'application/json',
                'access-control-allow-credentials': true, 
                'access-control-allow-origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            console.log(response.status)
            if(response.status === 200){
                const data = await response.json()
                console.log("data>>>",data)
                getAllCategories()
            }else{
                throw 'Error in deleting category'
            }
    }catch(error){
        console.log(error)
    }
    }
    return <React.Fragment>
        <div className='h-screen bg-sky-50 flex flex-col items-center justify-start'>
        <ListForm addItem={addCategory}/>
        <List list={category} deleteList={deleteCategory}/>
        </div>
        
    </React.Fragment>
}