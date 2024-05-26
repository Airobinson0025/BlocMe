import db from "@/db/db";
import { userModel } from "@/db/schema";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
    // hash password
    const hashedPassword = await bcrypt.hash( password, 10)

    //insert user to database
    const [ user ] = await db.insert(userModel).values({
        email,
        password: hashedPassword
    }).returning()

    return user
}