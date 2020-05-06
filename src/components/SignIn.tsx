import React, { useState } from "react";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { Helmet } from 'react-helmet';
import { auth, signInWithGoogle } from "../firebase";
import { IAuthState } from "../states/auth";
import { AppState } from "../store";

interface OwnProps {
    auth: IAuthState
}

type SignInProps = OwnProps;

const SignIn: React.FC<SignInProps>  = (props: SignInProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string|null>(null);

    const signInWithEmailAndPasswordHandler = (event: React.MouseEvent<HTMLButtonElement>, email: string, password: string) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
       
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
    };

    return (
        <>
            <Helmet>
                <title>SignIn | nobux42</title>
            </Helmet>
            <div className="signin">
                <div className="uk-section">
                    <div className="uk-container">
                        <h5>SignIn</h5>
                        <div className="border">
                            <form className="">
                                <div className="uk-margin">
                                    <label htmlFor="userEmail" className="block">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="uk-input"
                                        name="userEmail"
                                        value={email}
                                        placeholder="aaa@bbb.ccc"
                                        id="userEmail"
                                        onChange={(event) => onChangeHandler(event)}
                                    />
                                </div>
                                <div className="uk-margin">
                                    <label htmlFor="userPassword" className="block">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="uk-input"
                                        name="userPassword"
                                        value={password}
                                        placeholder="your password"
                                        id="userPassword"
                                        onChange={(event) => onChangeHandler(event)}
                                    />
                                </div>
                                {error !== null && <div className="form-error-text">{error}</div>}
                                <button className="uk-button" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
                                    Sign in
                                </button>
                            </form>
                            <p className="">or</p>
                            <button className="uk-button" onClick={(event) => { signInWithGoogle() }}>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapDispatchToProps(dispatch: Dispatch<Action<void>>) {
    return {
        
    }
}
  
function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);