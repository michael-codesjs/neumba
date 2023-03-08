import { getRandomEstateAttributes } from "../../utilities/testing";
import { DomainEventsRepository } from "../../repositories/domain-event";
import { publishEstateCreatedEvent } from "../publish-estate-created-event";

jest.mock("../../repositories/domain-event");

describe("Publish Estate Created Event", () => {

  let mockedRepositoryClass: jest.MockedObjectDeep<typeof DomainEventsRepository> = jest.mocked(DomainEventsRepository);

  beforeAll(() => {
    jest.useFakeTimers()
      .setSystemTime(new Date());
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it(".generates right DomainEvent", async () => {

    // Arrange

    const generatedDto = getRandomEstateAttributes();
    mockedRepositoryClass.prototype.publish.mockImplementationOnce(async () => { });

    // Act

    await publishEstateCreatedEvent(generatedDto);
    const repositoryInstance = mockedRepositoryClass.mock.instances[0];

    // Assert

    expect(mockedRepositoryClass).toHaveBeenCalled();
    expect(repositoryInstance.publish).toHaveBeenCalledTimes(1);
    
    expect(repositoryInstance.publish).toHaveBeenCalledWith([{
      name: "ESTATE_CREATED",
      payload: generatedDto,
      date: new Date(),
      source: "estate.data.estate.publish-estate-created-event",
      version: "1.0.0"
    }]);

  });

});