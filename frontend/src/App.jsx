import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Offers from './pages/Offers'
import CategoryPage from './pages/CategoryPage'
import Search from './pages/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Account />} />
        <Route path="offers" element={<Offers />} />
        <Route path="fruits" element={<CategoryPage category="fruits" />} />
        <Route path="meat" element={<CategoryPage category="meat" />} />
        <Route path="seafood" element={<CategoryPage category="seafood" />} />
        <Route path="dairy" element={<CategoryPage category="dairy" />} />
        <Route path="bakery" element={<CategoryPage category="bakery" />} />
        <Route path="drinks" element={<CategoryPage category="drinks" />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  )
}

export default App
