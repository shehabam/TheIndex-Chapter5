import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import BookList from './BookList'
// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      loading: true
    };
  }

  fetchAllAuthors() {
    return instance.get("/api/authors/").then(res => res.data);
  }

  componentDidMount() {
    this.fetchAllAuthors()
      .then(authors =>
        this.setState({
          authors: authors,
          loading: false
        })
      )
      .catch(err => console.error(err));
  }

  getView() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route path="/authors/" render={props => <AuthorsList {...props} authors={this.state.authors} />} />
          <Route path="/books/" render={props => <BookList {...props}/>} />
        </Switch>;
    }
  }

  render() {
    return <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getView()}</div>
          {/* <BookList /> */}
        </div>
      </div>;
  }
}

export default App;
