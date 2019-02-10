const initialState = {
    info: {},
};

const Login = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.payload;
      default:
        return state;
    }
};

export default Login;