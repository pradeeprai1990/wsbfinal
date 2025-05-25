import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../Config";
import axios from "axios";

export default function AddSubSubCategory() {
  let [parentCategory,setParentCategory]=useState([])
  let [subparentCategory,setSubParentCategory]=useState([])
  let apiBasePath =import.meta.env.VITE_APIBASEURL //http://localhost:8120/admin
  let getParentCategory=()=>{
    axios.get(`${apiBaseUrl}/sub-subcategory/parent-category`)
    .then((res)=>res.data)
    .then((finalRes)=>{
      setParentCategory(finalRes.categoryList)
    })
  }

  let getSubCaregory=(pid)=>{
    axios.get(`${apiBaseUrl}/sub-subcategory/sub-parent-category/${pid}`)
    .then((res)=>res.data)
    .then((finalRes)=>{
      setSubParentCategory(finalRes.subcategoryList)
    })
  }

  useEffect(()=>{
    getParentCategory()
  },[])

  const onSubmit = (event) => {
    event.preventDefault()
    let formValue=new FormData(event.target)

    axios.post(`${apiBasePath}/sub-subcategory/insert`,formValue)
    .then((res)=>{
      console.log(res.data)
    })

    
  };
  // update work
  const [updateIdState, setUpdateIdState] = useState(false)
  let updateId = useParams().id
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    }
    else {
      setUpdateIdState(true)
    }
  }, [updateId])

  return (
    <section className="w-full">
      <Breadcrumb path={"Sub Category"} path2={"Add Sub Category"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form onSubmit={onSubmit} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="categoryImage"
                  id="categoryImage"
                  className="dropify"
                  data-height="260"
                />
               
              </div>

              <div className="w-2/3">
                
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                  onChange={(e)=>getSubCaregory(e.target.value)}
                    name="parentCategory"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {parentCategory.length>=1
                      ?
                        parentCategory.map((items)=>{
                          return(
                            <option value={items._id}> {items.categoryName} </option>
                          )
                        })
                      :
                      ''
                    
                    }
                   
                    
                  </select>
                </div>
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Sub Category Name
                  </label>
                  <select
                    name="subparentCategory"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {subparentCategory.length>=1
                      ?
                      subparentCategory.map((items)=>{
                          return(
                            <option value={items._id}> {items.subcategoryName} </option>
                          )
                        })
                      :
                      ''
                    
                    }
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="subSubcategoryName"
                    id="categoryName" 
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
                    name="subSubcategoryOrder"
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
              {updateIdState ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
