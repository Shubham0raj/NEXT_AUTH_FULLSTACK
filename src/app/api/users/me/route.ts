import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModels'
import {NextRequest,NextResponse} from  'next/server'  
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest){

    try {
        console.log(request)
        const userId = await getDataFromToken(request)
        const user =await User.findOne({_id:userId}).select("-password")
    
        if(!user){
            throw NextResponse.json({
                message:"Invalid Token",
            },{status:404})
        }
        
    
        return NextResponse.json({
            message:"User found",
            data:user
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:400})
    }
}