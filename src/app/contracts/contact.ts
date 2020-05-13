import { ContactType } from "./contact-type"
export interface IContact {
    id: number
    type: ContactType
    name: string
    email: string
    address: string
}