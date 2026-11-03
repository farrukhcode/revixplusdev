import { connection } from "next/server";

export async function GET() {
  await connection();
  return Response.json(
    {
      status: "ok",
      service: "revixplus-web",
      uptime: Math.round(process.uptime()),
      version: process.env.APP_VERSION || "dev",
    },
    { headers: { "cache-control": "no-store" } },
  );
}
