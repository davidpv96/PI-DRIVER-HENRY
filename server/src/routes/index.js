const { Router } = require("express");
const driversRouter= require("./driversRouter");
const teamsRouter= require("./teamsRouter");
const router = Router();

router.use("/", driversRouter);
router.use("/teams", teamsRouter);

module.exports = router;
