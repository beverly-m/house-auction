require("dotenv").config();

const express = require("express");
const employeeRoutes = require("./src/employee/routes");
const employeeHousesRoutes = require("./src/employee_houses/routes");
const adminRoutes = require("./src/admin/routes");
const houseRoutes = require("./src/house/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));


app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/employees/auction", employeeHousesRoutes);
app.use("/api/v1/houses", houseRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!"); 
})

app.listen(port, () => console.log(`app listening on port ${port}`)); 