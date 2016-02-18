const React = require('react');
const Router = require('react-router');
const Link = Router.Link;  
const utils = require('../utils/utils');

module.exports = React.createClass({
	getInitialState() {
		return {
			text: "",
			selectValue: "boardgame"
		}
	},

	render() {
		return (
			<div>
				<Link to = {"/"} >Home</Link>
				<input
					value = {this.state.text} 
					onChange = {this.handleInputChange} 
					type = "text" 
					className = "form-control" 
				/>
				<select 
					value={this.state.selectValue} 
        			onChange={this.handleSelectChange}
        			>
  					<option value="boardgame">Board Game</option>
  					<option value="boardgameaccessory">Board Game Accessory</option>
  					<option value="boardgameexpansion">Board Game Expansion</option>
				</select>
				<Link to =  {"search/" + utils.replaceSpaces(this.state.text) + "&type=" + this.state.selectValue}  
					value = {this.state.text}
					onClick = {this.handleClick}
					type = "button">
					Add
				</Link>
			</div>
		);
	},
	handleClick() {		
		this.setState({text: '' });
	},
	handleSelectChange(event) {
		this.setState({selectValue:event.target.value});
	},
	handleInputChange(event) {
		this.setState({text: event.target.value });

	}
});