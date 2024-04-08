import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

let counter = 3;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Arrays
let users = [
	{ id: 101, username: "JoeSpring", password: "FAKEPWDIamJoe99kpwnd!" },
	{ id: 102, username: "JaneSummers", password: "FAKEPWDJaneRocks22!" },
	{ id: 103, username: "test", password: "test" },
];

let accounts = [
	{ id: 1, userId: 101, amount: 200 },
	{ id: 2, userId: 102, amount: 300 },
	{ id: 3, userId: 103, amount: 400 },
];

let sessions = [];

// Generate OTP

function generateOTP() {
	const otp = Math.floor(100000 + Math.random() * 900000);
	return otp.toString();
}

// Generate a new id

function generateId(createUsername) {
	let newUserId;
	let idExists;
	do {
		newUserId = Math.floor(Math.floor(100 + Math.random() * 999) * createUsername.length);
		idExists = users.some((user) => user.id === newUserId);
	} while (idExists);

	return newUserId;
}

// Routes

app.post("/users", (req, res) => {
	const { createUsername, createPassword } = req.body;

	// Validate the password
	const validPassword = /(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+/.test(createPassword);

	// Check if username is taken
	const usernameTaken = users.some((user) => user.username === createUsername);

	// Generate a new id

	const newUserId = generateId(createUsername);

	// Logic to create a new user
	if (!usernameTaken && validPassword) {
		const newUser = { id: newUserId, username: createUsername, password: createPassword };
		const newAccountId = counter++;
		users.push(newUser);
		accounts.push({ id: newAccountId, userId: newUser.id, amount: 0 });
		console.log(...users)
		// 201 Created:
		res.status(201).send("User created");
	} else if (usernameTaken) {
		// 409 Conflict:
		res.status(409).send("Username already in use");
	} else {
		// 400 Bad Request:
		res.status(400).send("Password must contain at least one uppercase letter, one number, and one symbol");
	}
});

// User login
app.post("/sessions", (req, res) => {
	const { username, password } = req.body;
	const userInUsers = users.some((user) => user.username === username);

	if (userInUsers) {
		const user = users.find((user) => user.username === username && user.password === password);
		if (user) {
			const otp = generateOTP();
			const activeSessionIndex = sessions.findIndex((session) => session.userId === user.id && session.active === true);
			if (activeSessionIndex !== -1) {
				sessions[activeSessionIndex].active = false;
			}
			const newSession = { userId: user.id, token: otp, active: true };
			sessions.push(newSession);
			res.status(200).send(newSession);
		} else {
			res.status(401).send("Wrong password");
		}
	} else {
		res.status(404).send("User does not exist");
	}
});

// Display account balance
app.post("/me/accounts", (req, res) => {
	const { token } = req.body;
	const activeSessionIndex = sessions.findIndex((session) => session.token === token && session.active === true);
	if (activeSessionIndex !== -1) {
		const { userId } = sessions[activeSessionIndex];
		const account = accounts.find((account) => account.userId === userId);
		if (account) {
			res.status(200).json({ amount: account.amount });
		} else {
			res.status(404).send("Account not found");
		}
	} else {
		res.status(404).send("Session not found");
	}
});

// Add money to account
app.post("/me/accounts/transactions/deposit", (req, res) => {
	console.log(typeof req.body.amount, req.body.amount);
	const { token, amount } = req.body;
	const numericAmount = Number(amount);
	const activeSessionIndex = sessions.findIndex((session) => session.token === token && session.active === true);
	if (activeSessionIndex !== -1) {
		const { userId } = sessions[activeSessionIndex];
		const account = accounts.find((account) => account.userId === userId);
		if (account) {
			account.amount += numericAmount;
			const numberString = account.amount.toString()
			res.status(200).send(numberString);
		} else {
			res.status(404).send("Account not found");
		}
	} else {
		res.status(404).send("Session not found");
	}
});

// Remove money to account
app.post("/me/accounts/transactions/withdraw", (req, res) => {
	console.log(typeof req.body.amount, req.body.amount);
	const { token, amount } = req.body;
	const numericAmount = Number(amount);
	const activeSessionIndex = sessions.findIndex((session) => session.token === token && session.active === true);
	if (activeSessionIndex !== -1) {
		const { userId } = sessions[activeSessionIndex];
		const account = accounts.find((account) => account.userId === userId);
		if (account) {
			account.amount -= numericAmount;
			const numberString = account.amount.toString();
			res.status(200).send(numberString);
		} else {
			res.status(404).send("Account not found");
		}
	} else {
		res.status(404).send("Session not found");
	}
});

// Start server
app.listen(PORT, () => {
	console.log("Started backend on port", PORT);
});
