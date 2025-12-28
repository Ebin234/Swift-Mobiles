import { NextResponse } from "next/server";

export function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "logout success",
    });
    
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "logout failed",
      data: error,
    });
  }
}
