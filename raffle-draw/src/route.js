const {
	sellBulkTickets,
	sellSingleTicket,
	findAllTickets,
	findTicketById,
	updateTicket,
	findTicketsByUsername,
	updateUserTickets,
	deleteTicketById,
	deleteUserTickets,
  drawWinners,
} = require("./controller");

const router = require("express").Router();

router
	.route("/t/:id")
	.get(findTicketById)
	.put(updateTicket)
	.delete(deleteTicketById);

router
	.route("/u/:username")
	.get(findTicketsByUsername)
	.put(updateUserTickets)
	.delete(deleteUserTickets);

router.post("/bulk", sellBulkTickets);
router.get("/draw", drawWinners);

router.route("/").get(findAllTickets).post(sellSingleTicket);

module.exports = router;
