const { sellBulkTickets, sellSingleTicket } = require("./controller");

const router = require("express").Router();

router.route("/t/:id").get().put().delete();

router.route("/u/:username").get().put().delete();

router.post("/bulk", sellBulkTickets);
router.get("/draw");

router.route("/").get().post(sellSingleTicket);

module.exports = router;
