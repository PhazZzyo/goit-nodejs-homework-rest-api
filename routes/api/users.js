const express = require("express");
const router = express.Router();
const { basedir } = global;
const ctrl = require(`${basedir}/controllers/users`);
const { auth, upload } = require(`${basedir}/middlewares`);
const { ctrlWrapper } = require(`${basedir}/utils`);

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscriptionUser));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.setAvatar)
);

module.exports = router;
