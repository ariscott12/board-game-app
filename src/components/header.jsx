const React = require('react');
const Router = require('react-router');
const Link = Router.Link;  

module.exports = React.createClass({
	getInitialState() {
		return {
			text: ''
		}
	},
	render() {
		return (
			<div>
				<input
					value = {this.state.text} 
					onChange = {this.handleInputChange} 
					type = "text" 
					className = "form-control" 
				/>
				<Link to =  {'search/' + this.state.text}  
					value = {this.state.text}
					onClick = {this.handleClick}
					type = "button">
					Add
				</Link>
			</div>
		);
	},
	handleClick() {
	//	console.log(this.state.text);
		this.setState({text: '' });
	},
	handleInputChange(event) {
		this.setState({text: event.target.value });

	}
});