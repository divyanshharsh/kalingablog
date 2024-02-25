const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

//database
let isDatabaseConnected = false;
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("database is connected successfully!");
		isDatabaseConnected = true;
	} catch (err) {
		console.log(err);
		isDatabaseConnected = false;
	}
};

//middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: ["http://localhost:5173", "*"], credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Set timeout limit to 10 seconds
app.use((req, res, next) => {
	res.setTimeout(10000, () => {
		console.log("Request timed out");
		res.status(504).send("Request timed out");
	});
	next();
});

// Welcome route in JSON format
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the MERN Blogging Website!" });
});

// Check if the database is connected and send JSON response
app.get("/check-db-status", (req, res) => {
	if (isDatabaseConnected) {
		res.json({ status: "Database connected" });
	} else {
		res.json({ status: "Database not connected" });
	}
});

app.listen(() => {
	connectDB();
	console.log("app is running ");
});
