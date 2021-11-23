import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';

const useDOMChanged = ref => {
	const [values, setValues] = useState({
		offsetWidth: null,
	});

	useEffect(() => {
		const initValuesChanged = () => {
			const updatedValues = Object.keys(values).reduce((previousValue, currentValue) => {
				return {
					...previousValue,
					[currentValue]: ref.current[currentValue],
				};
			}, {});

			if (!isEqual(values, updatedValues)) setValues(updatedValues);
		};

		if (ref.current) ref.current.addEventListener('DOMSubtreeModified', initValuesChanged);

		return () => {
			if (ref.current) ref.current.removeEventListener('DOMSubtreeModified', initValuesChanged);
		};
	}, [ref.current]);

	return values;
};

export default useDOMChanged;
