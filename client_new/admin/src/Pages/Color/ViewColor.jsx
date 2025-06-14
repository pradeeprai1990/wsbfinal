import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { apiBaseUrl } from '../../Config';
import ResponsivePagination from 'react-responsive-pagination';
// import { MdModeEditOutline } from "react-icons/md";

export default function ViewCategory() {
  const [currentPage, setCurrentPage] = useState(1);

  let [title,setTitle]=useState('')
  // let [orderModal, setOrderModal] = useState(false);
  let [colorList, setColorList] = useState([])
  let [delAllids,setAlldelIds]=useState([])
  let [totalPage,setTotalPage]=useState(0) 
  let [activeFilter, setactiveFilter] = useState(true);

  let getColor = () => {
    axios.get(`${apiBaseUrl}/color/view`,{
      params:{
        title,
        currentPage
      }
    })
      .then((res) => res.data)
      .then((finalres) => {
        setColorList(finalres.colorData)
        setTotalPage(finalres.pages) //3
      })
  }

  useEffect(() => {
    getColor()
  }, [title,currentPage])

  //delAllids =[1,2,3]
  let getAllCheckValue=(event)=>{
      if(event.target.checked){
        //event.target.value    = 4
          if(!delAllids.includes(event.target.value)){
            setAlldelIds([...delAllids,event.target.value])
                          //[1,2,3,4]
          }
          
      }
      else{   
         // delAllids=[1,2,3,4,5]
        let filterData=delAllids.filter((v)=>v!=event.target.value) //[1,2,3,5]
        setAlldelIds(filterData)
      }

  }

  let multiDelete=()=>{
    let obj={
      ids:delAllids
    }
    axios.post(`${apiBaseUrl}/color/delete`,obj)
    .then((res) => {
      getColor()
    })
  }

  useEffect(()=>{
      console.log(delAllids)
  },[delAllids])


  let searchData=(event)=>{
    event.preventDefault()
    getColor()

  }
  return (
    <section className="w-full">

      <Breadcrumb path={"Color"} link={"/colors/view-color"} path2={"View"} slash={"/"} />

      <div className={`bg-gray-50 px-2 py-5 max-w-[1220px] duration-[1s] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form onSubmit={searchData} className="flex max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              onChange={(e)=>setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search  name..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>


      </div>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Color
            </h3>
            <div className='flex justify-between '>
              <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer text-white mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
              </div>

              <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={multiDelete}>Delete </button>
            </div>
          </div>
          <div className="border border-t-0 rounded-b-md border-slate-400">

            {/* border-2 border-[red] */}
            <div className="relative overflow-x-auto">


              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input  id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Sr No
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Color Name
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Code
                      </th>
                      <th scope="col" class=" w-[8%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[11%]">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {colorList.length >= 1
                      ?
                      colorList.map((items, index) => {
                        return (
                          < tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                              <div class="flex items-center">
                                <input id="checkbox-table-search-1"
                                value={items._id}
                                onChange={getAllCheckValue}
                                
                                type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                              </div>
                            </td>
                            <th>
                                { (currentPage-1)*3 + index+1}
                            </th>
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                              <div class="py-4">
                                <div class="text-base font-semibold">
                                  {items.colorName}
                                  
                                 
                                </div>

                              </div>
                            </th>
                            <td class=" py-4">
                            {items.colorCode}
                            </td>
                            <td class=" py-4">
                            {items.colorOrder}
                            </td>
                            <td class=" py-4">

                          {items.colorStatus ?
                              <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Active</button>
                              :
                              <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">DeActive</button>
                          } 

                              
                            </td>
                            <td class=" py-4">

                              <Link to={`/color/update/${123}`} >
                                <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                  <MdModeEdit className='text-[18px]' />
                                </div>
                              </Link>
                            </td>
                          </tr>
                        )
                      })

                      :
                      <tr>
                        <td>No Data Found</td>
                      </tr>

                    }





                  </tbody>
                </table>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPage}
                  onPageChange={setCurrentPage}
               />
              </div>


            </div>

          </div>
        </div>
      </div>



    </section >
  )
}
