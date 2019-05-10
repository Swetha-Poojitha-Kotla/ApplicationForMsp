import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import SimpleExpansionPanel from '../components/ExpansionPanel';
import MenuItem from '@material-ui/core/MenuItem';
import {Route} from 'react-router-dom';
import ViewTable from '../components/Tabs/ViewTable/ViewTable';
import AddForm from '../components/Tabs/Addform/AddForm';
import Billing from '../components/Tabs/Billing/Billing';
import RequestApproval from '../components/Tabs/RequestApproval/RequestApproval';
import ViewLicense from '../components/Tabs/ViewLicenses/ViewLicense';
//import { Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
//import {Redirect} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import history from '../history';
import Login from './Login';
//import {Route} from 'react-router-dom';
import Create from '../components/Tabs/Create/Create';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 888,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },

    appBar: {
    zIndex: theme.zIndex.drawer + 1,
  backgroundColor:'#382F4A',
  },
  drawerPaper: {
    position: 'relative',
    width: 260,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, 
  },
  panel:{
   top:200,
  },
  account :{
        right:-1570
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class ClippedDrawer extends React.Component{
    state={
        open:false,
        anchorEl:null,
        mobileMoreANchorEl:null,
    };
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };
    
      handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
      };
    
      handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
      };
    
      handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
      };
      
      logoutHandler=()=>{
       window.location.href = 'localhost:3000';
        window.location.reload('localhost:3000');
      }
      render(){
        const { classes} = this.props;
        const { anchorEl } = this.state;
       
        const isMenuOpen = Boolean(anchorEl);
       
        const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >
            
              {/* <MenuItem  onClick={this.profileHandler}>Profile</MenuItem> */}
              
              <MenuItem  onClick={this.logoutHandler}>LogOut
             </MenuItem> 
            </Menu>
          );
          return (
            <div className={classes.root}>
              <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
              
                  <Typography variant="title" color="inherit" noWrap >
                   ARCSERVE MSP PORTAL
                  </Typography>
                  <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
                className={classes.account}
              >
                <AccountCircle />
              </IconButton>
                </Toolbar>
             
              </AppBar>

              {renderMenu}
              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.toolbar} />
                <SimpleExpansionPanel className={classes.panel}/>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path="/login" exact component={Login}/>
                 <Route path="/view"  component={ViewTable}/>
                 <Route path="/add" exact component={AddForm}/>
                
                 <Route path="/billing" exact component={Billing}/>
                 <Route path="/approved" exact  component={RequestApproval}/>
                 <Route path="/create" exact  component={Create}/>
                 <Route path="/viewlicense" exact component={ViewLicense}/>
       
              
              </main>
            </div>
          );
      }
}

 

  


ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  
};

export default withStyles(styles)(ClippedDrawer);
