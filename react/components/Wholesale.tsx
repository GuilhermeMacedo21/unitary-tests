import React, { useState } from 'react'
import {useProduct} from 'vtex.product-context'
import './App.css'

function Wholesale({discount,totalDiscount}: Props) {
  const product = useProduct()
  const qntdMax = product.selectedItem.sellers[0].commertialOffer.AvailableQuantity
  const price = product.selectedItem.sellers[0].commertialOffer.Price


  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice,setTotal] = useState<number>(0)
  const [message,setMessage] = useState<boolean>(false)

  const altQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(quantity>qntdMax){
      setQuantity(qntdMax)
    }else{
      setQuantity(parseInt(e.target.value));
    }    
  }

  const increase = () => {
    if(quantity>=qntdMax){
      setQuantity(qntdMax)
    }else{
      setQuantity(quantity + 50);
    }    
  }
  const decrease = () => {
    if(quantity>=qntdMax){
      setQuantity(qntdMax)
    } else if(quantity <= 49){
      setQuantity(0)
    }else{
      setQuantity(quantity - 50)
    }    
  }
  const calcDiscount = () =>{
    let actualDiscount = 0;
    let contador = 100;
    if(discount==null){
      discount = 0
    }
    if(totalDiscount ==null){
      totalDiscount=0
    }
    if(quantity>qntdMax){
      return
    }
    while(contador<=quantity && actualDiscount<=totalDiscount){
      actualDiscount += discount;
      contador+=100
    }
    setTotal((price - (price*(actualDiscount/100)))*quantity)
    setMessage(true)
  }

  return(
    <>
      <div className='mv5'>
        <h3 className='di fw4'>Preço unitário:<p className='di b'>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></h3>
      </div>
      <h4 className='fw4'>Insira a quantidade que deseja, assim será possível calcular o desconto a ser aplicado</h4>      
      <p><p className='red di b'>OBS:</p>A cada 100 unidades terá {discount}% de desconto, até {totalDiscount}% de desconto.</p>

      <p className='black'>Quantidade em estoque: {qntdMax}</p>

      <div className='pa3'>
        <input className='w-20 pa3 tr mr3 h2 di bg-light-gray br3' type="number" name="quantity" id="quantity" onChange={altQuantity} value={quantity || ''} /> 
        <div className='h2 ba di ph2 bg-light-blue br3 pv2 mv2 pointer' onClick={decrease}>
          <img className='mw1' src="https://cdn-icons-png.flaticon.com/512/43/43731.png" alt="Menor que" />
        </div>
        <div className='h2 ba di ph2 bg-light-blue br3 pv2 mh2 pointer' onClick={increase}>
          <img className='mw1 '  src="https://cdn-icons-png.flaticon.com/512/43/43478.png" alt="Maior que" /> 
        </div>
      </div>

      <button className="red" onClick={calcDiscount} type='button'>Verificar desconto</button> 

        {message && 
          <div id='message'>
            <h3>Quantidade: {quantity}</h3>
            <h2>Preço total com desconto: {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
          </div>
        }  

    </>
  ) 
}

export default Wholesale
