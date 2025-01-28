export const getId = (id: number): number => {
  if (!id) return Math.floor(Math.random() * 100000)

  return id
}
