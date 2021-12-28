
import ListForm from './listForm'
import List from './list'
import React, {useEffect, useState} from 'react'
export default function Tags(){
    const [tags, setTags ] = useState([]);
    useEffect(()=>{
        getAllTags()
    },[])
  const addtags = (userInput) => {
    createtags(userInput)
  }

  async function createtags(userInput){
    try{
      const response = await fetch('http://159.100.241.165:8000/api/v1/blog/tag',{
          method: 'POST',
          body:JSON.stringify({name:userInput}),
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
          setTags((prevItem)=>[data,...prevItem])
      }else{
          throw 'Error in creating tags'
      }
      }catch(error){
        console.log(error)
      }
  }
  async function getAllTags(){
    try{
            const response = await fetch('http://159.100.241.165:8000/api/v1/blog/tags?skip=0&limit=100',{
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
                setTags(data)
            }else{
                throw 'Error in fetching categories data'
            }
    }catch(error){
        console.log(error)
    }
}
        async function deleteCategory(uid){
            try{
                const response = await fetch(`http://159.100.241.165:8000/api/v1/blog/tag/${uid}`,{
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
                    getAllTags()
                }else{
                    throw 'Error in deleting tag'
                }
        }catch(error){
            console.log(error)
        }
        }
    return <React.Fragment>
        <div className='h-screen bg-sky-50 flex flex-col items-center justify-start'>
        <ListForm addItem={addtags}/>
        <List list={tags} deleteList={deleteCategory}/>
        </div>
    </React.Fragment>

}