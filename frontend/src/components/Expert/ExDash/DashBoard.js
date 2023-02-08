import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import ExNavbar from "../../../pages/Experts/ExNavbar";
import axios from "../../../api/axios";

function Profile() { 

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [expert,setExpert] = useState('')
    const details = useSelector((state) => state.admin.expertDetails)
    // console.log(details);
    // setUser(details)
     
    async function expertDetails(){
        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: details,
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.get('/expert/getExpert',config)
            console.log(res.data.data);
            setExpert(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        expertDetails()
    },[])

    const addClick = () => {
        navigate("/experts/edit-profile",{state:expert})
    }


    return (
        <div>
            <ExNavbar/>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"></link>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>
            <div className="pt-16 bg-blueGray-50">
                <div className="w-full lg:w-4/12 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img alt="..."
                                            src={
                                               expert.image
                                            }
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"></img>

                                    </div>
                                </div>
                                <div className="w-full px-4 text-center mt-20">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                                </div>
                            </div>
                            <div className="">
                                <div className="text-center mt-12 ">
                                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 uppercase">
                                        {
                                        expert.name
                                    } </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        {
                                       expert.serviceLocation
                                    } </div>
                                     <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                       <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        {
                                       expert.serviceType
                                    } </div>
                                     <div className="mb-2 text-blueGray-600 mt-3">
                                     <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        {
                                        expert.address
                                    } </div>
                                    <div className="mb-2 text-blueGray-600 mt-3">
                                        <i className="fa fa-phone mr-2 text-lg text-blueGray-400"></i>
                                        {
                                        expert.phone
                                    } </div>


                                </div>
                            </div>

                        </div>
                        <button type="submit"
                            onClick={
                                () => addClick()
                            }
                            className="text-white  bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">

                            Edit Details
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Profile;
