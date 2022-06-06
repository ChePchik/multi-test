const express = require("express");
const router = express.Router();
const Group = require("../../models/Groups");
const User = require("../../models/User");
const verifyPermission = require("../../middlewares/verifyPermission.js");
const verifyAccess = require("../../middlewares/verifyAccess.js");

/**
 * @route GET api/group/
 * @desc GET all groups
 */
router.get("/", (req, res) => {
	Group.find()
		.distinct("name")
		.then((groups) => {
			if (!groups) {
				return res.status(404).json({ error: "Groups not found" });
			}
			res.json(groups);
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			})
		);
});
/**
 * @route GET api/group/teacher
 * @desc GET all teacher
 */
router.get("/teacher", verifyAccess, (req, res) => {
	//verifyAccess
	User.find(
		{ role: { $in: ["teacher", "admin"] } },
		{ name: 1, surname: 1, thirdname: 1 }
	)
		.then((groups) => {
			if (!groups) {
				return res.status(404).json({ error: "Teacher not found" });
			}
			res.json(groups);
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			})
		);
});

/**
 * @route  PUT api/group/:id
 * @desc   Update a group
 */
router.put("/:id", [verifyPermission, verifyAccess], (req, res) => {
	//verifyAccess
	Group.findByIdAndUpdate(
		{
			_id: req.params.id,
		},
		req.body
	)
		.then(() => {
			Group.findOne({
				_id: req.params.id,
			}).then((group) => {
				res.json({
					success: true,
					data: group,
				});
			});
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			})
		);
});

/**
 * @route  POST /api/group/
 * @desc   Create a group
 */
router.post("/", [verifyAccess, verifyPermission], (req, res) => {
	const { name, id } = req.body;

	Group.findOne({ name }).then((gr) => {
		if (gr) {
			return res.status(400).json({
				success: false,
				error: "Такая группа уже есть",
				// message: "Такая группа уже есть",
			});
		}
		const newGroup = new Group({
			name,
			teacherID: id,
		});
		newGroup
			.save()
			.then((group) =>
				res.json({
					success: true,
					group,
				})
			)
			.catch((error) =>
				res.status(404).json({
					success: false,
					error: error.message,
					// message: error.message,
				})
			);
	});
});

/**
 * @route  DELETE api/group/:id
 * @desc   Delete A group
 */
router.delete("/:id", [verifyAccess, verifyPermission], (req, res) => {
	//[verifyAccess, verifyPermission],
	Group.findById(req.params.id)
		.then((group) => {
			if (!group) {
				return res
					.status(404)
					.json({ success: false, error: "group not found" });
			}
			group.remove();
		})
		.then(() =>
			res.json({
				success: true,
				id: req.params.id,
			})
		)
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			})
		);
});
/**
 * @route  PUT api/group/:id/teacher
 * @desc   UPDATE A teacher group
 */
router.put("/:id/teacher", [verifyAccess, verifyPermission], (req, res) => {
	const { teacherID } = req.body;
	Group.findOneAndUpdate(
		{
			_id: req.params.id,
		},
		{
			$push: {
				teacherID: teacherID,
			},
		}
	)
		.then((group) => {
			return res.status(200).json({ success: true, group });
		})
		.catch((error) => {
			console.log(error);
			return res.status(400).json({ success: false, messege: error });
		});
});

module.exports = router;
