
import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../../axios-orders';
import {connect} from 'react-redux';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 950,
  },
  tableWrapper: {
    overflowY: 'auto',
    overflowX:'auto'
  },





});

class EnhancedTable extends Component {
  state = {
    order: 'asc',
    orderBy: 'email',
    selected: [],
  billing:[],  
  page:0, 
   nItem:{},
   flag:false,
  };
 
  componentDidMount(){
    const {mspId}=this.props;
  
    let data={mspId}
    axios.post('getCustomersBillingInfo/',data)
   .then((response)=>{
      const fetchedBilling=[];
      for(let key in response.data.Result)
      {
       fetchedBilling.push({...response.data.Result[key]});
    
      }
      const billing=fetchedBilling;
     this.setState({billing});

     
   });
  
 }
 

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.billing.map(n => n) }));
      return;
    }
    this.setState({ selected: [] });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  

  renderBilling(){
  const {newArray,searchFlag,monthFlag} = this.props;
    const { billing, order, orderBy } = this.state;
    
let arr=[]
    if( newArray.length==0){
      arr=billing.slice();
    }
    else if(newArray[0]==-1){
      arr=[];
    }
    else{
      arr=newArray.slice();
    }
return (
    <TableBody>

    {stableSort(arr, getSorting(order, orderBy))
      .map(n => {
        const isSelected = this.isSelected(n);
        return (
          <TableRow
          hover
          aria-checked={isSelected}
          tabIndex={-1}
          key={n.id}
          selected={isSelected}>

          
            <TableCell component="th" scope="row" padding="dense">{n.customerEmail}</TableCell>
          
            <TableCell component="th" scope="row" padding="dense"> {n.month} </TableCell>
            <TableCell component="th" scope="row" padding="dense">{n.amount}</TableCell>
            <TableCell component="th" scope="row" padding="dense"> {n.paymentStatus} </TableCell>
          </TableRow>
           
        );
      })}
  </TableBody>

);
    

 
      
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes,newArray } = this.props;
    const { billing, order, orderBy, selected, flag} = this.state;
  
    return (
      <Paper className={classes.root} nItem={newArray} >
        <EnhancedTableToolbar numSelected={selected.length} flag={flag} billingData={billing}  />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" nItem={newArray} >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={newArray.length}
            />
  
            {this.renderBilling()} 
        
            
        
          </Table>
        
        </div>
        
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
      mspId :state.mspId,
      newArray:state.newArray,
     
  };
}


export default connect(mapStateToProps)(withStyles(styles)(EnhancedTable,axios));


