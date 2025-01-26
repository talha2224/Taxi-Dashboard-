import { FaAddressBook, FaBuilding, FaCalendarAlt, FaRegCalendarCheck, FaUser } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { IoIosCall } from "react-icons/io";
import { MdModeOfTravel } from 'react-icons/md';
import { IoCarSportSharp } from 'react-icons/io5';

export const navData = [
    {
        id: 1,
        link: "home",
        name: "Tableau de bord",
        icon: <RxDashboard />
    },
    {
        id: 3,
        link: "contacts",
        name: "Catégories",
        icon: <IoCarSportSharp />
    },
    {
        id: 7,
        link: "users",
        name: "Utilisateurs",
        icon: <FaUser />
    },
    {
        id: 4,
        link: "companies",
        name: "Réservations",
        icon: <MdModeOfTravel />
    },
];
