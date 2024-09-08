"use server";

import { DayWithoutSex } from "@/data/daysWithoutSex";
import { SexAct } from "@/data/sexActs";
import { verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { syncCache } from "@rouby/sheetdb";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function trackDayWithoutSex(
	state: { success: boolean } | undefined,
	formData: FormData,
) {
	const validatedFields = z
		.object({
			date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
			onPeriod: z
				.enum(["on", "off"])
				.default("off")
				.transform((value) => value === "on"),
		})
		.safeParse(Object.fromEntries(formData));

	if (!validatedFields.success) {
		return {
			success: false,
		};
	}

	const { userId } = await verifySession();

	if (
		await DayWithoutSex.findByUserAndDateTime(userId, validatedFields.data.date)
	) {
		return {
			success: false,
		};
	}

	await new DayWithoutSex({
		userId,
		date: validatedFields.data.date,
		onPeriod: validatedFields.data.onPeriod,
	}).save();

	await syncCache();

	revalidateTag("daysWithoutSex");
}

export async function trackSexAct(
	state:
		| {
				errors?: {
					positions?: string[];
					dateTime?: string[];
					duration?: string[];
					initiator?: string[];
					location?: string[];
					foreplayOnUser?: string[];
					userFinished?: string[];
					foreplayOnPartner?: string[];
					partnerFinished?: string[];
				};
		  }
		| undefined,
	formData: FormData,
) {
	const validatedFields = z
		.object({
			positions: z
				.string()
				.transform((value) => value.split(",").filter(Boolean))
				.pipe(z.array(z.string())),
			dateTime: z.date({ coerce: true }),
			duration: z.number({ coerce: true }).nullable(),
			initiator: z.enum(["me", "partner"]),
			location: z.string().nullable(),
			foreplayOnUser: z.string().nullable(),
			userFinished: z
				.enum(["on", "off"])
				.default("off")
				.transform((value) => value === "on"),
			foreplayOnPartner: z.string().nullable(),
			partnerFinished: z
				.enum(["on", "off"])
				.default("off")
				.transform((value) => value === "on"),
		})
		.safeParse(Object.fromEntries(formData));

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { userId } = await verifySession();

	const dayWithoutSex = await DayWithoutSex.findByUserAndDateTime(
		userId,
		validatedFields.data.dateTime.toISOString(),
	);

	await dayWithoutSex?.delete();

	await new SexAct({
		userId,
		dateTime: validatedFields.data.dateTime.toISOString(),
		duration: validatedFields.data.duration
			? dayjs.duration(validatedFields.data.duration, "minutes").toISOString()
			: "",
		location: validatedFields.data.location ?? "",
		initiator: validatedFields.data.initiator === "me" ? "USER" : "PARTNER",
		foreplayOnUser: validatedFields.data.foreplayOnUser ?? "",
		foreplayOnPartner: validatedFields.data.foreplayOnPartner ?? "",
		positions: validatedFields.data.positions,
		userFinished: validatedFields.data.userFinished,
		partnerFinished: validatedFields.data.partnerFinished,
	}).save();

	await syncCache();

	revalidateTag("sexActs");
}
