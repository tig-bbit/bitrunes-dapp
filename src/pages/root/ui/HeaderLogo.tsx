'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoSvg } from "~/shared/ui/logo";

export function HeaderLogo() {
	const pathname = usePathname();
	const pageName = pathname?.split('/')[1];

	return (
		<div className='flex items-center gap-[0.5rem]'>
			<Link href='/bridge'>
				<LogoSvg />
			</Link>

			<span className='text-black-40 text-[1.25rem] capitalize'>
				{pageName}
			</span>
		</div>
	)
}	