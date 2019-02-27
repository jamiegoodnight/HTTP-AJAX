import React from 'react';
import axios from 'axios';

class Friends extends React.Component {
    constructor(){
        super();
        this.state={
            friends:[],
            error:''
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
    render(){
        return (    
            <div>
                <h1>Lambda Friends</h1>
                {this.state.friends.map(x => (
                    <div key={x.id}>
                        <h3>{x.name}</h3>
                        <ul>
                            <li>{x.age}</li>
                            <li>{x.email}</li>
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}


export default Friends;