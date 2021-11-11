import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {Container,Form,Button } from "react-bootstrap";
import "./PasswordReset.css";
import {  withApollo} from "react-apollo";
import jwt from "jsonwebtoken";


import { MUTATION_FORGOT_PASSWORD,QUERY_GET_EMAIL } from "../gql/user";
import MediaQuery from "react-responsive";
import {
    MIN_DESKTOP_SIZE
  } from "../data/constants";

  class PasswordReset extends Component {
    constructor(props) {
      super(props);
      this.state={
        newpassword :"",
        email :""
    }};

 tokenchecker(){
  return jwt.decode(this.props.match.params.token).exp > new Date();
 }

  componentDidMount(){

if(this.tokenchecker){ 

   this.props.client
   .query({
     query:QUERY_GET_EMAIL,
     variables:{
      token:this.props.match.params.token
     }
   })
   .then(res=>{
     this.setState({
       email : res.data.getEmailUsers
     })

   })
  }
  else{

   this.props.history.push({
    pathname: "/login",
    state: {
      errMesage: "Session Timeout",
      from: this.props.location
    }
  })
  }
  }
  
  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
       
          // const isMobile = !isDesktop;
          return (
            <Container
              className="Aboutus-container"
            >
              <Helmet>
                <title>Kadoqu.com | Password Reset</title>
              </Helmet>
              
              <div    className={!isDesktop
              ? "kadoqu-page-title password-reset-title-mob"
              : "kadoqu-page-title password-reset-title"
          } >
                
                    Password Reset
                  </div>
                <div className={!isDesktop
              ? "password-reset-subtitle-mob"
              : "password-reset-subtitle"
                }>

                    Masukan Password baru untuk email :
                </div>
                <div className={!isDesktop
              ? "password-reset-email-mob"
              : "password-reset-email"
                }
               >
                  
                   {this.state.email}
              </div>
              <div className="password-reset-form">
              <Form >
              <Form.Control
                          className="form-field half-width"
                          onChange={e => {
                          

                              this.setState({ newpassword: e.target.value });
                          
                          
                          }}
                          type="password"
                        />
               <div className={!isDesktop
              ? "password-reset-button-mob"
              : "password-reset-button"
                } >
                 <Button className={!isDesktop
              ? "kadoqu-primary-button-green"
              : "kadoqu-primary-button-green resetbutton"
                }  onClick={(e) => {
                   e.preventDefault();
                   const {mutate} = this.props.client;
                   mutate({
                     mutation:MUTATION_FORGOT_PASSWORD,
                     variables:{
                       token:this.props.match.params.token,
                       newPassword:this.state.newpassword
                     }
                   }).then(() => {
                  
                  this.props.history.push("/login");
                      
                   })
                   
                 }} > Simpan</Button>
              </div>
        </Form>
              </div>
          
            </Container>
          );
        }}
      </MediaQuery>
    );
  }
}

export default withApollo(PasswordReset) ;