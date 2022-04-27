import Link from "next/link";

export const NavbarButton = (props: any) => {
    return (
        <Link href={props.link}>
            <a className="text-norm-gray text-[16px] font-firamono underline underline-offset-4 mx-[10px]" onClick={props.onClick}>
                {props.label}
            </a>
        </Link>
    )
}