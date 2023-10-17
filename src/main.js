import express from "express";
import {publicRouter} from "./routes/public-api.js";
import {userRouter} from "./routes/api.js";


const PORT = process.env.SERVER_PORT;

const app = express();
app.use(express.json());

app.use(publicRouter);
app.use(userRouter);


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})