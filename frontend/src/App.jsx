import React from 'react'
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from './pages/auth/LoginPage';
import StudentPage from './pages/StudentPage';
import AdminPage from './pages/AdminPage';

function App() {

	const { data: authUser} = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
		  try {
			const res = await fetch("/api/v1/auth/user");
			const data = await res.json();
			if (!res.ok || data.error) {
			  throw new Error(data.error || "Something went wrong");
			}
			console.log("authUser is here:", data);
			return data;
		  } catch (error) {
			console.error("Error fetching auth user:", error);
			return null;
		  }
		},
		retry: false,
	  });
	  
	  
	  return (
		<div>
		  <Routes>
			<Route path="/" element={!authUser ? <LoginPage/> : authUser.role === "admin" ? <AdminPage/> :<StudentPage/>}/>
			<Route path="/admin" element={authUser ? <AdminPage /> : <Navigate to="/login" />} />
			<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
		  </Routes>
		  <Toaster />
		</div>
	  );
	  
}

export default App