// import React, { Fragment } from 'react';
// import { emailPattern } from '../../constants/regex';
// import useForm from '../../hooks/use-form/use-form';
// import FloatInputContents from '../UI/Input/FloatInputContents';
// import './FormPack.css';

// const FIELDS = {
//     EMAIL: {
//         name: 'email',
//         label: 'Email',
//         errorClass: 'error',
//         errorMessage: 'Email Required',
//         className: '',
//         validations: { required: { value: true }, pattern: { value: emailPattern } },

//         attributes: {
//             type: 'email',
//         },
//     },
//     PASSWORD: {
//         name: 'password',
//         label: 'Password',
//         errorClass: 'error',
//         errorMessage: 'password Required',
//         className: '',
//         validations: { required: { value: true } },
//         attributes: {
//             type: 'password',
//         },
//     },
// };

// const fields = [FIELDS.EMAIL, FIELDS.PASSWORD];

// const FormPack = ({ render }) => {
//     const {
//         formState: { errors },
//         register,
//         handleSubmit,
//     } = useForm();

//     const getClassName = (isError = false, className = 'error') => {
//         return isError ? `floating-input ${className}` : 'floating-input';
//     };

//     return <Fragment>{render(errors, register, handleSubmit, getClassName)}</Fragment>;
// };

// export const FormGroup = ({ children }) => {
//     return <div className="cpInput-group">{children}</div>;
// };

// export const FloatField = ({ className, type, register, name, label, attributes = {} }) => {
//     return (
//         <FloatInputContents>
//             <input className={className} {...register} type={type} placeholder=" " {...attributes} />
//             <label className="floating-label" htmlFor={name}>
//                 {label}
//             </label>
//         </FloatInputContents>
//     );
// };

// // export const FormPackTest = () => {
// //     const submitHandler = (data) => {
// //         console.log(data);
// //     };

// //     return (
// //         <FormPack
// //             render={(errors, register, handleSubmit) => {
// //                 const className = errors['email'] ? 'floating-input error' : 'floating-input';

// //                 return (
// //                     <form onSubmit={handleSubmit(submitHandler)}>
// //                         <FormFloatField fields={fields} register={register} errors={errors} />

// //                         <button type="brand" size="md">
// //                             Sign In
// //                         </button>
// //                     </form>
// //                 );
// //             }}
// //         />
// //     );
// // };

// /* const FormPackTest = () => {
//     const submitHandler = (data) => {
//         console.log(data);
//     };

//     return (
//         <FormPack
//             render={(errors, register, handleSubmit) => {
//                 const className = errors['email'] ? 'floating-input error' : 'floating-input';

//                 return (
//                     <form onSubmit={handleSubmit(submitHandler)}>
//                         <FormGroup>
//                             <FloatField
//                                 name="email"
//                                 label="Email"
//                                 type="email"
//                                 className={className}
//                                 register={register('email', { required: { value: true, message: 'Damn!' } })}
//                             />
//                             {errors['email'] && <Notify type="error">{errors['email'].message || 'Invalid email'}</Notify>}
//                         </FormGroup>
//                         <Button type="brand" size="md">
//                             Sign In
//                         </Button>
//                     </form>
//                 );
//             }}
//         />
//     );
// }; */
// export default FormPack;
