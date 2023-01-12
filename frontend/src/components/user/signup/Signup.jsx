import { useRef, useState, useEffect,} from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./signup.css";
import {useNavigate} from 'react-router-dom'
import axios from "../../../api/axios";
import {showErrMsg,showSuccessMsg} from '../../util/notifications/Notification'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PHONE_REGEX = /^(\d{10}|[(]?[0-9]+[)])/i;

const REGISTER_URL = 'http://localhost:3500/users/signup'

function Signup() {
  let navigate = useNavigate();
  const ref = useRef();
  //   const emailRef = useRef();

  const initialState = {
    name : '',
    email:'',
    password:'',
    matchPwd:'',
    phone:'',
    err:'',
    success:''
  }

   const [user,setUser] = useState(initialState)

   const {name,email,password,matchPwd,phone,err,success} = user
  //  console.log(user);

   const handleChangeInput = e =>{
    const {name,value} = e.target
    setUser({...user,[name]:value,err:'',success:''})
   }





  const [userFocus, setUserFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false); 
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  
  
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   ref.current.focus();
  // }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, matchPwd, phone]);

  const handleSubmit = async e => {
    e.preventDefault();
    const details = {name,password,email,phone}
    // console.log(details);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(name);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email)
    const v4 = PHONE_REGEX.test(phone)
    if (!v1 && !v2 && !v3 && !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const res = await axios.post(REGISTER_URL,details)
      setUser({...user,err:'',success:res.data.msg});
      
    } catch (err) {
      err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
      
    }
  };
  return (
    <>
      <section>
        <p

          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="regi">SIGNUP</h1>
        {err && showErrMsg(err)}
                 {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !name ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="username"
            ref={ref}
            autoComplete="off"
            onChange={handleChangeInput}
            value={name}
            name="name"
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && name && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="email">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </label>
          <input
            type="email"
            id="email"
            ref={ref}
            autoComplete="off"
            onChange={handleChangeInput}
            value={email}
            name="email"
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Please enter .<br />
            a valid email.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !password ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChangeInput}
            value={password}
            name="password"
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={handleChangeInput}
            value={matchPwd}
            name="matchPwd"
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <label htmlFor="email">
            Phone:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPhone ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPhone || !phone ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="number"
            ref={ref}
            onChange={handleChangeInput}
            value={phone}
            name="phone"
            required
            aria-invalid={validPhone ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setPhoneFocus(true)}
            onBlur={() => setPhoneFocus(false)}
          />
          <p
            id="uidnote"
            className={
              phoneFocus && phone && !validPhone ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Please enter .<br />a valid Phone number.
          </p>

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </button>
        </form>
        <p>
          Already registered?
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="/login">Login</a>
          </span>
        </p>
      </section>
    </>
  );
}

export default Signup;
