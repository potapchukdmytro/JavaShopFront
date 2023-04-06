import React from "react";
import {useSelector} from "react-redux";
import {IAuthUser} from "../auth/types";

const ProfilePage: React.FC = () => {
    const {user} = useSelector((store: any)=> store.auth as IAuthUser);

    return (
        <>
            <div className="w-full lg:w-4/12 px-4 mx-auto">
                <div
                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4 flex justify-center">
                                <div className="relative">
                                    <img
                                        alt="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                                        src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                                </div>
                            </div>
                            <div className="w-full px-4 text-center mt-20">
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                {user?.email}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold">
                                <i className="mr-2 text-lg">Role: </i>
                                {user?.roles}
                            </div>
                            <div className="mb-2 text-blueGray-600 mt-3">
                                <i className="mr-2 text-lg">Phone: </i>
                                {user?.phone}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;