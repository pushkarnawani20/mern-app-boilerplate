import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const Home = () => {
  return <h1>home </h1>;
};

const MainRouter = () => {
  return (
    <div>
      {/* <Menu/> */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/> */}
      </Switch>
    </div>
  );
};

export default MainRouter;
