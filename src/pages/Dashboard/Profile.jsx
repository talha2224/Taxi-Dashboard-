import React, { useEffect, useState, useRef } from 'react';
import AvatarIcon from '../../assets/dashboard/avatar.jpg';
import config from '../../config';
import axios from 'axios';
import toast from 'react-hot-toast';

let inputStyle = "px-3 min-w-[100%] sm:min-w-[28rem] sm:max-w-[28rem] h-[2.4rem] border border-[#DCDADB] bg-transparent outline-none block rounded-md mt-2 cursor-not-allowed";

const Profile = () => {
    const [data, setData] = useState(null);
    const userId = localStorage.getItem("accountId");
    const fileInputRef = useRef();

    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/account/single/${userId}`);
            setData(res.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadPicture = async (file) => {
        let loader = await toast.loading("Uploading Image");
        const formData = new FormData();
        formData.append("image", file);

        try {
            let res = await axios.put(`${config.baseUrl}/account/profile/${userId}`, formData);
            if (res?.data) {
                toast.remove(loader);
                toast.success(res?.data?.msg);
                fetchData(); // Refresh the user data to show the updated profile picture
            }
        } catch (error) {
            toast.remove(loader);
            toast.error("Failed To Change Image");
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadPicture(file);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='flex-1 bg-white md:h-[80vh] mt-3 rounded-lg shadow-2xl flex flex-col'>
            <div style={{ background: 'linear-gradient(to bottom, #FF6600, #FDBA74)' }} className='w-[100%] h-[6rem] rounded-tr-lg rounded-tl-lg relative'>
                <div className='flex items-center gap-x-2 cursor-pointer absolute left-6 top-7'>
                    <h1 className='text-white text-xl font-bold'>Taxi Dashboard</h1>
                </div>
            </div>

            <div className='p-5 flex-1 flex justify-center items-center flex-col'>
                <div className='w-[100%] md:flex justify-between items-center mb-5'>
                    <div className='flex items-center gap-x-5'>
                        <img src={data?.profile ? data?.profile : AvatarIcon} alt="" className='w-[4rem] h-[4rem] rounded-full bg-center cursor-pointer' onClick={handleImageClick}/>
                        <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange}/>
                        <div>
                            <p className='text-lg mb-1 font-semibold'>{data?.username}</p>
                            <p className='text-sm truncate'>{data?.email}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-x-2 flex-wrap md:mt-0 mt-2'>
                        <p>Free Calls: {data?.freeCalls}</p>
                        <div className='bg-slate-400 w-[0.1px] h-[2rem]'></div>
                        <p>Current Balance: ${data?.currentBalance}</p>
                        <div className='bg-slate-400 w-[0.1px] h-[2rem]'></div>
                        <div className='flex items-center gap-x-2'>
                            <p>Plan: </p>
                            <button className='bg-[#FF6600] text-white px-2 py-1 rounded-md text-sm'>
                                {data?.activePlan == 0.20 ? "Basic" : data?.activePlan == 0.23 ? "Pro" : "Enterprise"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className='w-[100%] flex items-center gap-x-5 mb-2 flex-wrap justify-between'>
                    <div className='mt-2 flex-1'>
                        <p>Username</p>
                        <input type="text" value={data?.username} className={inputStyle} readOnly />
                    </div>
                    <div className='mt-2 flex-1'>
                        <p>Email</p>
                        <input type="text" value={data?.email} className={inputStyle} readOnly />
                    </div>
                </div>

                <div className='w-[100%] flex items-center gap-x-5 mb-2 flex-wrap justify-between'>
                    <div className='mt-2 flex-1'>
                        <p>Free Calls</p>
                        <input type="number" value={data?.freeCalls} className={inputStyle} readOnly />
                    </div>
                    <div className='mt-2 flex-1'>
                        <p>Email</p>
                        <input type="text" value={data?.email} className={inputStyle} readOnly />
                    </div>
                </div>

                <div className='w-[100%] flex items-center gap-x-5 mb-2 flex-wrap justify-between'>
                    <div className='mt-2 flex-1'>
                        <p>Successful Leads</p>
                        <input type="number" value={data?.leadsClosed} className={inputStyle} readOnly />
                    </div>
                    <div className='mt-2 flex-1'>
                        <p>Failed Leads</p>
                        <input type="number" value={data?.failedLeads} className={inputStyle} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
