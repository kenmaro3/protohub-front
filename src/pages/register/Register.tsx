import React, { FC, useEffect } from 'react';
import './register.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import Button from "../../components/common/button/Button";
import Hr from "../../components/common/hr/Hr";
import { useDispatch } from "react-redux";
import { registration, setError } from "../../store/reducers/auth/action-creators";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAppSelector, useTitle } from "../../hooks";
import { useForm } from "react-hook-form";
import spaceImg from "../../images/space.jpeg";
import MediaQuery from "react-responsive";

const Register: FC = () => {
    const { isLoading, error, isAuth } = useAppSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    useTitle('Register')

    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const onSubmit = (data: any) => {
        dispatch(registration(data['User Name'], data['Email'], data['Password']))
    }

    const insideContent = () => {
        return (
            <>
                {isAuth && <Navigate to={'/'} replace={true} />}
                <h2 className={'loginTitle'}>Register to ProtoHub</h2>
                {error &&
                    <div className={'registerError'}>
                        {error}
                    </div>
                }
                <div className="formContainer">
                    <div className={'loginForm'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className={"nameTitle"}>User name</p>
                            <FormGroup
                                fieldName={'User Name'}
                                register={register}
                                errors={errors}
                                placeholder={'Enter user name...'}
                                isRequired={true}
                            />
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
                            <Button type={'submit'} progress={isLoading ? <CircularProgress style={{ color: 'white' }} size={20} /> : null} text={'Create account'} className={"createAccButton"} />
                        </form>
                    </div>

                </div>

                <div className="footer">

                </div>
            </>

        )
    }

    return (

        <>
            <MediaQuery query="(min-width: 768px)">
                <div className={'registerContainer'}>
                    {insideContent()}
                </div>
            </MediaQuery>

            <MediaQuery query="(max-width: 767px)">
                <div className={'registerContainerMobile'}>
                    {insideContent()}
                </div>

            </MediaQuery>
        </>
    );
};

export default Register;