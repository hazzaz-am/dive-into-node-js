const TicketsCollection = require("./tickets");

exports.sellSingleTicket = (req, res) => {
	const { username, price } = req.body;
	const ticket = TicketsCollection.createNewTicket(username, price);
	res.status(201).json({
		message: "Ticket created successfully",
		ticket,
	});
};

exports.sellBulkTickets = (req, res) => {
	const { username, price, quantity } = req.body;
	const tickets = TicketsCollection.createBulkTickets(
		username,
		price,
		quantity
	);

	res.status(201).json({
		message: "Tickets created successfully",
		tickets,
	});
};

// find all tickets
exports.findAllTickets = (req, res) => {
	const tickets = TicketsCollection.findAll();
	res.status(200).json({
		message: "Tickets retrieved successfully",
		data: { items: tickets, total: tickets.length },
	});
};

// find ticket by id
exports.findTicketById = (req, res) => {
	const id = req.params.id;
	const ticket = TicketsCollection.findById(id);
	if (!ticket) {
		return res.status(404).json({
			message: "Ticket not found",
		});
	}

	res.status(200).json({
		message: "Ticket retrieved successfully",
		ticket,
	});
};

// find user tickets
exports.findTicketsByUsername = (req, res) => {
	const username = req.params.username;
	const tickets = TicketsCollection.findTicketsByUsername(username);

	res.status(200).json({
		message: "User Tickets retrieved successfully",
		tickets,
	});
};

// update ticket
exports.updateTicket = (req, res) => {
	const ticketId = req.params.id;
	const updatedTicket = TicketsCollection.updateTicket(ticketId, req.body);

	res.status(200).json({
		message: "Ticket updated successfully",
		ticket: updatedTicket,
	});
};

// update user tickets
exports.updateUserTickets = (req, res) => {
	const username = req.params.username;
	const tickets = TicketsCollection.updateBulkTickets(username, req.body);

	res.status(200).json({
		message: "User Tickets updated successfully",
		tickets,
	});
};

// delete ticket by id
exports.deleteTicketById = (req, res) => {
	const ticketId = req.params.id;
	const result = TicketsCollection.deleteTicketById(ticketId);

	if (!result) {
		return res.status(400).json({
			message: "Delete operation failed",
		});
	}

	res.status(200).json({
		message: "Ticket deleted successfully",
	});
};

// delete users tickets
exports.deleteUserTickets = (req, res) => {
	const username = req.params.username;
	TicketsCollection.deleteBulkTickets(username);
	res.status(200).json({
		message: "Tickets Deleted",
	});
};

// draw winners
exports.drawWinners = (req, res) => {
	const winnerCount = req.query.wc ?? 3;
	const winners = TicketsCollection.drawWinner(winnerCount);

	res.status(200).json({
		message: "Winners retrieved successfully",
		winners,
	});
};
