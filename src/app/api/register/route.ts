import { NextResponse, NextRequest } from "next/server";
import { createUser } from "@/services/userService";

export async function POST(req: NextRequest ) {
    try {
        const { email, password } = await req.json();
        
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Create user
        const user = await createUser(email, password);
        return NextResponse.json({ user, message: 'User created successfully' }, { status: 201 })
    
    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
        
    }
}