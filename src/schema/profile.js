import * as Yup from "yup";

export const change_password_schema = Yup.object().shape({
    password: Yup.string().required(),
    oldpassword: Yup.string().required().notOneOf([Yup.ref('password'), null], 'Password cannot be the same as old password'),
});

export const update_profile_schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required()
});