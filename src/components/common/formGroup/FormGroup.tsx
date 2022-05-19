import React from 'react';
import './formGroup.scss'

const FormGroup = (props: any) => {
    const { fieldName, register, errors, placeholder, isRequired, type} = props
    console.log("fieldName", fieldName)
    return (
        <div className={'formGroup'}>
                
                {props.isShowFieldName ? 
                    <div className={'formGroupInfo'}>
                        <label htmlFor={fieldName}>{fieldName}</label>
                        {errors[fieldName] && <p>{errors[fieldName].message}</p>}
                    </div>
                    :
                    <></>
                
                }

            {props.value ?
                <input type={type} onChange={props.onChange ? props.onChange : null} placeholder={placeholder} value={props.value} {...register(fieldName, {required: {value: isRequired, message: 'Required field'}})}/>
                :
                <input type={type} onChange={props.onChange ? props.onChange : null} placeholder={placeholder} {...register(fieldName, {required: {value: isRequired, message: 'Required field'}})}/>

            }
        </div>
    );
};
export default FormGroup;