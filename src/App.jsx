
import './App.css'
import Footer_Nav from './assets/Components/Dashboard/Footer_Nav'
import Search from './assets/Components/Dashboard/Search'
import Tranactions from './assets/Components/Dashboard/Tranactions'
import Summary_Cards from './assets/Components/Dashboard/Summary_Cards'
import Header from './assets/Components/Dashboard/Header'
import Group_Business from './assets/Components/Dashboard/Group_Business'

function App() {


  return (
    <>
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">

    
     <Header></Header>
     <Group_Business></Group_Business>
      <Summary_Cards></Summary_Cards>
      <Search></Search>
      <Tranactions></Tranactions>
      <button className="absolute right-6 bottom-14 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center z-40 transition active:scale-95">
        <span className="text-3xl font-bold leading-none">+</span>
      </button>
      <Footer_Nav></Footer_Nav>
    
    </div>
    </>
  )
}

export default App
