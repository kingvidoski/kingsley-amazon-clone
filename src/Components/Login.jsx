import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import axios from '../axios';
import { db } from "../firebase";

function Login() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [valid, setValid] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [countryName, setCountryName] = useState("");
    const [countryCode, setCountryCode] = useState('');
    const [token, setToken] = useState('');
    const [callToken, setCallToken] = useState(false);
    const [country, setCountry] = useState([]);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        firstName: "",
        surName: "",
        phoneNo: "",
        address: "",
    });


    useEffect(() => {
        const timer = setTimeout(() => {
                setValid(false);
                setEmpty(false);
            }, 10000)
            
            return () => clearTimeout(timer);
    }, [valid, empty]);

    useEffect(() => {
        const verifyOtp = async () => {
            if (callToken) {
                const respond = await axios({
                method: 'post',
                url: `/login/verify?email=${inputs.email}`
            });
            setToken(respond.data);
            }
        }

        verifyOtp();
    }, [callToken])

    useEffect(() => {
        const getCountryDetails = async () => {
            const res = await axios({
                method: 'post',
                url: '/login/countries'
            });
            setCountry(res.data);
        }
        getCountryDetails();
    }, [])

    const handleChange = e => {
        setInputs(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleOtp = (e, index) => {
        if (isNaN(e.target.value)) return;
        
        setOtp([...otp.map((d, idx) => (idx === index) ? e.target.value : d)]);
    }
    
    const handleKeyDown = (e) => {
        if (isNaN(e.target.value)) return;
        if (e.key !== "Backspace") {
            if (e.target.nextSibling) {
                e.target.nextSibling.focus();
            }
        }

        if (e.key === "Backspace" && e.target.previousSibling) {
            if (e.target.value === "") {
                e.target.previousSibling.focus();
            }
        }
    }

    const handleCode = e => {
        const data = e.target.value;
        setCountryName(data);
        country.map(countries => {
            if (data === countries.name) {
                setCountryCode(`${countries.code} ${countries.dial_code}`);
            }
        })
    }

    const signIn = e => {
        e.preventDefault();

        if (inputs.email !== "" && inputs.password !== "") {
            auth.signInWithEmailAndPassword(inputs.email, inputs.password)
                .then(auth => {
                    navigate('/')
                }).catch(err => alert(err.message));
            }
        }

    const signUp = async (e) => {
        e.preventDefault();
        const inputToken = otp.join("");

        if (inputToken === token.toString()) {
            auth.createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then((auth) => {
                if (auth) {
                    db.collection("details").doc(auth.user?.uid).set({
                        firstName: inputs.firstName,
                        surName: inputs.surName,
                        phoneNo: inputs.phoneNo,
                        address: inputs.address,
                        country: countryName,
                        countryCode: countryCode,
                    })
                    navigate('/')
                }
        }).catch(err => alert(err.message))
    }

        // await userCred.user.sendSignInLinkToEmail();
    }

    const getVerifedToken = async (e) => {
        e.preventDefault();

        if (token && inputs.firstName !== "" && inputs.surName !== "" && inputs.phoneNo !== "" && inputs.address !== "" && countryCode !== "") {
            setStep(step + 1);
        }
    }

    const createNew = e => {
        e.preventDefault();
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        
        if (inputs.email !== "" && inputs.password !== "") {
            if (regEx.test(inputs.email)) {
                setStep(step + 1);
                setCallToken(true);

            } else if (!regEx.test(inputs.email) && inputs.email !== "") {
                setValid(true);
            }
        } else {
            setEmpty(true);
        }
    };

    switch (step) {
        case 1:
            return (
            <div className='login'>
                <Link to='/'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=''/>
                </Link>
                <div className='login__form'>
                    <h1>Sign In</h1>
                    {empty && <p className='invalid'>Please fill all inputs</p>}

                    <form>
                        <h5>E-mail</h5>
                            <input type='text' name='email' value={inputs.email} onChange={e => handleChange(e)}/>
                            {valid && <p className='invalid'>Invalid email</p>}
                        
                        <h5>Password</h5>
                        <input type='password' name='password' value={inputs.password} onChange={e => handleChange(e)} />
                        
                            <button type='submit' onClick={signIn} className='sign__btn'>Sign In</button>
                    </form>
                    <p>
                        By signing-in you agree to AMAZON CLONE <span>Conditions of Use</span> & Sale. Please see our <span>Privacy Notice</span>.
                    </p>

                </div>
                <div className='register'>
                    <div className='register__title'>
                        <div></div>
                        <span>New to Amazon?</span>
                        <div></div>
                    </div>
                    <button onClick={createNew} className='register__btn'>Create your Amazon Account</button>
                </div>
            </div>
        );
        
        case 2:
            return (
                <div className="login">
                    <Link to='/'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='' />
                    </Link>
                    <div className="login__form">
                        <h1>Create Account</h1>
                        <form>
                            <div className="form__names">
                                <div className="names">
                                    <h5>Firstname</h5>
                                    <input type="text" name='firstName' value={inputs.firstName} onChange={e => handleChange(e)} />
                                </div>

                                <div className="names">
                                    <h5>Surname</h5>
                                    <input type="text" name='surName' value={inputs.surName} onChange={e => handleChange(e)} />
                                </div>
                            </div>

                            <div className='register__title__bar'>
                                <div></div>
                                <span>Contact & Location</span>
                                <div></div>
                            </div>

                            <div className="flex">
                                <div className='flex__one'>
                                    <h5>Country</h5>
                                    <div className="contact">
                                        <select name="country__names" id="" onChange={e => handleCode(e)}>
                                            {country.map((countries, index) => {
                                                return <option key={index} value={countries.name}>{countries.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <h5>Phone No</h5>
                                    <div className='contact__phone'>
                                        <input type="text" defaultValue={countryCode} className='code' />
                                        <input type="text" name='phoneNo' value={inputs.phoneNo} onChange={e => handleChange(e)} />
                                    </div>
                                </div>
                            </div>

                            <div className="address">
                                <h5>Delivery Address</h5>
                                <input type="text" name='address' value={inputs.address} onChange={e => handleChange(e)} />
                            </div>

                            <div className='register__title__bar'>
                                <div></div>
                                <span>Verify Email</span>
                                <div></div>
                            </div>
                            <button type='submit' onClick={getVerifedToken} className='sign__btn'>Verify</button>
                        </form>
                    </div>
                </div>
            );

        case 3:
            return (
                <div className='login'>
                    <Link to='/'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='' />
                    </Link>
                    <div className='login__form'>
                        <h1>Verifying Accounts</h1>
                        <p>Please check your email for verified otp. Also check your spam</p>
                        <form>
                            <div className="otp">
                                {otp.map((data, index) => {
                                    return (
                                        <input
                                            type="text"
                                            maxLength="1"
                                            key={index}
                                            value={data}
                                            onChange={e => handleOtp(e, index)}
                                            onFocus={e => e.target.select()}
                                            onKeyUp={e => handleKeyDown(e)}
                                        />
                                    )
                                })
                                }
                            </div>
                            <button type='submit' onClick={signUp} className='sign__btn'>Continue</button>
                        </form>
                    </div>
                </div>
            );
        
        default:
            return <div>An Error Occurred ....RELOAD</div>
    }
}

export default Login
