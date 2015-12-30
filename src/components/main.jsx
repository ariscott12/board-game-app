var React = require('react');
var Api = require('../api.jsx');


module.exports = React.createClass({
  render: function() {
    return <div>
       
    </div>
  },
  getInitialState:function() {
    return {
      data: null
    }
  },
  setData: function() {
    
  },
  componentWillMount: function() {
    Api.get('test').then(function(json) {
      console.log(json.items.item);

      // this.setState({
      //   data: json.items.item[0].statistics[0].ratings
      // })
      // this.state.data.map(function(content) {
      //   console.log(content.average);
      // })

      
    }.bind(this));
  },

});





