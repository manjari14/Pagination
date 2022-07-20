import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css';


function Items({ currentItems }) {
  return (
    <div className='map'>
      {currentItems &&
        currentItems.map((item) => (
          <div className='flex-container'>
            <h3>
            <img src={item.thumbnail}/></h3>
          </div>
        ))}
    </div>
  );
}

const App = () => {
  const itemsPerPage = 5 
  const[totalItems, setItems]=useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
 
  const [itemOffset, setItemOffset] = useState(0);

  
  useEffect(() => {
    axios.get(" https://dummyjson.com/products")
      .then((response) => {
        const items = response.data.products
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
        setItems(items)
        console.log(response.data)
      });
    }, []);
    useEffect(() => {
     
          const items = totalItems
          const endOffset = itemOffset + itemsPerPage;
          console.log(`Loading items from ${itemOffset} to ${endOffset}`);
          setCurrentItems(items.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(items.length / itemsPerPage));
         
        
      }, [itemOffset]);
  
    
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % totalItems.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };



 
return (
  <>
    <Items currentItems={currentItems} />
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  </>
);
};

export default App