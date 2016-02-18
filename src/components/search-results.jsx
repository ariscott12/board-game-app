"use strict";

const React = require('react');
const Reflux = require('reflux');
const Actions = require('../actions');
const searchStore = require('../stores/search-store');
const GamePreview = require('./game-preview');

module.exports = React.createClass({
    mixins: [
        // listens for any events that are coming from searchStore, 
        // call onChange function when event triggered by store
        Reflux.listenTo(searchStore, 'onChange'),
    ],
    getInitialState: function() {
        return {
            gameIds: null
        }
    },
    componentWillMount() {
        Actions.getSearchResults(this.props.params.query);
    },
    componentWillReceiveProps(nextProps) {        
        if(this.props.params.query != nextProps.params.query ) {
            this.setState({
              gameIds: null
            });
            Actions.getSearchResults(nextProps.params.query);
        }
    },
    onChange(event, searchResults) {
        // Check if there are any results, if not set gameIds to 0
        if(searchResults) {
          let gameIds = [];
          searchResults.slice(0,21).map((content) => {
              gameIds.push(content.$.id);
          });
          this.setState({
              gameIds: gameIds
          });
        } else {
          this.setState({
              gameIds: 'no-results'
          });
        }
    },
    render() {
        return <div> {this.state.gameIds ? this.content() : null} </div>
    },
    content() {
        if(this.state.gameIds === 'no-results') {
          return <h2>There are no results for your search</h2>
        } else {
          return <GamePreview ids = {this.state.gameIds} />
        }
        
    }
});