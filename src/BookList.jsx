import React, { Component } from 'react';
import BookTable from './BookTable'
import axios from "axios";
import SearchBar from './SearchBar'
class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfBooks : [],
            filteredBooks: []
        }
        this.filterBooks = this.filterBooks.bind(this);
        
    }
    

    componentDidMount() {
        axios.get('https://the-index-api.herokuapp.com/api/books')
        .then(res => res.data)
        .then(data => this.setState({listOfBooks: data, filteredBooks: data}))
        .then(() => console.log(this.data, this.state.listOfBooks))

          .catch(err => console.error(err));
    }
    filterBooks(query) {
        query = query.toLowerCase();
        let filteredBooks = this.state.listOfBooks.filter(book => {
            return `${book.title}`.toLowerCase().includes(query);
        });
        this.setState({ filteredBooks });
    }
    render() { 

        return ( 
            <div>
                <SearchBar changeHandler={this.filterBooks}/>
                <BookTable books={ this.state.filteredBooks } />
            </div>
         );
    }
}
 
export default BookList;