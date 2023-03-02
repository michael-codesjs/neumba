import { DomainCommand } from "../../../../../../../../shared/typescript/types/domain";
import { CreateEstateParams } from "../../types";

export type CREATE_ESTATE_DOMAIN_COMMAND = DomainCommand<
  string,
  "CREATE_ESTATE",
  CreateEstateParams,
  "1.0.0"
>;