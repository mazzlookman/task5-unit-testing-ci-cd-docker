import { authMiddleware } from '../../src/middlewares/auth-middleware';
import { CustomErrors } from '../../src/exceptions/custom-errors';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { getEnv } from '../../src/utils/env-value';

jest.mock('jsonwebtoken');
jest.mock('../../src/utils/env-value');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
            session: {}
        };
        res = {};
        next = jest.fn();
    });

    it('should call next with CustomErrors if authorization header is missing', () => {
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(new CustomErrors(401, "Unauthorized", "Token not provided or invalid format"));
    });

    it('should call next with CustomErrors if authorization header is in invalid format', () => {
        req.headers.authorization = 'InvalidToken';
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(new CustomErrors(401, "Unauthorized", "Token not provided or invalid format"));
    });

    it('should call next with CustomErrors if token verification fails', () => {
        req.headers.authorization = 'Bearer invalidtoken';
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error('Token verification failed'), null);
        });
        (getEnv as jest.Mock).mockReturnValue('secret');
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(new CustomErrors(403, "Forbidden", "Token verification failed"));
    });

    it('should call next with CustomErrors if token is expired', () => {
        req.headers.authorization = 'Bearer expiredtoken';
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback({ name: 'TokenExpiredError' }, null);
        });
        (getEnv as jest.Mock).mockReturnValue('secret');
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(new CustomErrors(403, "Forbidden", "Token expired"));
    });

    it('should call next with CustomErrors if token is invalid', () => {
        req.headers.authorization = 'Bearer invalidtoken';
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback({ name: 'JsonWebTokenError' }, null);
        });
        (getEnv as jest.Mock).mockReturnValue('secret');
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(new CustomErrors(403, "Forbidden", "Invalid token"));
    });

    it('should set req.session.author and call next if token is valid', () => {
        req.headers.authorization = 'Bearer validtoken';
        const decoded = { id: 1, name: 'Test Author' };
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(null, decoded);
        });
        (getEnv as jest.Mock).mockReturnValue('secret');
        authMiddleware(req, res, next);
        expect(req.session.author).toEqual(decoded);
        expect(next).toHaveBeenCalled();
    });
});
