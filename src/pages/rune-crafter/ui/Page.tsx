import { Form } from "./form/Form";
import { Table } from "./table/Table";

export function Page() {
	return (
		<div className='flex size-full gap-[1.25rem] max-lg:flex-wrap'>
			<Form />

			<Table />
		</div>
	);
}