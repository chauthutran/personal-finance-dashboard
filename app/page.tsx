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
import HomePage from "./appPages/page";

export default function Home() {

	return (
		<main >
			<Header />

			<HomePage />	

			<Footer />
		</main>

	)
}
