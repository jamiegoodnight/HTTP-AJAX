import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import EditFriend from './EditFriend';



class Friends extends React.Component {
    constructor(){
    super();
    this.state={
        friends:[],
        name:'',
        age:'',
        email:'',
        nameEdit: '',
        ageEdit:'',
        emailEdit:'',
        error: '',
        modal: false
        }
        this.modalToggle = this.modalToggle.bind(this);
}

componentDidMount(){
 this.getFriends();
}
getFriends(){
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
modalToggle(){ 
    this.setState({
        modal: !this.state.modal
    })
}
// modalToggle(){ 
//     this.setState({
//         modal: !this.state.modal,
//     })
// }
handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state.nameEdit)
}

addFriend = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/friends", {name: this.state.name, age: this.state.age, email: this.state.email})
    .then(res => {
        this.setState(
            {name: '', age: '', email: ''}
         );
         this.getFriends();
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

// updateFriendForm = (e, friend) => {
//     e.preventDefault();
//     this.setState({
//       activeFriend: friend
//     });
// }

// updateFriend = id => {
//     this.setState({
//       friends: this.state.friends.map(x => {
//         if (x.id === id) {
//           this.setState({nameEdit: x.name, ageEdit: x.age, emailEdit: x.email});
//           return {
//             id: x.id,
//             name: x.name,
//             age: x.age,
//             email: x.email,
//           };
//         }
//         else {
//           return x;
//         }
//       })
//     });
//   }

  submitUpdate = (e, id) => {
    e.preventDefault();
    console.log(id);
    axios.put(`http://localhost:5000/friends/${id}`, {name: this.state.nameEdit, age: this.state.ageEdit, email: this.state.emailEdit})
    .then(res => {
     console.log({name: this.state.nameEdit, age: this.state.ageEdit, email: this.state.emailEdit});
      this.setState({nameEdit: '', ageEdit: '', emailEdit: ''});
      this.getFriends();
      
    })
    .catch(err => {
      // console.log('There was an error', err);
    });
  }

// updateItem = (e, item) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:5000/${item.id}`, item)
//       .then(res => {
//         this.setState({
//           activeItem: null,
//           items: res.data
//         });
//         this.props.history.push("/item-list");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };


render(){
    if (this.state.friends.length === 0){
        return ( 
        <h1>Loading Lambda Friends...</h1>
        )
    }
    return (    
        <div>
            <h1>Lambda Friends</h1>
            {this.state.friends.map((x, index) => (
                <div key={x.id}>
                    <h3>{x.name} / {x.age}</h3>
                    <p>{x.email}</p>
                    <button onClick={e => this.updateFriend(e, x)}>Edit Friend</button>
                    <button onClick={e => this.unFriend(e, x.id)}>Delete Friend</button>
                    <EditFriend 
                    submitUpdate={this.submitUpdate}
                    handleChange={this.handleChange}
                    nameEdit={this.state.nameEdit}
                    ageEdit={this.state.ageEdit}
                    emailEdit={this.state.emailEdit}
                    x={x}
                    />
                    <div>
        <Button color="danger" onClick={e => this.modalToggle(e,index)}>{x.name}</Button>
        {/* <Modal isOpen={this.state.modal} onClick={e => this.modalToggle(e,index)} className={x.name}>
          <ModalHeader toggle={this.modalToggle}>{x.name}</ModalHeader> */}
        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={x.name}>>
          <ModalHeader toggle={this.modalToggle}>{x.name}</ModalHeader>
          <ModalBody>
            {x.email}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => this.modalToggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={e => this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
                </div>
            ))}
            <div>
                <h3>Add a Lambda Friend</h3>
                <form id="friend-form" onSubmit={e => this.addFriend(e)}>
                    <input 
                    type="string" 
                    name="name" 
                    value={this.state.name}
                    placeholder="name"
                    onChange={this.handleChange}
                    />
                    <input 
                    type="string" 
                    name="age" 
                    value={this.state.age}
                    placeholder="age"
                    onChange={this.handleChange}
                    />
                    <input 
                    type="string" 
                    name="email" 
                    value={this.state.email}
                    placeholder="email"
                    onChange={this.handleChange}
                    />
                    <button>Add Your New Friend</button>
                    <Button color="danger" onClick={this.modalToggle}>hi</Button>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>"hi"</ModalHeader>
          <ModalBody>
            "hey"
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalToggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
                </form>
            </div>
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
















// class Friends extends React.Component {
//     constructor(){
//         super();
//         this.state={
//             friends:[],
//             error:'',
//             friend: {
//                 name: '',
//                 age: '',
//                 email: ''
                
//         };
//     }

//     componentDidMount(){
//         axios
//             .get('http://localhost:5000/friends')
//             .then(res => {
//                 console.log(res);
//                 this.setState({
//                     friends: res.data
//                 })
//             })
//             .catch(err => {
//                 console.log(err);
//                 this.setState({
//                     error: err
//                 })
//             })
//     }

//     handleChange = e => {
//         this.setState({
//             friend: {
//                 ...this.state.friend,
//                 [e.target.name]: e.target.value,
//             }
//         })
//     }


//     addFriend = (e, friend) => {
//         e.preventDefault();
//         axios
//         .post("http://localhost:5000/friends", friend)
//         .then(res => {
//             this.setState({
//                 friends: res.data
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     unFriend = (e, id) => {
//         e.preventDefault();
//         axios
//         .delete(`http://localhost:5000/friends/${id}`)
//         .then(res => {
//             this.setState({
//                 friends: res.data
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }

//     // updateFriendForm = (e, friend) => {
//     //     e.preventDefault();
//     //     this.setState({
//     //       activeFriend: friend
//     //     });
//     // }

//     updateFriend = (e, friend) => {
//         e.preventDefault();
//         axios
//           .put(`http://localhost:5000/${friend.id}`, friend)
//           .then(res => {
//             this.setState({
//               activeItem: null,
//               items: res.data
//             });
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       };

    
//     // updateItem = (e, item) => {
//     //     e.preventDefault();
//     //     axios
//     //       .put(`http://localhost:5000/${item.id}`, item)
//     //       .then(res => {
//     //         this.setState({
//     //           activeItem: null,
//     //           items: res.data
//     //         });
//     //         this.props.history.push("/item-list");
//     //       })
//     //       .catch(err => {
//     //         console.log(err);
//     //       });
//     //   };


//     render(){
//         if (this.state.friends.length === 0){
//             return ( 
//             <h1>Loading Lambda Friends...</h1>
//             )
//         }
//         return (    
//             <div>
//                 <h1>Lambda Friends</h1>
//                 {this.state.friends.map(x => (
//                     <div key={x.id}>
//                         <h3>{x.name} / {x.age}</h3>
//                         <p>{x.email}</p>
//                         <button onClick={e => this.updateFriend(e, x)}>Edit Friend</button>
//                         <button onClick={e => this.unFriend(e, x.id)}>Delete Friend</button>
//                     </div>
//                 ))}
//                 <di>
//                     <h3>Add a Lambda Friend</h3>
//                     <form id="friend-form" onSubmit={e => this.addFriend(e, this.state.friend)}>
//                         <input 
//                         type="string" 
//                         name="name" 
//                         value={this.state.friend.name}
//                         placeholder="name"
//                         onChange={this.handleChange}
//                         />
//                         <input 
//                         type="string" 
//                         name="age" 
//                         value={this.state.friend.age}
//                         placeholder="age"
//                         onChange={this.handleChange}
//                         />
//                         <input 
//                         type="string" 
//                         name="email" 
//                         value={this.state.friend.email}
//                         placeholder="email"
//                         onChange={this.handleChange}
//                         />
//                         <button>Add Your New Friend</button>
//                     </form>
//                 </di>
//             </div>
//         );
//     }
// }









































// constructor(){
//     super();
//     this.state={
//         friends:[],
//         name:'',
//         age:'',
//         email:'',
//         nameEdit: '',
//         ageEdit:'',
//         emailEdit:'',
//         error: ''
// }
// }

// componentDidMount(){
//  this.getFriends();
// }

// getFriends(){
//     axios
//     .get('http://localhost:5000/friends')
//     .then(res => {
//         console.log(res);
//         this.setState({
//             friends: res.data
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         this.setState({
//             error: err
//         })
//     })
// }

// handleChange = e => {
//     this.setState({
//         [e.target.name]: e.target.value
//     })
// }

// addFriend = e => {
//     e.preventDefault();
//     axios
//     .post("http://localhost:5000/friends", {name: this.state.name, age: this.state.age, email: this.state.email})
//     .then(res => {
//         this.setState(
//             {name: '', age: '', email: ''}
//          );
//          this.getFriends();
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// unFriend = (e, id) => {
//     e.preventDefault();
//     axios
//     .delete(`http://localhost:5000/friends/${id}`)
//     .then(res => {
//         this.setState({
//             friends: res.data
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // updateFriendForm = (e, friend) => {
// //     e.preventDefault();
// //     this.setState({
// //       activeFriend: friend
// //     });
// // }

// // updateFriend = id => {
// //     this.setState({
// //       friends: this.state.friends.map(x => {
// //         if (x.id === id) {
// //           this.setState({nameEdit: x.name, ageEdit: x.age, emailEdit: x.email});
// //           return {
// //             id: x.id,
// //             name: x.name,
// //             age: x.age,
// //             email: x.email,
// //           };
// //         }
// //         else {
// //           return x;
// //         }
// //       })
// //     });
// //   }

//   submitUpdate = (e, id) => {
//     e.preventDefault();
//     // console.log('editing');
//     axios.put(`http://localhost:5000/friends/${id}`, {name: this.state.nameEdit, age: this.state.ageEdit, email: this.state.emailEdit})
//     .then(res => {
//       // console.log('Response', res);
//       this.setState({nameEdit: '', ageEdit: '', emailEdit: ''});
      
//     })
//     .catch(err => {
//       // console.log('There was an error', err);
//     });
//   }

// // updateItem = (e, item) => {
// //     e.preventDefault();
// //     axios
// //       .put(`http://localhost:5000/${item.id}`, item)
// //       .then(res => {
// //         this.setState({
// //           activeItem: null,
// //           items: res.data
// //         });
// //         this.props.history.push("/item-list");
// //       })
// //       .catch(err => {
// //         console.log(err);
// //       });
// //   };


// render(){
//     if (this.state.friends.length === 0){
//         return ( 
//         <h1>Loading Lambda Friends...</h1>
//         )
//     }
//     return (    
//         <div>
//             <h1>Lambda Friends</h1>
//             {this.state.friends.map(x => (
//                 <div key={x.id}>
//                     <h3>{x.name} / {x.age}</h3>
//                     <p>{x.email}</p>
//                     <button onClick={e => this.updateFriend(e, x)}>Edit Friend</button>
//                     <button onClick={e => this.unFriend(e, x.id)}>Delete Friend</button>
//                     <EditFriend 
//                     submitUpdate={this.submitUpdate}
//                     handleChange={this.handleChange}
//                     name={this.state.nameEdit}
//                     age={this.state.ageEdit}
//                     email={this.state.emailEdit}
//                     x={x}
//                     />
//                 </div>
//             ))}
//             <div>
//                 <h3>Add a Lambda Friend</h3>
//                 <form id="friend-form" onSubmit={e => this.addFriend(e)}>
//                     <input 
//                     type="string" 
//                     name="name" 
//                     value={this.state.name}
//                     placeholder="name"
//                     onChange={this.handleChange}
//                     />
//                     <input 
//                     type="string" 
//                     name="age" 
//                     value={this.state.age}
//                     placeholder="age"
//                     onChange={this.handleChange}
//                     />
//                     <input 
//                     type="string" 
//                     name="email" 
//                     value={this.state.email}
//                     placeholder="email"
//                     onChange={this.handleChange}
//                     />
//                     <button>Add Your New Friend</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
// }


