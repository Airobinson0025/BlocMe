import db from "@/db/config";
import { userModel } from "@/db/schema";
const bcrypt = require("bcrypt");

export const createUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.insert(userModel).values({
        email,
        password: hashedPassword
    }).returning

    return user
}