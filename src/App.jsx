
import './App.css'
import Footer_Nav from './assets/Components/Footer_Nav'
import Income_Expense from './assets/Components/Summary_Cards'
import Search from './assets/Components/Search'
import Tranactions from './assets/Components/Tranactions'
import Summary_Cards from './assets/Components/Summary_Cards'
import Group_Business from './assets/Components/Group_Business'
import Header from './assets/Components/Header'

function App() {


  return (
    <>
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">

    
     <Header></Header>
     <Group_Business></Group_Business>
      <Summary_Cards></Summary_Cards>
      <Search></Search>
      <Tranactions></Tranactions>
      <Footer_Nav></Footer_Nav>
    
    </div>
    </>
  )
}

export default App
