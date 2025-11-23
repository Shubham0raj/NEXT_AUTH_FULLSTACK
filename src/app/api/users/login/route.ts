import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModels'
import bcrypt from "bcryptjs";
import {NextRequest,NextResponse} from  'next/server'  
import jwt from "jsonwebtoken"

connect()

export async function POST(request :NextRequest){
    try {
        const reqBody =await request.json()
        const {email,password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({
            email
        })

        if(!user){
            return NextResponse.json({error:"user do not exists"},{status:400})
        }
        console.log("user exists")

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error:"check ur cridentials"},{status:400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn: '1h' })

        const response = NextResponse.json({
            message : "Logged In Success",
            success: true
        })

        response.cookies.set("token",token,{httpOnly:true})

        return response

    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},{status:500}
        )
    }
}