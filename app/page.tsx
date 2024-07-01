"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Utils from "@/lib/utils"
import * as Constant from "@/lib/constants";
import { FaArrowLeft } from "react-icons/fa";
import Header from "./ui/layout/Header";
import Footer from "./ui/layout/Footer";
import AppWrapper from "./ui/AppWrapper";
import { MainUiProvider } from "./contexts/MainUiContext";
import { AuthProvider } from "./contexts/AuthContext";
import Category from "./lib/schemas/Category.schema";
import { CategoryProvider } from "./contexts/CategoryContext";
import { BudgetProvider } from "./contexts/BudgetContext";

export default function Home() {


	return (
		<main >
			  <MainUiProvider>
				<AuthProvider>
					<Header />
					<AppWrapper />
					<Footer />
				</AuthProvider>
			</MainUiProvider>
		</main>

	)
}
