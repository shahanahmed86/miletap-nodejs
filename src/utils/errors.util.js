const { ZodError } = require('zod');

class HttpError extends Error {
	/**
	 * HttpError constructor
	 * @param {number} status
	 * @param {string} message
	 */
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}
}

class BadRequest extends HttpError {
	/**
	 * BadRequest constructor
	 * @param {string} message
	 */
	constructor(message = 'error.badRequest') {
		super(400, message);
	}
}

class NotFound extends HttpError {
	/**
	 * NotFound constructor
	 * @param {string} message
	 */
	constructor(message = 'error.notFound') {
		super(404, message);
	}
}

class ConflictError extends HttpError {
	/**
	 * ConflictError constructor
	 * @param {string} message
	 */
	constructor(message = 'error.conflict') {
		super(409, message);
	}
}

class NotAuthorized extends HttpError {
	/**
	 * NotAuthorized constructor
	 * @param {string} message
	 */
	constructor(message = 'error.notAuthorized') {
		super(422, message);
	}
}

class NotAuthenticated extends HttpError {
	/**
	 * NotAuthenticated constructor
	 * @param {string} message
	 */
	constructor(message = 'error.notAuthenticated') {
		super(401, message);
	}
}

class Forbidden extends HttpError {
	/**
	 * Forbidden constructor
	 * @param {string} message
	 */
	constructor(message = 'error.forbidden') {
		super(403, message);
	}
}

class NotAcceptable extends HttpError {
	/**
	 * NotAcceptable constructor
	 * @param {string} message
	 */
	constructor(message = 'error.notAcceptable') {
		super(406, message);
	}
}

class InternalError extends HttpError {
	/**
	 * InternalError constructor
	 * @param {string} message
	 */
	constructor(message = 'error.internalError') {
		super(500, message);
	}
}

/**
 * convertUnknownIntoError
 * @param {unknown} e
 * @returns {HttpError}
 */
const convertUnknownIntoError = (e) => {
	/** @type {HttpError|undefined} */
	let err;

	if (e instanceof HttpError) err = e;
	else if (typeof e === 'string' && e) err = new ConflictError(e);
	else if (e instanceof ZodError) {
		const message = e.errors
			.map((error) => {
				const [msg, arg] = error.message.split('::');
				return new BadRequest([msg, arg]).message;
			})
			.join(', ');
		err = new BadRequest(message);
	} else if (e instanceof Error) err = new ConflictError(e.message);
	else err = new InternalError();

	// this will remove inverted commas from an error string
	err.message = err.message.replace(/['"]+/g, '');

	return err;
};

/**
 * unhandledOrUncaught error
 * @param {'uncaughtException'|'unhandledRejection'} name
 * @returns {void}
 */
const unhandledOrUncaught = (name) => {
	return (err) => {
		console.error(name, err);
	};
};

module.exports = {
	HttpError,
	BadRequest,
	NotFound,
	ConflictError,
	NotAuthorized,
	NotAuthenticated,
	Forbidden,
	NotAcceptable,
	InternalError,
	convertUnknownIntoError,
	unhandledOrUncaught
};
