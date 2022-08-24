declare module 'vtex.styleguide';
declare module 'vtex.product-context';

interface ContextType {
    comments: Comment[]
}
interface Data {
    documents: Document[]
}
interface Document {
    fields: Field[]
}
interface Field {
    key:string,
    value:string
}
interface Comment {
    userResponsible: string,
    dateComment:string,
    grade:string,
    userComment:string
    productEvaluated?:number
}
