import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../Config";

export default function AddCategory() {

  let [imagePre,setImagePre]=useState('https://upload.wikimedia.org/wikipedia/commons/e/ea/No_image_preview.png')

  let {id}=useParams();

  let [categoryName,setCategoryName]=useState('')
  let [order,setOrder]=useState(null)

  let navigate=useNavigate()
  useEffect(() => {
      $(".dropify").dropify({
        messages: {
          default: "Drag and drop ",
          replace: "Drag and drop ",
          remove: "Remove",
          error: "Oops, something went wrong"
        }
      });
  }, []);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // update work


  let saveCategory=(event)=>{
    event.preventDefault()
    let myData=new FormData(event.target)

    if(id){
        //Update
        axios.put(`${apiBaseUrl}/category/update/${id}`,myData)
        .then((res)=>{
          if(res.data.status){
             navigate("/category/view") 
           }  
        })
    }
    else{
      axios.post(`${apiBaseUrl}/category/insert`,myData)
      .then((res)=>{
        if(res.data.status){
         navigate("/category/view") 
        }
        else if(res.data.error.code==11000){
          alert(res.data.msg)
        }
        
      })
    }
    
   
  }

  useEffect(()=>{
    if(id){
        axios.get(`${apiBaseUrl}/category/edit-row-data/${id}`)
        .then((res)=>res.data)
        .then((finalres)=>{
          setCategoryName(finalres.category.categoryName)
          setOrder(finalres.category.categoryOrder)
          setImagePre(finalres.staticPath+finalres.category.categoryImage)
        })
    }
    else{
        setCategoryName('')
        setOrder('')
        setImagePre('https://upload.wikimedia.org/wikipedia/commons/e/ea/No_image_preview.png')
    }
    
  },[id])

 

  return (
    <section className="w-full">
       <nav className="flex border-b-2" aria-label="Breadcrumb">
            <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center ">
                <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  /
                  <Link to={"/category/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Category</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  /
                  <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">
                    
                    {id ? "Update" : "Add"}
                    
                    
                    </span>
                </div>
              </li>
            </ol>
          </nav>
      
      
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {id ? "Update Category" : "Add Category"}  
          </h3>
          <form onSubmit={saveCategory} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">

              <img src={imagePre} width={"100%"} className="h-[200px]" alt="" />

                <label
                  
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="categoryImage"
                  onChange={(event)=>{
                    setImagePre(URL.createObjectURL(event.target.files[0]))
                  }}
              
                
                />
                
              </div>
              <div className="w-2/3">
                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e)=>setCategoryName(e.target.value)}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                 
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={order}
                    onChange={(e)=>setOrder(e.target.value)}
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                 
                </div>
                
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
             {id ? "Update Category" : "Add Category"}  
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
