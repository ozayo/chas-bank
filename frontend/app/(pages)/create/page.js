"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

export default function Create() {
	const { createAccount, setCreateUsername, setCreatePassword, createPassword, createUsername } = useAuth();

	const preventCreateDefault = (e) => {
		e.preventDefault()
		createAccount()
	}
	return (
		<form onSubmit={(e) => preventCreateDefault(e)}>
			<div className="mx-auto max-w-sm w-full border-0 shadow-transparent sm:shadow-sm sm:border min-h-96">
				<div>
					<h1 className="text-2xl">Create account</h1>
					<p>Enter username and password below to create an account</p>
				</div>
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
						<button type="submit" className="w-full">
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
			</div>
		</form>
	);
}
