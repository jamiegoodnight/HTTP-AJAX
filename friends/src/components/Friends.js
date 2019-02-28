import React from 'react';
import axios from 'axios';

class Friends extends React.Component {
    constructor(){
        super();
        this.state={
            friends:[],
            error:'',
            friend: this.activeItem || {
                name: '',
                age: '',
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
                ...this.state.friend,
                [e.target.name]: e.target.value,
            }
        })
    }

    addFriend = (e, friend) => {
        e.preventDefault();
        axios
        .post("http://localhost:5000/friends", friend)
        .then(res => {
            this.setState({
                friends: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    unFriend = (e, id) => {
        e.preventDefault();
        axios
        .delete(`http://localhost:5000/friends/${id}`)
        .then(res => {
            this.setState({
                friends: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    updateFriendForm
    
    updateFriend


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
                        <button onClick={e => updateFriendForm(e, item)}>Edit Friend</button>
                        <button onClick={e => this.unFriend(e, x.id)}>Delete Friend</button>
                    </div>
                ))}
                <di>
                    <h3>Add a Lambda Friend</h3>
                    <form onSubmit={e => this.addFriend(e, this.state.friend)}>
                        <input 
                        type="string" 
                        name="name" 
                        value={this.state.friend.name}
                        placeholder="name"
                        onChange={this.handleChange}
                        />
                        <input 
                        type="string" 
                        name="age" 
                        value={this.state.friend.age}
                        placeholder="age"
                        onChange={this.handleChange}
                        />
                        <input 
                        type="string" 
                        name="email" 
                        value={this.state.friend.email}
                        placeholder="email"
                        onChange={this.handleChange}
                        />
                        <button>Add Your New Friend</button>
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

