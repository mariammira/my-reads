
function BookInfo(props) {
 

  return (
    <div className="BookInfo">
      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:`url("${(props.info.imageLinks&&props.info.imageLinks.smallThumbnail)?props.info.imageLinks.smallThumbnail:''}")`
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select  value={props.info.shelf}  onChange={(e) => props.onUpdateShelf(props.info,e.target.value)}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{props.info.title}</div>
                        {(props.info&&props.info.authors)? props.info.authors.map((author)=>(<div key={author} className="book-authors">{author}</div>)):(<div></div>)}
                        
                      </div>
                      </div>
    );
}

export default BookInfo;