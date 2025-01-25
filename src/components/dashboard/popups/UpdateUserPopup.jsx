import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import config from '../../../config';

const UpdateUserPopup = ({ userInfo, setUserInfo, closeModel, companyData }) => {


  const handleAssignCompany = (companyId) => {
    setUserInfo((prev) => {
      const isAlreadyAssigned = prev.sharedCompanies.includes(companyId);
      return { ...prev, sharedCompanies: isAlreadyAssigned ? prev.sharedCompanies.filter((id) => id !== companyId) : [...prev.sharedCompanies, companyId], };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let loader = toast.loading("Updating user...")
      let res = await axios.put(`${config.baseUrl}/account/update/${userInfo?.accountId}`, { ...userInfo })
      if (res.data) {
        toast.dismiss(loader)
        toast.success(res?.data?.msg)
        setUserInfo({ email: "", username: "", sharedCompanies: [] })
        closeModel(false)
      }
    }
    catch (error) {
      toast.dismiss(loader)
      toast.error(error.response?.data?.msg ? error.response?.data?.msg : "Failed to create user")
    }
  };


  return (

    <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out" onClick={() => closeModel(false)}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-medium mb-4">Create New User</h2>

        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="companyName" className="text-sm mb-2 block">User Name</label>
          <input type="text" id="companyName" name="username" value={userInfo.username} onChange={handleInputChange} placeholder="User Name" className="w-full px-3 py-2 border disabled rounded-md focus:outline-none text-sm" />
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="description" className="text-sm mb-2 block">User Email</label>
          <input type='email' id="description" name="email" value={userInfo.email} disabled onChange={handleInputChange} placeholder="User Email" className="w-full px-3 py-2 border rounded-md focus:outline-none text-sm" />
        </div>


        {/* Company Selection */}
        <div className="mb-4">
          <label htmlFor="users" className="text-sm mb-2 block">Assign Companies</label>
          <div className="space-y-2">
            {companyData?.map(company => (
              <div key={company?._id} className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" value={company._id} checked={userInfo.sharedCompanies.includes(company._id)} onChange={() => handleAssignCompany(company._id)} className="mr-2 text-sm" />{company.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-gray-300 rounded-md mr-2 text-sm" onClick={() => closeModel(false)}>Cancel</button>
          <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm" onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
    
  )
}

export default UpdateUserPopup