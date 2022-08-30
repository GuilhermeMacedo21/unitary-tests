import React, { useState } from 'react'
import {useProduct} from 'vtex.product-context'
import './App.css'

function Wholesale({discount = 0,totalDiscount = 0}: Props) {
  const product = useProduct()
  const qntdMax = product.selectedItem.sellers[0].commertialOffer.AvailableQuantity
  const price = product.selectedItem.sellers[0].commertialOffer.Price

  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice,setTotal] = useState<number>(0)
  const [message,setMessage] = useState<boolean>(false)

  const altQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(qntdMax, Number(e.target.value)))
      setQuantity(value);
  }

  const increase = () => {
    if(quantity>=qntdMax){
      setQuantity(qntdMax)
    }else{
      setQuantity(quantity + 50);
    }    
  }
  const decrease = () => {
    if(quantity <= 49){
      setQuantity(0)
    }else{
      setQuantity(quantity - 50)
    }    
  }
  const calcDiscount = () =>{
    let actualDiscount = 0
    let contador = 100
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
      <p><span className='red di b'>OBS:</span>A cada 100 unidades terá {discount}% de desconto, até {totalDiscount}% de desconto.</p>

      <p className='black-90'>Quantidade em estoque: {qntdMax}</p>

      <div className='pa3'>
        <input className='w-20 pa3 tr mr3 h2 di bg-light-gray br3' type="number" name="quantity" id="quantity" onChange={altQuantity} maxLength={qntdMax.toString().length} value={quantity || ''} data-testid="inputNumber"/> 
        <button className='h2 ba di ph2 pv2 mv2 bg-transparent pointer br3' onClick={decrease} data-testid="decrease">
          <img className='mw1' src="https://cdn-icons-png.flaticon.com/512/43/43731.png" alt="Menor que" />
        </button>
        <button className='h2 ba di ph2 pv2 mh2 bg-transparent pointer br3' onClick={increase} data-testid="increase">
          <img className='mw1 '  src="https://cdn-icons-png.flaticon.com/512/43/43478.png" alt="Maior que" /> 
        </button>
      </div>

      <button className="b br4 pa3 ma4 bg-orange pointer" onClick={calcDiscount} id="verifyButton" type='button' data-testid="verifyButton">Verificar desconto</button> 

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
