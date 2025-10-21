import { fakerES_MX as faker } from '@faker-js/faker';

export const generateUserData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zip: faker.location.zipCode()
    };
}