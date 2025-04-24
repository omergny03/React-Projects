import { Drawer } from '@mui/material';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import RouterConfig from './config/RouterConfig';
import PageContainer from './container/PageContainer';
import { useSelector } from 'react-redux';
import './css/Product.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { calculateTotalPrice, deleteBasketProduct, setBasketLoad } from './redux/slices/basketSlice';
import { useEffect } from 'react';

function App() {
  const{basketProducts,totalPrice,basketLoad}= useSelector((store)=>store.basket)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(calculateTotalPrice())
  },[basketProducts])
  
  const handle = ()=>{
    navigate('/basket')
    dispatch(setBasketLoad())
  }
  return (
    <div className="App">
        <PageContainer>
          <Header/>
          <hr style={{marginTop:'0px'}}/>
          <RouterConfig/>
          <Loading/>
          <Drawer anchor='right' open={basketLoad} onClose={()=>dispatch(setBasketLoad())}>
          {
            basketProducts && basketProducts?.map((product)=>{
              return (
               <div key={product.id}>
                  <div className='card'>
                <img className='image' src={product.image} alt="" />
                <div style={{marginTop:'-15px'}}>
                <p style={{padding:'5px'}}>{product.title}</p>
                <h3 style={{textAlign:'center'}}>{(product.price)*product.count} $</h3>
                <h4 style={{textAlign:'center'}}> Adet : {product.count} </h4>
                </div>
                 <div style={{marginBottom:'10px'}}>
                 <button className='button' onClick={()=>navigate('/product/'+product.id)}><b>Detay</b></button>  
                 <button className='button' onClick={()=>dispatch(deleteBasketProduct(product))} style={{marginLeft:'10px',color:'red'}}><b>Sil</b></button>  
                </div> 
                </div>

               </div>
              )
            })
          }
          <div className='pay'>
            <h4 style={{border:'2px solid black',padding:'8px'}}>Toplam : {totalPrice}$</h4>
            <button onClick={handle} className='button' style={{color:'red',marginBottom:'10px'}}><b>Ödeme</b></button>
          </div>
          </Drawer> 
        </PageContainer>
    </div>
  );
}
export default App;
