import React, {useState} from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [nerror, setNameError] = useState('');
    const [perror, setPasswordError] = useState('');
    const [pherror, setPhoneError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, phone);
        // Validation
       if (name.length < 3) {
         setNameError('Name should be at least 3 characters');
         return;
       } 
       setNameError('')

       if (password.length < 8) {
        setPasswordError('Password should be at least 8 characters');
        return;
       }
       setPasswordError('');
    // Basic phone number validation 
       if (!phone.match(/^0?[1-9]\d{9}$/)) {
       setPhoneError('Invalid Phone number!');
       return;
     }
     setPhoneError('');
        try {
          
            let res = await axios.post(`${process.env.REACT_APP_API}/api/user/createuser`, {
            name,
            email,
            password,
            phone,
            }
            )
            
            if(res.data.success){
              console.log(res.data);
               navigate('/login');
            } else {
             console.log("error in signup");
            }
        } catch (error) {
            console.log("error in signup",error);
        }
  
    }
  return (
    <>
    <Navbar/>
    <div className='container my-3'>
   <form onSubmit={handleSubmit}>
   <div className="mb-3">
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputname" />
    {nerror && <div className="alert alert-danger">{nerror}</div>}
  </div>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(e) => setEmail(e.target.value)}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(e) => setPassword(e.target.value)}  type="password" className="form-control" id="exampleInputPassword1" />
    {perror && <div className="alert alert-danger">{perror}</div>}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputphone" className="form-label">Phone</label>
    <input onChange={(e) => setPhone(e.target.value)} type="number" className="form-control" id="exampleInputphone" />
    {pherror && <div className="alert alert-danger">{pherror}</div>}
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}



export default Signup
