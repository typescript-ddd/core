import { Price } from "../..";

describe("Price", () => {
    it("Should be created", () => {
        const price = Price.create({amount: 100, currency: "USD"});
        expect(price).toBeDefined();
        expect(price.value).toStrictEqual({amount: 100, currency: "USD"});
    });

    it("Should not allow a negative amount", () => {
        const createPrice = () => {
            try {
                Price.create({amount: -100, currency: "USD"});
            } catch(err: unknown) {
                expect(err).toBeInstanceOf(Error);
                expect((err as Error).message).toBe("Price amount must be greater than or equal to 0");
                throw err;
            }
        }
        expect(createPrice).toThrow();
    });

    it("Should require a currency to be three characters", () => {
        const createPrice = () => {
            try {
                Price.create({amount: 100, currency: "US"});
            } catch(err: unknown) {
                expect(err).toBeInstanceOf(Error);
                expect((err as Error).message).toBe("Price currency must be exactly 3 characters");
                throw err;
            }
        }
        expect(createPrice).toThrow();
    });
});