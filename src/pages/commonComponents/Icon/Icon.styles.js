export const root =
	({ size, color, fill, ...commonProps }) =>
	({
		colors,
		components: {
			Icon: { sizes },
		},
	}) =>
		addCommonProps(
			commonProps,
			css`
				color: ${colors[color]};
				fill: ${colors[fill]};
				height: ${sizes[size]};
				width: ${sizes[size]};
			`
		);
