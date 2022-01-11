import _ from 'lodash';
import removeMd from 'remove-markdown';
import { format } from 'date-fns';
import { DISPLAY_DATE_STANDARD } from '../configs/constants';

export const isEditMode = (url = '') => {
	if (!_.isEmpty(url)) {
		let src = url.toLowerCase();
		if (src.includes('edit')) return true;

		return false;
	}
	return false;
};

export const toTitleCase = str => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

export const isPDFLink = link => {
	return /\.pdf$/.test(link);
};

export const removeArrayItem = (arr, value) => {
	const index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

export const stripMarkdown = (value = '', truncate = 0) => {
	if (!_.isEmpty(value)) {
		if (truncate > 0) {
			value = value.substr(0, 255) + (value.length > 255 ? '...' : '');
		}
		value = removeMd(value);
	}
	return value;
};

export const dateFormats = timestamp => {
	const date = new Date(timestamp);

	return {
		dateOnly: format(date, DISPLAY_DATE_STANDARD),
		timeOnly: format(date, 'HH:mm'),
	};
};

export const getParams = querystring => {
	const params = new URLSearchParams(querystring);
	const obj = {};

	for (const key of params.keys()) {
		if (params.getAll(key).length > 1) {
			obj[key] = params.getAll(key);
		} else {
			obj[key] = params.get(key);
		}
	}

	return obj;
};

export const flattenObject = (data, key) => {
	const flattened = [];

	if (data[key]) {
		data[key].forEach(item => {
			flattened.push(flattenObject(item, key));
		});
	}

	return flattened;
};

export const replaceKey = (data, iteratee) => {
	if (data) {
		const clonedData = [...data];

		data.forEach(item => {
			return replaceKey(iteratee(item), iteratee);
		});

		return clonedData;
	}

	return data;
};
