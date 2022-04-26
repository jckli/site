export const NavbarButton = (props: any) => {
    return (
        <a href={props.link} className="text-norm-gray text-[16px] font-firamono underline underline-offset-4 mx-[10px]">
            {props.label}
        </a>
    )
}