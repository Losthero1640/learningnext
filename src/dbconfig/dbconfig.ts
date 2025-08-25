import mongoose from 'mongoose'

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = await mongoose.connection
        connection.on('connected', () => {
            console.log("Database connected successfully");
        })
        connection.on('error', (error) => {
            console.log("Error connecting to the database", error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong while connecting to the database", error);
    }
}