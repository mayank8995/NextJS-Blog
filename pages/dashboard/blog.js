import { useEffect } from "react"
import { useState } from "react/cjs/react.development"


export default function Blog(){
        const [tagsList, setTags] = useState([])
        const [categoryList, setCategories] = useState([])
        const [title, setTitle] = useState()
        const [description, setDescription] = useState()
        const [tag, setTag] = useState("")
        const [category, setCategory] = useState("")
        useEffect(()=>{
            getAlltags()
            getAllCategories()
        },[])
    async function getAlltags(){
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
                    throw 'Error in fetching tag data'
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
                    setCategories(data)
                }else{
                    throw 'Error in fetching categories data'
                }
        }catch(error){
            console.log(error)
        }
    }
    function handleSubmit(e){
        createBlog()
        e.preventDefault()
    }

    async function createBlog(){
        try{
            const response = await fetch('http://159.100.241.165:8000/api/v1/blog/blog',{
                method: 'POST',
                body:JSON.stringify({title,body:description,featured_image:'https://res.cloudinary.com/simply-jet-sa/image/upload/v1640607643/uthvzdi0u2cjowzc6p41.jpg',is_featured:false,cat_id:category,tags:[tag]}),
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
                // setCategories(data)
            }else{
                throw 'Error in fetching categories data'
            }
    }catch(error){
        console.log(error)
    }
    }

    return <div className=" bg-sky-50 h-screen flex flex-row items-center justify-center">
        <section>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
               
 <div className="min-h-screen p-6 ">
  <div className="max-w-md mx-auto">
  <label htmlFor="title" className="font-semibold block py-2 mr-auto">Title</label>
                <input onChange={(e)=>setTitle(e.target.value)} name="title" className="mr-auto w-full"/>
                <label htmlFor="description" className="font-semibold block py-2 mr-auto">Description</label>
                <textarea onChange={(e)=>setDescription(e.target.value)} title="description" className="ml-auto" rows="10" cols="40"/>
                <label htmlFor="category" className="font-semibold block py-2">Category</label>
                <select className="w-6/12" name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option >Select a category</option>
                    {categoryList?.map((item) => <option value={item.uid} key={item.id}>{item.name}</option>)}
                </select>
                <label htmlFor="tag" className="font-semibold block py-2">Tag</label>
                <select className="w-6/12" name="tag" onChange={(e)=>setTag(e.target.value)}>
                <option >Select a tag</option>
                    {tagsList?.map((item)=><option key={item.id} value={item.uid}>{item.name}</option>
                    )}
                </select>
  </div>
  <button className="m-4 ml-auto bg-sky-400 text-white p-1" type="submit">Create</button>
</div>
               
            </form>
        </section>
    </div>
}