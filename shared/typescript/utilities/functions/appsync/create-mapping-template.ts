type CreateMappingTemplateParams<
  T extends string,
  F extends string,
  D extends string,
  RQ extends string,
  RP extends string
> = {
  type: T,
  field: F,
  source: D,
  request?: RQ,
  response?: RP
};

type CreateMappingTemplate = <
  T extends string,
  F extends string,
  D extends string,
  RQ extends string,
  RP extends string
> (params: CreateMappingTemplateParams<T, F, D, RQ, RP>) => {
  type: T,
  field: F,
  dataSource: D,
  request: RQ | false,
  response: RP | false
}

export const createMappingTemplate: CreateMappingTemplate = (params) => {
  const { type, field, source, request, response } = params;
  return {
    type,
    field,
    dataSource: source,
    request: request || false,
    response: response || false,
  };
};