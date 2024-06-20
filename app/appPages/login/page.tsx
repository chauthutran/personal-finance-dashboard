"use client";

import LoginForm from "@/ui/auth/LoginForm";
import Footer from "@/ui/layout/Footer";
import Header from "@/ui/layout/Header";

export default function LoginPage() {
	return (
		<>
			<Header />

			<LoginForm />
			
			<Footer />
		</>
	)
}