const getExpandKeyframes = (
	outerRef: React.MutableRefObject<HTMLDivElement | null>,
	innerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
	let outerKeyframes: { [index: string]: any } = {};
	let innerKeyframes: { [index: string]: any } = {};

	if (outerRef.current === null || innerRef.current === null) return;

	const calculateCollapsedScale = () => {
		if (outerRef.current === null || innerRef.current === null)
			return { x: 0, y: 0 };
		const collapsed = outerRef.current.getBoundingClientRect();
		const expanded = innerRef.current.getBoundingClientRect();
		return {
			x: collapsed.width / expanded.width,
			y: collapsed.height / expanded.height
		};
	};

	// define ease function
	const ease = (v: number, pow = 4) => {
		return 1 - Math.pow(1 - v, pow);
	};
	// Figure out the size of the element when collapsed.
	let { x, y } = calculateCollapsedScale();

	for (let step = 0; step <= 100; step++) {
		let easedStep = ease(step / 100);

		const xScale = x + (1 - x) * easedStep;
		const yScale = y + (1 - y) * easedStep;

		innerKeyframes[`_${step}`] = { transform: `scale(${xScale}, ${yScale})` };

		const invXScale = 1 / xScale;
		const invYScale = 1 / yScale;
		outerKeyframes[`_${step}`] = {
			transform: `scale(${invXScale}, ${invYScale})`
		};
	}
	return { innerKeyframes, outerKeyframes };
};

export default getExpandKeyframes;
