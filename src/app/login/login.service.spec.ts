import { TestBed } from "@angular/core/testing";
import { Service } from "../api/service";

describe("LoginService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: Service = TestBed.get(Service);
    expect(service).toBeTruthy();
  });
});
