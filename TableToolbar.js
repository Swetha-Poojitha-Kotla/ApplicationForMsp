
import React ,{Component} from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import axios from '../../../axios-orders';
import {connect } from 'react-redux';
import {onSearch} from '../../../store/actions/getAction';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  
const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
      backgroundColor:'#4cbfa5',
    },
    icon:{
      position: 'relative',
      display: 'flex',
      left:10,
      
    },
    highlight:
    theme.palette.type === '#4cbfa5'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor:'#4cbfa5'
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: '#4cbfa5',
          },
    spacer: {
      flex: '1 1 100%',
    },
    
    actions: {
      color: theme.palette.text.secondary,
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      flex: '0 0 auto',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
     
      backgroundColor: fade(theme.palette.common.white, 0.20),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.10),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
    button: {
      margin: theme.spacing.unit,
      paddingRight:80
    },
  button1:{
   color:'#328c78 ',
  },
  formControl: {
    minWidth: 200,
  },
  button2:{
   color:'#ff0000',
  },
  date:{
     left:500,
     width:220
  },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });
  class EnhancedTableToolbar extends Component{
    constructor(props){
      super(props);
   
    }
    state={
      mOpen:false,
      data:[],
      month:'',
      check:[]
     }
  
   
     
  
    handleChange = plan => event => {
      this.setState({
        [plan]: event.target.value,
      });
    };

  
  

//     handleMChange= monthItem=>event => {
//       console.log(event.target.value);
//      this.setState({month:event.target.value})
// //       const {billingData} = this.props;
// //       this.setState({mOpen:true});
// //     let monthItem=event.target.value;
  
//     console.log("search text :",this.state.month);
// //     console.log(month);
// //     const newMonth=[];
// //     for (let key in billingData){
// //       if(billingData[key].month.includes(monthItem))
// //       newMonth.push({...billingData[key]}.month);
// //     }
// // console.log(newMonth);
// // const month=Object.keys(newMonth)
// //              .map(n=>{  return { "month":newMonth[n]  } })
// // console.log(newMonth);
// //  const data = {month};
// // console.log(data);
//     };
// handleMChange = event => {

  
//   const {newArray,searchFlag,billingData} = this.props;
//   //this.setState({check:newArray});
//   console.log(event.target.value);
//   this.setState({ [event.target.name]: event.target.value });
//   let monthItem=event.target.value;
//   let check=[];
//   if(searchFlag)
//   {
//     check=newArray;
//   }
//   else{
//     check=billingData;
//   }
//       console.log("search text :",monthItem);
//     console.log(month);
//       const newMonth=[];
//       for (let key in check){
//          if(check[key].month.includes(monthItem))
//          newMonth.push({...check[key]});
//        }
//    console.log(check);
//    const month=Object.keys(newMonth)
//                 .map(n=>{  return { "month":newMonth[n]  } })


           
//                 this.props.monthFlagChange(true);
//    console.log(newMonth);
//    //newArray=newMonth.slice();
//    this.props.onSearch(newMonth);

// };
    
    searchHandler=(event,searchData)=>{
     
      const {billingData} = this.props;
      this.setState({mOpen:true});
      let searchItem=event.target.value;
 let newArray=[];
    for(let key in billingData){
      if( billingData[key].customerEmail.toLowerCase().includes(searchItem.toLowerCase()) || billingData[key].month.toLowerCase().includes(searchItem.toLowerCase()) )
      newArray.push({...billingData[key]});
    }
if(newArray.length==0){
  newArray[0]=-1;
}

this.props.onSearch(newArray);

    }
   
  
    render(){
      const { numSelected, classes ,flag ,billingData} = this.props;
      const {data}=this.state
      return(
      <div>
        <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected >0 ,
        })}
      >
        <div className={classes.title}>
                 <Typography variant="title" id="tableTitle">
             Bill Payments
            </Typography>
          
        </div>
        
         {/* <FormControl className={classes.date}>
          <InputLabel htmlFor="month-simple">Month</InputLabel>
          <Select 
            value={this.state.month}
            onChange={this.handleMChange}
            inputProps={{
              name: 'month',
              id: 'month-simple',
            }}
          >
            <MenuItem value={"January"}>  January </MenuItem>
            <MenuItem  value={"February"}>February</MenuItem>
            <MenuItem value={"March"}>March</MenuItem>
            <MenuItem   value={"April"}>April</MenuItem>
            <MenuItem  value={"May"}>May</MenuItem>
            <MenuItem  value={"June"} >June</MenuItem>
            <MenuItem value={"July"}>July</MenuItem>
            <MenuItem value={"August"}>August</MenuItem>
            <MenuItem value={"September"}>September</MenuItem>
            <MenuItem value={"October"}>October</MenuItem>
            <MenuItem value={"November"}>November</MenuItem>
            <MenuItem  value={"December"}>December</MenuItem>
          </Select>
        </FormControl>  */}

      
     
         <div className={classes.spacer} />
         <div className={classes.actions}>
         <div className={classes.grow} />
             <div className={classes.search}>
               <div className={classes.searchIcon}>    
                          <SearchIcon />
               </div>
               
              <InputBase
                 placeholder="Search…"
                 //onSubmit={(event)=>this.searchHandler(event)}
                 onChange={(searchData)=>this.searchHandler(searchData)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
               />
               
            </div>
        </div> 
      </Toolbar>
     </div>
      );
      }
  }
  
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      newArray: state.newArray,
      searchFlag:state.searchFlag,
      monthFlag:state.monthFlag,
    }  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      onSearch:(newArray)=>{dispatch(onSearch(newArray) )},
     

    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(toolbarStyles)(EnhancedTableToolbar,axios));


