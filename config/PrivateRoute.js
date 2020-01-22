import { Route, Redirect } from 'dva/router';

const AuthRouter = (props) => {
  const { route } = props;
  const { component:Component } = route;
  return (
    //true ? <Route {...route} /> : <Redirect to="/login" />
    //这个也可以，跟下边的二选一，否则会报错 

    <Route render={ props => {
      console.log(props);
      return true ? <Component { ...props } /> : <Redirect to="/user/login" />
    }} />
  )
}

export default AuthRouter;