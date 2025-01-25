import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import config from '../../config'
import toast from 'react-hot-toast';
import TranscriptPopup from '../../components/dashboard/popups/TranscriptPopup';
import Tippy from '@tippyjs/react';
import CreateCompanyPopup from '../../components/dashboard/popups/CreateCompanyPopup';
import UpdateCompanyPopup from '../../components/dashboard/popups/UpdateCompanyPopup';
import Pagination from '../../components/dashboard/Pagination';
import { formatReadableDate } from '../../helpers/function';
let thStyle = " py-2 px-4 text-left text-sm font-normal text-nowrap text-[#030229]"

const Companies = () => {
    const [bookingData, setBookingData] = useState([])
    const userId = localStorage.getItem("accountId")

    const fetchInitialData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/booking/all`)
            console.log(res.data?.data,'res.data?.data')
            setBookingData(res.data?.data)
        }
        catch (error) {
            toast.error("Failed To Fetch companies")
        }
    }
    useEffect(() => {
        fetchInitialData()
    }, [])




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
                bookingData?.length > 0 ?
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-[800px] border-collapse overflow-x-auto"> {/* Ensure table is wide enough */}
                            <thead>
                                <tr>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Booking Id</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Rider Name</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Driver Name</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Pickup Address</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Drop Off Address</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Status</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Booking Date</th>
                                    <th className="border-b py-2 px-4 text-left text-sm font-normal text-nowrap">Ride Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingData?.map((data, i) => {

                                    // console.log(data,'data')
                                    if (i < 4) {
                                        return (
                                            <tr key={data._id} className="border-b hover:bg-gray-100 text-sm font-normal">
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?._id}</td>
                                                <td className="py-2 px-4 flex items-center text-sm font-normal text-nowrap">{data?.rider?.username}</td>
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.driver?.username}</td>
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.pickUpAddress}</td>
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.dropoffAddress}</td>
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap"><button className={`${data?.status?.toLowerCase()?.includes("completed") ? "bg-[#4285F4]" : data?.leadStatus?.toLowerCase()?.includes("lost") ? "bg-red-500" : "bg-green-500"} text-xs text-white px-2 rounded-[0.3rem] text-nowrap py-1`}>{data?.status}</button></td>
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap">{formatReadableDate(data?.createdAt)}</td>
                                                <td className="py-2 px-4 text-sm font-normal text-nowrap">{data?.fare ? "$ " + data?.fare : "-"}</td>
                                            </tr>

                                        )
                                    }
                                }
                                )}
                            </tbody>
                        </table>
                    </div> :
                    <p className='text-[#000] text-sm mt-4  flex-1 text-center'>Oops ! No Booking Found</p>
            }





        </div>

    )
}

export default Companies