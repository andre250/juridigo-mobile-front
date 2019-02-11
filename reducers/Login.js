const token = "";

const Login = (state = token, action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.payload;
      default:
        return state;
    }
};

export default Login;