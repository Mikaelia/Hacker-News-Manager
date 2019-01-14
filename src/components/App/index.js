import React, { Component } from "react";
import axios from "axios";

import Table from "../Table";
import Search from "../Search";
import { ButtonWithLoading } from "../Button";
import updateSearchTopStoriesState from "../updateTopStoriesState";

import "../../css/style.css";

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  SORTS
} from "../../constants";

class App extends Component {
  _isMounted = false;

  state = {
    searchKey: "",
    searchTerm: DEFAULT_QUERY,
    results: null,
    error: null,
    isLoading: false,
    sortKey: "NONE",
    isSortReverse: false
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this._isMounted = true;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMoutned && this.setState({ error }));
  };

  setSearchTopStories = result => {
    const { hits, page } = result;
    // Passing function to setState to prevent setState batching errors
    // Next state depends on previous state
    this.setState(updateSearchTopStoriesState(hits, page));
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };

  onSearchSubmit = e => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    e.preventDefault();
  };

  onSort = sortKey => {
    // If isSortReversed is false for sortKey, make true
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  };

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  };

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
      isSortReverse,
      sortKey
    } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="page">
        <h1 className="app-header">Hacker News Client</h1>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong</p>
          </div>
        ) : (
          <Table
            list={reverseSortedList}
            onDismiss={this.onDismiss}
            onSort={this.onSort}
            activeSortKey={sortKey}
          />
        )}
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
