import db from "@/db/db";
import { userModel } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const createUser = async (email: string, password: string) => {
    // hash password
    const hashedPassword = await bcrypt.hash( password, 10);

    //insert user to database
    const [ user ] = await db.insert(userModel).values({
        email,
        password: hashedPassword
    }).returning();

    return user;
}

// get user be email
export const getUserByEmail = async (email: string) => {
    const user = await db.select().from(userModel).where(eq(userModel.email, email)).then(
        results => results[0]
    );
    return user;
}