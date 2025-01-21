import './App.css'
import RouterConfig from './config/RouterConfig'
import PageContainer from './container/PageContainer'
import Header from './pages/Header'

function App() {
  return (
    <PageContainer>
       <Header/>
       <hr style={{marginTop:'0px'}}/>
       <RouterConfig/>

    </PageContainer>
  )
}

export default App
