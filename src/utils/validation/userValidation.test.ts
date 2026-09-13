import { describe, expect, it } from "vitest";
import { validateUser } from "./userValidation";
import type { ICreateUser } from "../../types/user";

const validUser: ICreateUser = {
  name: "Oleksandr",
  username: "alex123",
  email: "alex@example.com",
  phone: "+48123456789",
  website: "example.com",
  city: "Warsaw",
  company: "Test Company",
};

describe("validateUser", () => {
    // Test data user
  it("passes valid user data", () => {
    expect(() => validateUser(validUser)).not.toThrow();
  });

//   Test empty name 
  it("throws when name is missing", () => {
    expect(() =>
      validateUser({ ...validUser, name: "" }),
    ).toThrow("Name is required");
  });

//   test max length name
  it("throws when name is longer than 50 characters", () => {
    expect(() =>
      validateUser({ ...validUser, name: "a".repeat(51) }),
    ).toThrow("Name must be 50 characters or less");
  });

//   Test email formula
  it("throws when email is invalid", () => {
    expect(() =>
      validateUser({ ...validUser, email: "invalid-email" }),
    ).toThrow("Please provide a valid email");
  });
//  Test phone uncorrect
  it("throws when phone contains invalid characters", () => {
    expect(() =>
      validateUser({ ...validUser, phone: "123abc" }),
    ).toThrow("Phone must contain only valid phone characters");
  });
  // Test correct usernma check
  it("throws when username is longer than 30 characters", () =>{
    expect(()=>{
        validateUser({ ...validUser, username: "a".repeat(31) })
    }).toThrow("Username must be 30 characters or less");
  })
//   Test email check
  it("throws when email is missing", () => {
    expect(()=>{
        validateUser({ ...validUser, email: ""})
    }).toThrow("Email is required")
  })
//   Test phone empty
  it("throws when phone is missing", () => {
    expect(()=>{
        validateUser({ ...validUser, phone: ""})
    }).toThrow("Phone is required")
  })
// Test max lenght name website
    it("throws when website is longer than 100 characters", () =>{
    expect(()=>{
        validateUser({ ...validUser, website: "a".repeat(101)})
    }).toThrow("Website must be 100 characters or less");
    })
// Test city empty
    it("throws when city is missing", () =>{
        expect(()=>{
            validateUser({ ...validUser, city: ""})
        }).toThrow("City is required");
    })
// test max length 50 char/name city
    it("throws when city is longer than 50 characters", ()=>{
        expect(()=>{
            validateUser({ ...validUser, city: "b".repeat(51)})
        }).toThrow("City must be 50 characters or less")
    })
// Test company empty 
    it("throws when company is missing", ()=>{
        expect(()=>{
            validateUser({ ...validUser, company: ""})
        }).toThrow("Company is required");
    })
    // test company name lengt higher 100 char/name company
    it("throws when company is longer than 100 characters", ()=>{
        expect(()=>{
            validateUser({ ...validUser, company: "d".repeat(101)})
        }).toThrow("Company must be 100 characters or less")
    })
    // Username is empty Test
    it("throws when username is missing", ()=>{
        expect(()=>{
            validateUser({ ...validUser, username: ""})
        }).toThrow("Username is required")
    })
});


