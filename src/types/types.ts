import { number } from "prop-types"

export interface IIngregient {
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


export interface IUser {
    email?: string | null,
    name?: string | null,
    password?: string | null
}

export interface IOrderDetails {
    createdAt: string,
    ingredients: Array<string>
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string,
}

export interface IIngredientsItem {
    data: IIngregient,
    ingredientsCurrent: Array<IIngregient>
}