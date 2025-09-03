const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");

class TicketCollection {
	constructor() {
		this[tickets] = [];
	}

	/**
	 * Create & Save new Ticket
	 * @param {string} username
	 * @param {number} price
	 * @returns {Ticket}
	 */
	createNewTicket(username, price) {
		const ticket = new Ticket(username, price);
		this[tickets].push(ticket);
		return ticket;
	}

	/**
	 * @returns {Ticket[]}
	 */
	findAll() {
		return this[tickets];
	}

	/**
	 * Find ticket by id
	 * @param {string} id
	 * @returns {Ticket}
	 */
	findById(id) {
		const ticket = this[tickets].find(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === id
		);

		return ticket;
	}

	/**
	 * Find tickets by username
	 * @param {string} username
	 * @returns {Ticket | Ticket[]}
	 */
	findTicketsByUsername(username) {
		const userTickets = this[tickets].filter(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.username === username
		);

		return userTickets;
	}

	/**
	 * Update ticket by ticket id
	 * @param {string} ticketId
	 * @param {{username: string, price: number}} ticketBody
	 * @returns {Ticket}
	 */
	updateTicket(ticketId, ticketBody) {
		const ticket = this.findById(ticketId);
		ticket.username = ticketBody.username ?? ticket.username;
		ticket.price = ticketBody.price ?? ticket.price;

		return ticket;
	}

	/**
	 * Delete ticket by Id
	 * @param {string} ticketId
	 * @returns {boolean}
	 */
	deleteTicketById(ticketId) {
		const index = this[tickets].findIndex(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => ticket.id === ticketId
		);

		if (index === -1) {
			return false;
		} else {
			this[tickets].splice(index, 1);
			return true;
		}
	}
}

const collection = new TicketCollection();
