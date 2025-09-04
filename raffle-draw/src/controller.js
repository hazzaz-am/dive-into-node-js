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
