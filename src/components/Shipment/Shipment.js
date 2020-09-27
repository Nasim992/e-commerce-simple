import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../Home/Home';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser,SetLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
   
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}> 
    
        <input name="NameRequired" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder = "Your Name" />
        {/* errors will return when field validation fails  */}
        {errors.NameRequired && <span className="error">Name  is required</span>}

        <input name="emailRequired" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder = "Your Email"/>
        {/* errors will return when field validation fails  */}
        {errors.emailRequired && <span className="error">Email is required</span>}

        <input name="AddressRequired" ref={register({ required: true })} placeholder = "Your Address"/>
        {/* errors will return when field validation fails  */}
        {errors.AddressRequired && <span className="error">Address is required</span>}
        
        
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;