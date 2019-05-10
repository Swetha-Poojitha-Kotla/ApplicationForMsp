import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../axios-orders';
import View from '../components/Tabs/ViewTable/ViewTable';
import { connect } from 'react-redux';
import { onLogin } from '../store/actions/getAction';
//import Background from '../image/img.jpg';
const styles = theme => ({
  layout: {
    width: 'full',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',


    },
    height: 938,


  },

  signin: {
    width: 400,
    height: 400,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',

  },
  paper: {
    //marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    zDepth: 4,
    marginTop: '150'

  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    display: 'inline-block',
    marginRight: 40,
    marginTop: theme.spacing.unit * 5,
  },
  // bgimg: {
  //   backgroundImage: `url(${Background})`
  // },

});



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showComponent: false,
      response: {},
      mspId: 0,
      loginStatus: false,
    };

  }


  loginHandler = (event) => {
    event.preventDefault();
    axios.post('validateMSP/', {
      mspEmail: this.state.email,
      mspPassword: this.state.password,
    })
      .then(response => {
        if (response.data.loginResult === "success") {
          this.props.clicked();
          this.props.onLogin(response.data.mspId);
        }
        else {

          this.props.history.push('/login');
        }
      })
      .catch(error => {
      });



  }




  handleChange = plan => event => {
    this.setState({
      [plan]: event.target.value,
    });
  };

  render() {

    const { classes } = this.props;


    return (
      <section className={classes.bgimg}>
        <Fragment>
          <CssBaseline />


          <main className={classes.layout}>
            <div className={classes.signin}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="headline">Sign in</Typography>
                <form className={classes.form} onSubmit={this.loginHandler}>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" onChange={this.handleChange('email')} autoFocus />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" onChange={this.handleChange('password')} />
                  </FormControl>

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={this.state.isLoading}

                  >

                    Sign In
                  </Button>
                  {this.showComponent ? <View /> : null}
                </form>
              </Paper>
            </div>
          </main>

        </Fragment>
      </section>
    );
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    mspId: state.mspId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (mspId) => { dispatch(onLogin(mspId)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login, axios));
// export default connect(null,mapDispatchToProps)(Login);
// export default (withStyles(styles)(Login,axios));

