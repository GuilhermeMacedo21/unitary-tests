declare module 'vtex.styleguide';
declare module 'vtex.product-context';

type Props ={
    discount?:number
    totalDiscount?:number
}
interface SelectedItem {
    sellers: Array<{
        commertialOffer:{
            AvailableQuantity:number
            Price: number
        }
    }>
}
  