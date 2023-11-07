

export type Ingregient = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
    key?: string,
}


export type User = {
    email?: string | null,
    name?: string | null,
    password?: string | null
}

export type OrderDetails = {
    createdAt: string,
    ingredients: Array<string>
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string,
}

export type IIngredientsItem = {
    data: Ingregient,
    ingredientsCurrent: Array<Ingregient>
}