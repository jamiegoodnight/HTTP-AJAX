import React from 'react';
import axios from 'axios';

class Friends extends React.Component {
    constructor(){
        super();
        this.state={
            friends:[],
            error:'',
            friend: {
                id: '',
                name: '',
                email: ''
            }
        };
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/friends')
            .then(res => {
                console.log(res);
                this.setState({
                    friends: res.data
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err
                })
            })
    }

    handleChange = e => {
        this.setState({
            friend: {
                [e.target.name]: e.target.value,
            }
        })
    }

    render(){
        if (this.state.friends.length === 0){
            return ( 
            <h1>Loading Lambda Friends...</h1>
            )
        }
        return (    
            <div>
                <h1>Lambda Friends</h1>
                {this.state.friends.map(x => (
                    <div key={x.id}>
                        <h3>{x.name} / {x.age}</h3>
                        <p>{x.email}</p>
                        <button>Edit Friend</button>
                        <button>Delete Friend</button>
                    </div>
                ))}
                <di>
                    <h3>Add a Lambda Friend</h3>
                    <form>
                        <input 
                        type="string" 
                        name="name" 
                        value={this.state.friend.name}
                        placeholder="name"
                        onChange={this.handleChange}
                        />
                        <input 
                        type="string" 
                        name="email" 
                        value={this.state.friend.email}
                        placeholder="email"
                        onChange={this.handleChange}
                        />
                    </form>
                </di>
            </div>
        );
    }
}


export default Friends;





// componentDidMount(){
//     axios
//     .get('http://www.exampleapi.com/exampledata')
//     .then(res => {
//         this.setState({
//             array: exampledata.data
//         })
//     })
//     .catch(err => {
//         this.setState({
//             error: err
//         })
//     })
// }

