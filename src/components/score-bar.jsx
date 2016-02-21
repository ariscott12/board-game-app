"use strict";

const React = require('react');

module.exports = React.createClass({
	componentWillMount() {
		this.barstyle = {
			width: this.getPercent(this.state.score)
		}
  	},
  	getPercent(num) {
  		return num * 10 + "%";
  	},
  	getInitialState() {
    	return {
      		score: this.props.score  
    	}
  	},
  	render() {
  		return <div className = "scorebar">
  			<div className = {this.props.color + " scorebar-inner"} style = {this.barstyle}>	</div>
  	    <span className = "score">{this.state.score}</span>
    	</div>
     
  	}
});