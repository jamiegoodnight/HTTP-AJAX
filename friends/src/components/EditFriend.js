import React from 'react';

function EditFriend(props) {
    return (
        <div>
            <form id="friend-form" onSubmit={e => props.submitUpdate(e, props.x.id)}>
                <input 
                type="string" 
                name="nameEdit" 
                value={props.nameEdit}
                placeholder={props.x.name}
                onChange={props.handleChange}
                />
                <input 
                type="string" 
                name="ageEdit" 
                value={props.ageEdit}
                placeholder={props.x.age}
                onChange={props.handleChange}
                />
                <input 
                type="string" 
                name="emailEdit" 
                value={props.emailEdit}
                placeholder={props.x.email}
                onChange={props.handleChange}
                />
                <button>Edit Your Old Friend</button>
            </form>
        </div>    
    )
}

export default EditFriend;


