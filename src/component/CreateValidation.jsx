function Validation(value = {}) {
    let error = {};
  
    const { name="" , email = "", password = "" } = value;
  
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
  
   
    if(!name){
        error.name="Name should not be empty";
    }
   
    if (!email) {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(email)) {
      error.email = "Email format is incorrect";
    }
  
    if (!password) {
      error.password = "Password should not be empty";
    } 
  
    return error;
  }
  
  export default Validation;
  