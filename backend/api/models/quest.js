/**
 * Quest
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
	attributes: {
		userid: {
			type: 'integer',
			required: true
		},
		distance: {
			type: 'integer',
			required: true,
		},
		hardmode: {
			type: 'integer',
			min: 0,
			max: 1,
			required: true
		}
	}
};
