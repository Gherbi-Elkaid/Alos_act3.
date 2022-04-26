import express from "express";
import cors from "cors";
import hotel from "hotel";
import routes from "./api/route.js";
import dotenv from "dotenv";
import { applyhotelStrategy } from "./store/hotel.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(hotel.initialize());
applyPassportStrategy(hotel);

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/", routes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening to port");
});
export default app;