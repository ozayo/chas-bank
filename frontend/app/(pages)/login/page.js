"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(username, password);
		} catch (error) {
			console.error("Login error:", error);
		}
  };
  
  	return (
		<form onSubmit={(e) => handleLogin(e)}>
			<div className="min-h-96">
				<div className="my-8">
					<h1 className="text-2xl font-bold mb-3">Login</h1>
					<p>Enter username and password below to access your account</p>
				</div>
				<div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<label htmlFor="usernameInputId">Username</label>
							<input
								onChange={(e) => setUsername(e.target.value)}
								value={username}
								id="usernameInputId"
								type="text"
								placeholder="username"
								autoComplete="username"
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="passwordInputId">Password</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								id="passwordInputId"
								type="password"
								placeholder="password"
								autoComplete="current-password"
								required
							/>
						</div>
						<button type="submit" className="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-slate-800 my-3">
							Submit
						</button>
					</div>
					<div className="mt-4 text-center text-sm">
						{"Don't have an account?"}
						<Link href="/create" className="underline">
							Create account
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
}