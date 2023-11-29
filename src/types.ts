import { Timestamp } from "firebase/firestore"

export type Product = {
    id?: string,
    title: string,
    description: string,
    isDeleted: boolean,
    creationDate: Timestamp,
    creatorUserId: string,
    creatorUsername: string,
    imageUrl: string,
    categories: string[],
    comments: Comment[],
}

export type Comment = {
    id?: string,
    description: string,
    creationDate: Timestamp,
    isDeleted: boolean,
    creatorUserId: string,
}

export type Category = {
    id?: string,
    name: string,
}

export type User = {
    id?: string,
    email: string,
    username: string,
    isAdmin: boolean,
}
