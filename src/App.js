import AddProduct from './AddProduct';
import './App.css';
import ProductList from './ProductList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persister } from './store/store';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Router>
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
