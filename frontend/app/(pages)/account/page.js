"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/md";


export default function Account() {
	const { user, token, balance, getBalance, amount, setAmount, sendDeposit, sendWithdraw } = useAuth();

	useEffect(() => {
		if (token) {
			getBalance();
		}
	}, [token, getBalance]);

	return (
		<div className="min-h-96">
			<div className="my-4">
        <h1 className="text-2xl font-bold mb-3">My Account</h1>
        <p>Hello {user}!</p>
			</div>
			<div className="flex flex-col gap-4">
        <div className=" my-3">
          <h2 className="text-xl font-bold mb-3">Account info:</h2>
          <div className="grid grid-cols-2 gap-10">
            <div className=" bg-neutral-100 rounded-lg text-black p-8 text-center shadow-sm">
              <p htmlFor="displayUser">Username:&nbsp;</p>
              <p className="font-bold text-lg mt-2" id="displayUser">{user}</p>
            </div>
            <div className="bg-black rounded-lg text-white p-8 text-center">
              <p htmlFor="displayBalance">Balance:&nbsp;</p>
              <p className="font-bold text-lg mt-2" id="displayBalance">{balance}$</p>
            </div>
          </div>
				</div>
				
        <div className="items-center">
          <h2 className="text-xl font-bold mb-3">Deposit or withdraw money</h2>
          <label htmlFor="amountInput" className="font-medium">Amount&nbsp;</label>
          <div className="flex flex-row gap-4 items-center">
            <input
              id="amountInput"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}>
            </input>
            <button className="flex gap-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-sm" onClick={() => sendDeposit()}> + Deposit</button>
            <button className="flex gap-1 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-sm" onClick={() => sendWithdraw()}> - Withdraw </button>
          </div>
				</div>
				<div className="flex flex-row w-full justify-center gap-8">
					
				</div>
			</div>
		</div>
	);
}
