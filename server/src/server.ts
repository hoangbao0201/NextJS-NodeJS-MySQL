require("dotenv").config()
import express from 'express'
import cors from "cors"

import authRouter from "./routes/auth"


const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const main = async () => {

    // Routes
    app.use("/api/auth", authRouter);


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

}

main().catch((error) => console.log(error)) 

