// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { thunkEditProfile, thunkLogin } from "../../redux/session";
import './EditProfileModal.css'
import { Link } from "react-router-dom";

const EditProfileModal = ({ user, newData }) => {
    const { closeModal } = useModal();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        let credentials = {
            email: user.email,
            password
        }

        if (password === confirmPassword){
            const serverResponse = await dispatch(
                thunkLogin(credentials)
              );

            if (serverResponse) setErrors(serverResponse);

            return dispatch(thunkEditProfile(newData))
            .then(closeModal)
            .catch(async (res) => {
            const data = await res.json();
            if ( data ) {
            console.log(data)
            }
            })
        }

        setErrors[password]('Passwords must match')
    }
    return (
        <>
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p>{errors.password}</p>}
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="Submit" className="button-yes" onClick={handleSubmit}>Delete Profile</button>
            <Link to={'/profile'}>No, Go Back.</Link>
          </form>
        </>
      );

};

export default EditProfileModal;