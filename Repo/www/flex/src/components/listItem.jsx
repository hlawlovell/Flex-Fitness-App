import React from 'react';


class listItem extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            date: Days[myDate.getDay()]+" - "+myDate.getDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getFullYear(),
            exercises: []
        }
    }

    render(){
        

        return(
            <ListGroup.Item className="exerciseRepsWrap"><a className="exerciseReps">{item.sets}</a></ListGroup.Item>

        )
    }
}

export default listItem;