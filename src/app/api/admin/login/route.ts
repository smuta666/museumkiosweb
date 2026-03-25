
import { NextResponse } from "next/server";

export async function POST(req){
  const {login,password} = await req.json();
  if(login==="admin" && password==="123456"){
    const res = NextResponse.json({ok:true});
    res.cookies.set("admin","yes");
    return res;
  }
  return NextResponse.json({}, {status:401});
}
