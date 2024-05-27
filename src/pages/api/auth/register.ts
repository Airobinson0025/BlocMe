import { createUser } from "@/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST( request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = request.body;

    if(!email || !password) {
        return response.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await createUser(email, password);
        return response.status(201).json({ user, message: 'User created successfully'});
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Failed to create user' });
    }
}