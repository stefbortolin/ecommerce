import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRouter} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")

  const loginAuth = async (username, password) => { 
    try {
      const body = JSON.stringify({
        username,
        password
      })
      const result = await fetch(`http://localhost:5000/login`,{
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
      const user = await result.json()
      console.log(user)

      window.localStorage.setItem(
        'loggedEcommerceUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = (e) => {
    loginAuth(username,password)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={username}
            onChange={e=>setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
          />
          <TextField
            value={password}
            onChange={e=>setPassword(e.target.value)}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <LinkRouter to="/signup">
                <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </LinkRouter>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}