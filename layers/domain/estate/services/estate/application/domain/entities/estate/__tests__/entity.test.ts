import { getRandomEstateAttributes } from "@utilities/testing";
import { Estate } from "../entity";

describe("Estate", () => {

  test(".fromDTO", () => {

    const dto = getRandomEstateAttributes();
    const estate = Estate.fromDTO(dto);
    const attributes = (estate as any).attributes.collective(); // as any because 'attributes' attribute are private to typescript.

    expect(attributes).toStrictEqual(dto);

  });

  test(".toDTO", () => {
    
    const attributes = getRandomEstateAttributes();
    const estate = new Estate(attributes);

    expect(attributes).toStrictEqual(estate.toDTO());  

  })

});