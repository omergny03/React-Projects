import './App.css'
import Loading from './components/Loading'
import RouterConfig from './config/RouterConfig'
import PageContainer from './container/PageContainer'
import Header from './pages/Header'
import './css/home.css'

function App() {
  return (
    <PageContainer>
       <Header/>
       <hr style={{marginTop:'0px'}} className='arkaplanimage'/>
       <RouterConfig/>
       <Loading/>

    </PageContainer>
  )
}

export default App
