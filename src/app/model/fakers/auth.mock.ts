import { faker } from '@faker-js/faker';

export const GenerateOneAuth = () => {
    return {
        body:[{
            id: faker.datatype.uuid(),                    
            name: faker.name.firstName,
            userDetails :[{
                        password: faker.internet.password
                        }]
        }]
    };
}

export const GenerateManyAuth = (size = 1): any[] => {
    const items = [];
    for (let index = 0; index < size; index++) {
        items.push(GenerateOneAuth);
    }
    //return [...items];
    return items;
}