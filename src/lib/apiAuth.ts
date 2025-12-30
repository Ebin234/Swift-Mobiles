import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";

export type AuthAdmin = {
  id: string;
  role: string;
};

export async function getAuthAdmin(): Promise<AuthAdmin | null> {
    const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;

  try {
    return verifyAccessToken(token) as AuthAdmin;
  } catch (error) {
    console.log(error);
    return null;
  }
}
