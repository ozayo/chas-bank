"use client";

import Link from "next/link";
import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

export default function Create() {
	const { createAccount, setCreateUsername, setCreatePassword, createPassword, createUsername } = useAuth();
	const [errorMessage, setErrorMessage] = useState("");

	const preventCreateDefault = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Mevcut hata mesajını temizle
        try {
            await createAccount();
        } catch (error) {
            setErrorMessage(error.message); // Hata mesajını ayarla
        }
	};
	
	return (
		<div className="grid md:grid-cols-2 grid-rows-1 py-16">
			<div className="px-5 py-5 bg-neutral-100 text-center w-full align-middle content-center">
				<h1 className="text-2xl font-bold">Create Account</h1>
				<p>Enter username and password below to create an account.</p>
				{errorMessage && <div className="bg-red-600 text-white items-center p-2 rounded-lg mt-3">{errorMessage}</div>}
			</div>
			<div className="px-5">
			<form onSubmit={(e) => preventCreateDefault(e)}>
				<div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<label htmlFor="create-username">Username</label>
							<input
								value={createUsername}
								onChange={(e) => setCreateUsername(e.target.value)}
								id="create-username"
								type="text"
								placeholder="username"
								autoComplete="username"
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="create-password">Password</label>
							<input
								value={createPassword}
								onChange={(e) => setCreatePassword(e.target.value)}
								id="create-password"
								type="password"
								placeholder="password"
								autoComplete="current-password"
								required
							/>
						</div>
						<button type="submit" className="w-full bg-black text-white py-2 px-4 hover:bg-indigo-800">
							Create account
						</button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Log in
						</Link>
					</div>
				</div>
			
			</form>
			</div>
		</div>
	);
}
