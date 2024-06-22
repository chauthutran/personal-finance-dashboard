"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./features/store";
import * as Utils from "@/lib/utils"
import * as Constant from "@/lib/constants";
import { FaArrowLeft } from "react-icons/fa";
import useAppHook from "./features/hooks";
import Header from "./ui/layout/Header";
import Footer from "./ui/layout/Footer";
import AppWrapper from "./ui/AppWrapper";

export default function Home() {

	return (
		<main >
			<Header />

			{/* <div className="m-1 grid h-[calc(100vh-120px)] flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2"> */}
			{/*  */}
				<AppWrapper />
			{/* </div> */}

			<Footer />
		</main>

	)
}
