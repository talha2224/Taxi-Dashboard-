import {FaAddressBook, FaBuilding, FaCalendarAlt, FaRegCalendarCheck, FaUser } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { IoIosCall } from "react-icons/io";
import { MdModeOfTravel } from 'react-icons/md';
import { IoCarSportSharp } from 'react-icons/io5';

export const navData = [
    {
        id: 1,
        link: "home",
        name: "Dashboard",
        icon: <RxDashboard />
    },
    {
        id: 3,
        link: "contacts",
        name: "Categories",
        icon: <IoCarSportSharp />
    },
    {
        id: 7,
        link: "users",
        name: "Users",
        icon: <FaUser />
    },
    {
        id: 4,
        link: "companies",
        name: "Bookings",
        icon: <MdModeOfTravel />
    },
];
