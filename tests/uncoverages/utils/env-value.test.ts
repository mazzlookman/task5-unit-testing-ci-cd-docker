import { getEnv } from '../../../src/utils/env-value';

describe('getEnv', () => {
    const ENV_VAR_NAME = 'TEST_ENV_VAR';

    beforeEach(() => {
        delete process.env[ENV_VAR_NAME];
    });

    it('should return the value of the environment variable if it is set', () => {
        const expectedValue = 'test_value';
        process.env[ENV_VAR_NAME] = expectedValue;

        const result = getEnv(ENV_VAR_NAME);

        expect(result).toBe(expectedValue);
    });

    it('should throw an error if the environment variable is not set', () => {
        expect(() => getEnv(ENV_VAR_NAME)).toThrow(`Environment variable ${ENV_VAR_NAME} is not set`);
    });
});
