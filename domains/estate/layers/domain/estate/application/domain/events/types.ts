import { DomainCommand } from "../../../../../../../../shared/typescript/types/domain";
import { CreateEstateParams } from "../../types";

export type CREATE_ESTATE_DOMAIN_COMMAND = DomainCommand<
  string,
  "CREATE_ESTATE",
  CreateEstateParams,
  "1.0.0"
>;

export type UPDATE_ESTATE_DOMAIN_COMMAND = DomainCommand<
  string,
  "UPDATE_ESTATE",
  {
    id: string,
    creator: string,
    name?: string
  },
  "1.0.0"
>;