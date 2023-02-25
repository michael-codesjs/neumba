import { apiResources } from "./api";
import { authenticationResources } from "./authentication";

class ResourceCollection {

  private constructor() {}
  static readonly instance = new ResourceCollection;

  readonly authentication: typeof authenticationResources = authenticationResources;
  readonly api: typeof apiResources = apiResources;

}

export const resource = ResourceCollection.instance;