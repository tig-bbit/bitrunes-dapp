const weakMap = new WeakMap<object, number>();
let objectCount = 0;

export function objectId(object: object) {
	const id = weakMap.get(object);
	if (!id) {
		weakMap.set(object, ++objectCount);
		return objectCount;
	}
	return id;
}