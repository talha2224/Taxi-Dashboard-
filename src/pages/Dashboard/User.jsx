import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import config from '../../config'
import toast from 'react-hot-toast';
import { formatReadableDate } from '../../helpers/function';
import CreateUserPopup from '../../components/dashboard/popups/CreateUserPopup';
import Tippy from '@tippyjs/react';
import UpdateUserPopup from '../../components/dashboard/popups/UpdateUserPopup';
import Pagination from '../../components/dashboard/Pagination';

const User = () => {
    let thStyle = " py-2 px-4 text-left text-sm font-normal text-nowrap text-[#030229]"

    const [createUserModel, setCreateUserModel] = useState(false)
    const [updateUserModel, setUpdateUserModel] = useState(false)
    const [userInfo, setUserInfo] = useState({ username: "", email: "", sharedCompanies: [], accountId: "" })
    const [userData, setUserData] = useState([])
    const [paginatedData, setPaginatedData] = useState([]);
    const [companyData, setCompanyData] = useState([])
    const userId = localStorage.getItem("accountId")
    const handleDataChange = (data) => {
        setPaginatedData(data);
    };
    const fetchInitialData = async () => {
        try {
            let subusers = await axios.get(`${config.baseUrl}/account/all/`)
            setUserData(subusers.data?.data)
        }
        catch (error) {
            toast.error("Failed To Fetch companies")
        }
    }
    const toogleUser = async (accountId, toogle) => {
        try {
            let res = await axios.post(`${config.baseUrl}/account/toogle-account`, { accountId, toogle })
            if (res.data) {
                toast.success(res?.data?.msg)
                fetchInitialData()
            }
        }
        catch (error) {
            toast.error("Something went wrong contact support")
        }
    }

    useEffect(() => {
        fetchInitialData()
    }, [createUserModel, updateUserModel])



    return (

        <div>


            {/* HEADER  */}

            <div className='flex justify-start md:justify-end items-center gap-x-4 flex-wrap'>


                <div className='bg-[#fff] border rounded-md py-2 px-3 flex items-center justify-between w-fit sm:w-[16rem] mt-2 '>
                    <input type="text" placeholder='Search' className='w-[100%] sm:w-[12rem] rounded-md mr-3 outline-none border-none bg-transparent' />
                    <CiSearch />
                </div>



            </div>


            {/* TABLE */}

            {
                userData?.length > 0 ?
                    <div className="rounded-md min-w-[100%] flex-1 mt-6 overflow-x-auto">
                        <div className="overflow-x-auto w-full">
                            <table style={{ borderSpacing: "0 10px" }} className="min-w-[100%] border-separate ">
                                <thead className='bg-[#ececec] h-[3rem]'>
                                    <tr>
                                        <th className={thStyle}>Id</th>
                                        <th className={thStyle}>User Name</th>
                                        <th className={thStyle}>User Email</th>
                                        <th className={thStyle}>Phone Number</th>
                                        <th className={thStyle}>Role</th>
                                        <th className={thStyle}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData?.map((user, index) => (
                                        <tr style={{ borderRadius: "1rem" }} key={index} className="bg-white text-sm font-normal pb-4 h-[3rem]">
                                            <td className="py-2 px-4 text-sm text-nowrap">{user?._id}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user.username}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user.email}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user.phone}</td>
                                            <td className="py-2 px-4 text-sm text-nowrap">{user.role}</td>
                                            <td className='py-2 px-4'>
                                                <div className='flex items-center gap-x-2'>
                                                    <button onClick={() => { toogleUser(user?._id,!user?.accountBlocked) }} className={`${user.accountBlocked ?"bg-[#008000]":"bg-red-500"} text-xs text-white px-2 rounded-[0.3rem] text-nowrap h-[2rem]`}>{user?.accountBlocked?"Activate":"Block"}</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination data={userData} itemsPerPageOptions={[5, 10, 15, 20]} onDataChange={handleDataChange}/>

                    </div>
                    :
                    <div className='h-[50vh] flex justify-center items-center'>
                        <h1 className='text-[#000] text-sm mt-4 text-center flex-1'>Oops ! No Users Found</h1>
                    </div>
            }






        </div>

    )
}

export default User