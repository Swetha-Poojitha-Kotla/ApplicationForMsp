import React from 'react';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import ViewIcon from '@material-ui/icons/ArtTrack';

import ApprovedIcon from '@material-ui/icons/Spellcheck';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from 'react-router-dom';
export const cListItems=(
   
<div>
       
        <ListItem button>
      <ListItemIcon>
        < ViewIcon/>
      </ListItemIcon>
      <NavLink to="/view" 
      activeClassName="active"
       style={{
        textDecoration:"none"
      }}
      ><ListItemText primary="View" /></NavLink>
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        < AddIcon/>
      </ListItemIcon>
      <NavLink to="/add"
       activeClassName="selected" 
       style={{
        textDecoration:"none"
      }}
      ><ListItemText primary="Add" /></NavLink>
    </ListItem> 
    
    <ListItem button>
      <ListItemIcon>
        < ApprovedIcon/>
      </ListItemIcon>
      <NavLink to="/approved" 
       activeClassName="selected" 
       style={{
        textDecoration:"none"
      }}
      > <ListItemText primary="RequestApproval" /></NavLink>
    </ListItem>
    </div>
        );

export default cListItems;