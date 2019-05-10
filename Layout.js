import React ,{Component} from 'react';
import Toolbar from './Toolbar';
import Login from './Login'; 

class Layout extends Component{
    state={
        show:false,
      id:0
    }



    clickedHandler=()=>{
        this.setState({show:true});
    }
    render(){
        let content=<Login clicked={this.clickedHandler}   />;
     
        if(this.state.show){
            content=<Toolbar/>;
           
        }
        
        return(
            <div>
                {content}
            </div>
        );
    }
}

export default Layout;