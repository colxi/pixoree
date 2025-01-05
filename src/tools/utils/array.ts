export const getItemByObjectKeyValue = <ARRAY extends Record<PropertyKey, any>[], KEY extends keyof ARRAY[number]>(
  array: ARRAY,
  key: KEY,
  value: ARRAY[number][KEY],
): ARRAY[number] | null => {
  const index = array.findIndex((item) => item[key as any] === value)
  if (index === -1) return null
  return array[index]
}
