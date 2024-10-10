const GridBackground = ({ children }) => {
	return (
		<div className='w-full bg-white-500		 text-white bg-dot-black/[0.2] relative'>
			<div className='absolute pointer-events-none inset-0 bg-green-400 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
			{children}
		</div>
	);
};
export default GridBackground;