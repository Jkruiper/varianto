import { useState } from "react";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }
        
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            
            

        } catch (error) {
            console.log('user creation encountered an error', error.message);
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input type="text" name="displayName" required onChange={handleChange} value={displayName} />

                <label>Email</label>
                <input type="email" name="email" required onChange={handleChange}  value={email}/>
                
                <label>Password</label>
                <input type="password" name="password" required onChange={handleChange}  value={password}/>
                
                <label>Confirm password</label>
                <input type="password" name="confirmPassword" required onChange={handleChange}  value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;