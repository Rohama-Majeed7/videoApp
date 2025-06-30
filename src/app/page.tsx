import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();
  console.log("session:",session);
  
  if (session) redirect("/dashboard");
  else redirect("/login");
}