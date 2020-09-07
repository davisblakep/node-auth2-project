import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
// import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
// import { updateNavName } from '../../state/actions';
// import axios from 'axios';

const formSchema = yup.object().shape({
  username: yup.string().required('Username is a required field'),
  password: yup.string().required('Password is a required field'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const [errorState, setErrorState] = useState({
    username: '',
    password: '',
  });

  const inputChange = (e) => {
    e.persist();
    validate(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        console.log('errors', err.errors);
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  let history = useHistory();

  const submitButton = () => {
    props.updateNavName(formState.username);
    return history.push('/dashboard');
  };

  const submitForm = (e) => {
    e.preventDefault();
    // props.BackerDisplayName.BackerDisplayName(formState)
    setFormState({ username: '', password: '' });
    // axios
    //     .post("https://vr-direct1.herokuapp.com/api/backer/login", formState)
    //     .then(response => {
    //       const decoded = jwt.decode(response.data.token);
    //       console.log("Axios response from Backer Login submit", response, decoded);
    //       console.log("Axios response from Backer Login userID", decoded.userId);
    //       localStorage.setItem("token", response.data.token);
    //       setTimeout(()=>{history.push(`/backer-dashboard/${decoded.userId}`)},1000);
    //       {props.BackerDisplayName.BackerDisplayName(response, decoded)};
    //       ;})
    //     .catch(err => {console.log("Axios error", err)});
    submitButton();
  };

  return (
    <div style={{ paddingTop: '4%' }}>
      <Card
        className={classes.root}
        style={{ opacity: '0.9', marginLeft: '10%' }}
      >
        <CardContent>
          <Typography style={{ marginLeft: '4%' }} variant="h5" component="h2">
            Login
          </Typography>
          <br />
          <form
            onSubmit={submitForm}
            className={classes.form}
            autoComplete="off"
          >
            <FormControl required>
              <TextField
                autoFocus
                required={true}
                id="username"
                name="username"
                label="Username"
                value={formState.name}
                onChange={inputChange}
                variant="filled"
                isRequired="true"
              />
              <Typography style={{ color: 'red', fontSize: '10px' }}>
                {errorState.username}
              </Typography>
            </FormControl>
            <FormControl required>
              <TextField
                id="password"
                name="password"
                label="Password"
                value={formState.password}
                onChange={inputChange}
                variant="filled"
                type="password"
                required={true}
                isRequired="true"
              />
              <Typography style={{ color: 'red', fontSize: '10px' }}>
                {errorState.password}
              </Typography>
            </FormControl>
            <CardActions>
              <Button type="submit" size="small">
                Submit
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
