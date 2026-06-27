require("dotenv").config();

console.log("======================================");
console.log("ENV FILE LOADED");
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("======================================");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const predictRoutes = require("./routes/predict");

const app = express();

/* ---------------- Middleware ---------------- */

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- MongoDB ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
});

/* ---------------- Home ---------------- */

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Placement Prediction Backend Running"
    });
});

/* ---------------- Routes ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

/* ---------------- 404 ---------------- */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });
});

/* ---------------- Error Handler ---------------- */

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

/* ---------------- Server ---------------- */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Node Server Running at http://localhost:${PORT}`);
});