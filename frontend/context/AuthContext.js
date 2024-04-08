"useClient";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");
	const [balance, setBalance] = useState(0);
	const [amount, setAmount] = useState(0);
	const [createUsername, setCreateUsername] = useState("");
	const [createPassword, setCreatePassword] = useState("");

	const createAccount = async () => {
		const response = await fetch("http://localhost:3001/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ createUsername, createPassword }),
		});
		if (response.ok) {
			router.push("/login");
		} else {
			console.log("Failed to create account.");
		}
	};

	const login = async (username, password) => {
		const response = await fetch("http://localhost:3001/sessions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		if (response.ok) {
			const data = await response.json();
			setUser(username);
			setIsLoggedIn(data.active);
			setUserId(data.userId);
			setToken(data.token);
			router.push("/account");
		}
	};

	const getBalance = async () => {
		const response = await fetch("http://localhost:3001/me/accounts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token }),
		});
		const data = await response.json();
		setBalance(data.amount);
	};

	const sendDeposit = async () => {
		console.log(typeof amount, amount);
		const response = await fetch("http://localhost:3001/me/accounts/transactions/deposit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token, amount }),
		});
		const data = await response.text();
		const parsedData = parseInt(data);
		setBalance(parsedData);
	};

	const sendWithdraw = async () => {
		console.log(typeof amount, amount);
		const response = await fetch("http://localhost:3001/me/accounts/transactions/withdraw", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token, amount }),
		});
		const data = await response.text();
		const parsedData = parseInt(data);
		setBalance(parsedData);
	};

	const logout = () => {
		setUser("");
		setToken("");
		setIsLoggedIn(false);
		setUserId("");
		router.push("/");
	};

	const value = {
		user,
		userId,
		token,
		isLoggedIn,
		login,
		logout,
		balance,
		getBalance,
		amount,
		setAmount,
		sendDeposit,
		sendWithdraw,
		createAccount,
		setCreateUsername,
		setCreatePassword,
		createUsername,
		createPassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
