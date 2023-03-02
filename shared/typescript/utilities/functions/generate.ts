export const serviceName = <D extends string, T extends string>(domain: D, name: T): `neumba-${D}-${T}` => {
  return `neumba-${domain}-${name}`;;
}