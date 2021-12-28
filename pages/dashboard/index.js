
import {useEffect, useState,useRef} from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
export default function Dashboard(){
    const menu = useRef(null);
	const router  = useRouter();

	const [blogs, setBlogs]  = useState([])
	useEffect(()=>{
		getAllBlogs()
	},[])
    function toggleSideBar(){
        console.log(menu.current.classList.toggle('hidden'))
    }
	async function getAllBlogs(){
		try{
			const response = await fetch('http://159.100.241.165:8000/api/v1/blog/blogs?skip=0&limit=100',{
				method: 'GET',
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
				setBlogs(data)
			}else{
				throw 'Error in creating category'
			}
			}catch(error){
			  console.log(error)
			}
	}
	async function deleteBlog(uid){
		try{
			const response = await fetch(`http://159.100.241.165:8000/api/v1/blog/blog/${uid}`,{
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
				getAllBlogs()
			}else{
				throw 'Error in deleting blog'
			}
			}catch(error){
			  console.log(error)
			}
	}
    return <div className="wrapper h-screen ">
		<nav className="bg-white shadow-lg">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							<a href="#" className="flex items-center py-4 px-2">
								<img src="/code-break.svg" alt="Logo" className="h-8 w-8 mr-2" />
								<span className="font-semibold text-gray-500 text-lg">My Blog</span>
							</a>
						</div>
						<div className="hidden md:flex items-center space-x-1">
						<Link href="/dashboard/tag"><a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Create tag</a></Link>
						<Link href="/dashboard/category"><a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Create category</a></Link>	
						<Link href="/dashboard/blog"><a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Create blog</a></Link>	
						</div>
					</div>
					<div className="md:hidden flex items-center">
						<button  className="outline-none mobile-menu-button" onClick={toggleSideBar}>
						<svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<div  ref={menu} className="hidden mobile-menu">
				<ul className="m-3">
					<li className={router.pathname == "/dashboard/tag" ? "bg-sky-400 text-white" : "m-3 p-1"}><Link href="/dashboard/tag" className="block text-sm px-2 py-4  transition duration-300">Create tag</Link></li>
					<li className={router.pathname == "/dashboard/category" ? "bg-sky-400 text-white" : "m-3 p-1"}><Link href="/dashboard/category" className="block text-sm px-2 py-4  font-semibold">Create category</Link></li>
					<li className={router.pathname == "/dashboard/blog" ? "bg-sky-400 text-white" : "m-3 p-1"}><Link href="/dashboard/blog" className="block text-sm px-2 py-4  transition duration-300">Create blog</Link></li>
				</ul>
			</div>
            </nav>
        <main className='h-screen bg-sky-50 max-h-screen overflow-auto'>
            <section>
					<div className="row">
						{blogs?.map((item)=><div key={item.uid} className="column p-1">
							<div className="card m-1" >
								<span onClick={()=>deleteBlog(item.uid)} className='float-right font-bold cursor-pointer'>X</span>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
							<p>{item.user.first_name}</p>
							</div>
						</div>)}
					</div>
            </section>
        </main>
    </div>
}