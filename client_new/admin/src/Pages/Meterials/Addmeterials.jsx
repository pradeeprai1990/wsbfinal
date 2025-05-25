
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../Config";
import axios from "axios";

export default function Addmaterials() {
  let navigate=useNavigate()
  // update work
  const [updateIdState,setUpdateIdState]=useState(false)
  let updateId=useParams().id
  useEffect(()=>{
    if(updateId==undefined){
      setUpdateIdState(false)
    }
    else{
      setUpdateIdState(true)
    }
  },[updateId])

 let meterialSave=(event)=>{
  event.preventDefault()
    let  materialName=event.target.materialName.value;
    
    let  materialOrder=event.target.materialOrder.value;
    let obj={
       materialName,
      
       materialOrder

    }
    axios.post(`${apiBaseUrl}/material/insert`,obj)
    .then((res)=>{
      console.log(res.data)
      event.target.reset()
      navigate('/material/view') //
      setColor('')
    })
 }

  return (
    <section className="w-full">
      <Breadcrumb path={"Material"} path2= {updateIdState ? "Update" : "Add"}  slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Material" : "Add Material"}  
          </h3>
          <form onSubmit={meterialSave}  autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            
              <div className="">
                <div className="mb-5">
                  <label
                    htmlFor="Name"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                   
                    id="Name"
                    name="materialName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Material Name"
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
                      name="materialOrder"
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                 
                </div>
              </div>
           
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
             {updateIdState ? "Update Material" : "Add Material"}  
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
