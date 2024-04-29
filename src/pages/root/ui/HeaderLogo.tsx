import Link from "next/link";
import { LogoSvg } from "~/shared/ui/logo";

export function HeaderLogo() {
	return (
		<Link className='flex items-center' href='/bridge'>
			<LogoSvg />
		</Link>
	)
}	