export const serviceName = <T extends string>(name: T): `neumba-${T}` => {
  return `neumba-${name}`;;
}