// @ts-check
import manager from "@/utils/manager.js";
import { Router } from "express";

const router = Router({
	caseSensitive: true,
	strict: true,
});

router.get("/api/v1/users/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const user = await manager.users.fetch(id);
		if (!user) {
			res.status(404).send({ success: false, error: `User with ID '${id}' not found. Please check the ID and try again.` });
			return;
		}

		res.status(200).send({ success: true, data: { ...user } });
	}
	catch {
		res.status(500).send({ success: false, error: "An unexpected error occurred while fetching user data. Please try again later." });
	}
});

export default router;