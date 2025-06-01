import nock from "nock";
import { ohMyGot } from "../src/index";

// Disable all outgoing network connections
nock.disableNetConnect();

const testUri = "https://www.test.com";

// note: tests pass in { baseRetryDelay: 1 } to avoid taking too long. Real timing has been tested manually
describe("Got", () => {
  afterEach(async () => {
    nock.cleanAll();
  });

  it("retries using the default retry number", async () => {
    let callsToEndpoint = 0;
    nock(testUri)
      .get("/testEndpoint")
      .times(10) // stub for a max of 10 attempts
      .reply(500, () => {
        callsToEndpoint++;
      });

    await expect(
      ohMyGot({ baseRetryDelay: 1 }).get(`${testUri}/testEndpoint`)
    ).rejects.toThrow();
    expect(callsToEndpoint).toEqual(6);
  });
  it("retries using the provided retry number", async () => {
    let callsToEndpoint = 0;
    nock(testUri)
      .get("/testEndpoint")
      .times(10) // stub for a max of 10 attempts
      .reply(500, () => {
        callsToEndpoint++;
      });

    await expect(
      ohMyGot({ retryLimit: 3, baseRetryDelay: 1 }).get(
        `${testUri}/testEndpoint`
      )
    ).rejects.toThrow();
    expect(callsToEndpoint).toEqual(4);
  });
});
