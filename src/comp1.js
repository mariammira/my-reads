import "./comp1.css";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import { useState, useEffect } from "react";

import  BookInfo  from './bookInfo'
function Comp1(props) {
  const [groupedBooks, setGroupedBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [search, setSearch] = useState('');
  const[refresh,setRefresh]= useState(false);
  const changeShelf =async(book,shelf)=>{
  
    await BooksAPI.update(book,shelf).then(setRefresh(!refresh))
  }
  useEffect(() => {
    const getBooks = async () => {
      const res = props.showSearchPage&&search?await BooksAPI.search(search,5): await BooksAPI.getAll();
      if(res ){
        if(props.showSearchPage){
          
          setSearchBooks(res.error?[]:res)
        }
        else{
            var grougedData={}
            for(let i=0;i<res.length;i++){
            if(grougedData[res[i].shelf]) grougedData[res[i].shelf].push (res[i])
            else grougedData[res[i].shelf] =[res[i]]
            }
          
            setGroupedBooks(grougedData)
      }}
    };
  
     getBooks();
    
  }, [props.showSearchPage,search,refresh]);

  return (
    <div className="Comp1">
      {props.showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
          <Link className="close-search" to="/">
        Close
      </Link>
           
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={search}
                onChange={e => setSearch(e.target.value)}

              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {searchBooks?searchBooks.map((book)=>(<li key={book.id}><BookInfo  onUpdateShelf={changeShelf}  info={book}/> </li>)):(<li></li>)}
            </ol>
          </div>
        </div>
      ) : (
      < div className="list-books">
        
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          
          <div className="list-books-content">
            <div>
            { 
         Object.keys(groupedBooks).map((key) =>(
          <div key={key} className="bookshelf">
          <h2 className="bookshelf-title">{key}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {groupedBooks[key].map((book)=>(<li key={book.id}>
                <BookInfo  onUpdateShelf={changeShelf} info={ book }/>
              </li>))}
             
            </ol>
          </div>
        </div>))
              }
             
            </div>
          </div>
          <div className="open-search">
            <Link className="close-search" to="/search">
            Add a book
      </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comp1;
