import { auth } from "../utilities";
import Chance from "chance";

const chance = new Chance();

describe("Sign-up", () => {

    it(".signs up", async () => {

        const name = chance.name();
        const email = chance.email();
        const phoneNumber = chance.phone();
        const password = chance.string({ alpha: true, numeric: true, symbols: true, length: 20 });

        const signUpParams = {
            password,
            username: email,
            phoneNumber,
            attributes: {
                name
            }
        };

        console.log("SP:", signUpParams);

        await auth.signUp(signUpParams);

    });

})