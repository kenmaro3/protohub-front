import React, { FC, useEffect } from 'react';
import './login.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import Hr from "../../components/common/hr/Hr";
import { useDispatch } from "react-redux";
import { login, setError } from "../../store/reducers/auth/action-creators";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAppSelector, useTitle } from "../../hooks";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import MediaQuery from "react-responsive";

const Login: FC = () => {
    const { isLoading, error, isAuth } = useAppSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    useTitle('Log in')

    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const onSubmit = (data: any) => {
        dispatch(login(data.Email, data.Password))
    }

    const contentInside = () => {
        return (
            <>
                {isAuth && <Navigate to={'/'} />}
                <h2 className={'loginTitle'}>Sign in to ProtoHub</h2>

                {error &&
                    <div className={'registerError'}>
                        {error}
                    </div>
                }

                <div className="formContainer">
                    <div className={'loginForm'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className={"emailTitle"}>Email address</p>
                            <FormGroup
                                fieldName={'Email'}
                                register={register}
                                errors={errors}
                                placeholder={'Enter email...'}
                                isRequired={true}
                            />
                            <p className={"passwordTitle"}>Password</p>
                            <FormGroup
                                fieldName={'Password'}
                                register={register}
                                errors={errors}
                                placeholder={'Enter password...'}
                                isRequired={true}
                                type={'password'}
                            />
                            <Button
                                type={'submit'}
                                progress={isLoading ?
                                    <CircularProgress style={{ color: 'white' }} size={20} /> : null}
                                text={'Log in'}
                                className={"loginButton"}
                            />
                            <Link to={"#"} className={"forgotPass"}>
                                <p>Forgot password?</p>
                            </Link>
                        </form>
                    </div>

                </div>
            </>

        )
    }


    return (

        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'loginContainer'}>
                    {contentInside()}
                </div>

            </MediaQuery>


            <MediaQuery query="(max-width: 767px)">
                <div className={'loginContainerMobile'}>
                    {contentInside()}
                </div>

            </MediaQuery>

        </>
    );
};

export default Login;