const { ApolloError, UserInputError } = require('apollo-server');

class PickupGameExceedMaximumError extends ApolloError {
    constructor(message = 'Pickup game has exceeded the maximum of players.') {
        super(message, null, null);
        this.name = 'PickupGameExceedMaximumError';
        this.code = 409;
    }
};

class BasketballFieldClosedError extends ApolloError {
    constructor(message = 'Cannot add a pickup game to a closed basketball field') {
        super(message, null, null);
        this.name = 'BasketballFieldClosedError';
        this.code = 400;
    }
};

class PickupGameOverlapError extends ApolloError {
    constructor(message = 'Pickup games cannot overlap') {
        super(message, null, null);
        this.name = 'PickupGameOverlapError';
        this.code = 400;
    }
};

class PickupGameAlreadyPassedError extends ApolloError {
    constructor(message = 'Pickup game has already passed') {
        super(message, null, null);
        this.name = 'PickupGameAlreadyPassedError';
        this.code = 400;
    }
};

class NotFoundError extends ApolloError {
    constructor(message = 'Id was not found') {
        super(message, null, null);
        this.name = 'NotFoundError';
        this.code = 404;
    }
};

class GameDeletedError extends ApolloError {
    constructor(message = 'Pickup Game deleted') {
        super(message, null, null);
        this.name = 'GameDeletedError';
        this.code = 400;
    }
};

class PlayerRegisterError extends ApolloError {
    constructor(message = 'Player registration error') {
        super(message, null, null);
        this.name = 'GameDeletedError';
        this.code = 400;
    }
};

module.exports = {
    PickupGameExceedMaximumError,
    BasketballFieldClosedError,
    PickupGameOverlapError,
    PickupGameAlreadyPassedError,
    NotFoundError,
    GameDeletedError,
    PlayerRegisterError,
    UserInputError
};
