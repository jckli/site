export const InlineLink = (props: any) => {
	return (
		<a
			href={props.href}
			target="_blank"
			rel="noreferrer"
			className="
            text-text-darker underline transition-all ease-in-out transition-200 hover:text-pink-accent
            "
		>
			{props.text}
		</a>
	);
};
