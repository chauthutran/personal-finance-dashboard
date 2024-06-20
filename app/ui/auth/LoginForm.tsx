/** The login page for user authentication. Contains the LoginForm component. */

import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from '@/lib/constants';
import * as api from '@/api';
import useAppHook from "@/features/hooks";

export default function LoginForm() {

  const { statusData, login, setMainUi } = useAppHook();

  const [username, setUsername] = useState("test1");
  const [password, setPassword] = useState("1234");

  useEffect(() => {
    if( statusData.status != Constant.LOGIN_SUCCESS ) {
      setMainUi(Constant.UI_CLIENT_LIST);
    }
  },[statusData])

  const loginBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    login(username, password);
  };

  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                required
                onChange={(e) => { setUsername(e.target.value) }}
              />
              <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></CiUser>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Pin
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                required
                minLength={4}
                onChange={(e) => { setPassword( e.target.value ) }}
              />
              <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        <button onClick={(e) => loginBtnClick(e)} >
            Log in 
            {statusData.status == Constant.LOGIN_REQUEST && <FaSpinner  className="ml-auto h-5 w-5 text-gray-50" />}
        </button>
        <div className="flex h-8 items-end space-x-1">
          {statusData.status == Constant.LOGIN_FAILURE && <p>{statusData.message}</p>}
        </div>
      </div>
    </div>
  );
}
