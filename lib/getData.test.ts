// api.test.ts
import { getData, BASE_URL } from "./getData";
import fetchMock from "jest-fetch-mock";

describe("getData", () => {
  it("should return data when the fetch is successful", async () => {
    const mockData = { id: 1, title: "Test Post" };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await getData("/posts/1");
    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/posts/1`);
  });

  it("should return null when the fetch response is not ok", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

    const result = await getData("/posts/1");
    expect(result).toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/posts/1`);
  });

  it("should return null when there is a fetch error", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    const result = await getData("/posts/1");
    expect(result).toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/posts/1`);
  });
});
