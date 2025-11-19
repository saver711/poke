"use server";
import { cookies } from "next/headers";
import type { Mode } from "@/app/models/mode.model";

export async function setModeAction(mode: Mode) {
	const cookieStore = await cookies();
	cookieStore.set("mode", mode, {
		maxAge: 60 * 60 * 24 * 365, // 1 year
		path: "/",
		sameSite: "lax",
		httpOnly: false,
	});
}
