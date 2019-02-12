const token = "";

const Login = (state = token, action) => {
  console.log(state)
    switch (action.type) {
      case 'LOGIN':
        return action.payload;
      default:
        return state;
    }
};

export default Login;