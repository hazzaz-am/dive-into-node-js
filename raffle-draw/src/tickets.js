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
	 * Create bulk tickets for user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Ticket[]}
	 */
	createBulkTickets(username, price, quantity) {
		let resutl = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.createNewTicket(username, price);
			resutl.push(ticket);
		}
		return resutl;
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
	 * Update bulk tickets for user
	 * @param {string} username
	 * @param {{username: string, price: number}} ticketBody
	 * @returns {Ticket[]}
	 */
	updateBulkTickets(username, ticketBody) {
		const userTickets = this.findTicketsByUsername(username);

		const updatedTickets = userTickets.map(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => this.updateTicket(ticket.id, ticketBody)
		);
		return updatedTickets;
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

	/**
	 * Delete user bulk tickets
	 * @param {string} username
	 * @returns {boolean[]}
	 */
	deleteBulkTickets(username) {
		const userTickets = this.findTicketsByUsername(username);
		const deltedData = userTickets.map(
			/**
			 * @param {Ticket} ticket
			 */
			(ticket) => this.deleteTicketById(ticket.id)
		);
		return deltedData;
	}

	/**
	 * Raffle Draw for get winners
	 * @param {number} winnerCount
	 * @returns {Ticket[]}
	 */
	drawWinner(winnerCount) {
		const winnerIndexs = new Array(winnerCount);
		let index = 0;

		while (index < winnerCount) {
			const ticketIndex = Math.floor(Math.random() * this[tickets].length);
			if (!winnerIndexs.includes(ticketIndex)) {
				winnerIndexs[index++] = ticketIndex;
				continue;
			}
		}

		const winners = winnerIndexs.map(
			/**
			 * @param {number} index
			 */
			(index) => this[tickets][index]
		);
	}
}

const collection = new TicketCollection();

module.exports = collection;
