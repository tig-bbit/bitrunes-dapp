import { FieldPath, FieldPathValue, FieldValues, useFormContext, useWatch } from 'react-hook-form';

export function useFieldValue<
	TFieldValues extends FieldValues = FieldValues, 
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ 
	name, 
	defaultValue 
}: {
	name: TFieldName,
	defaultValue?: FieldPathValue<TFieldValues, TFieldName>
}) {
	const { getValues } = useFormContext();
	return useWatch({ name, defaultValue: getValues(name) ?? defaultValue });
}