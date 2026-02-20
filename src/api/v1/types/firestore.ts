export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Date
    | FirebaseFirestore.Timestamp
    | FirebaseFirestore.DocumentReference
    | FirebaseFirestore.GeoPoint
    | FirestoreDataTypes[]
    | { [key: string]: FirestoreDataTypes };