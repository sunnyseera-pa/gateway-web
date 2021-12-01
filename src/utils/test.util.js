import isMatch from 'lodash/isMatch';

expect.extend({
	toHaveBeenCalledLastWithMatch(received, ...compared) {
		const lastCall = received.mock.calls[received.mock.calls.length - 1];

		return {
			pass: isMatch(lastCall, compared),
			message: () => `expected subset ${compared.toString()} to be in ${lastCall.toString()}`,
		};
	},
});
