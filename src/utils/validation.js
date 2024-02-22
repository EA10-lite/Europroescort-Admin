import * as Yup from "yup";

const email = Yup.string().email().label().required().label("Email");
const password = Yup.string().label('Password').required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Password must be a minimum of 8 characters, and must contain at least 1 small letter, 1 capital letter, 1 number and 1 symbol."
);
const firstname = Yup.string().min(5).max(50).required().label("First name");
const lastname = Yup.string().min(5).max(50).required().label("Last name");


export const login_schema = Yup.object().shape({
    email: email,
    password,
});

export const signup_schema = Yup.object().shape({
    firstname,
    lastname,
    email,
    password,
    terms_agreement: Yup.bool().required().oneOf([true], "Terms & Agreement must be accepted")
});

export const agency_signup_schema = Yup.object().shape({
    brand_name: Yup.string().min(3).max(50).required(),
    email,
    password,
    terms_agreement: Yup.bool().required().oneOf([true], "Terms & Agreement must be accepted")
});

export const escort_signup_schema = Yup.object().shape({
    model_name: Yup.string().min(3).max(50).required(),
    email,
    password,
    terms_agreement: Yup.bool().required().oneOf([true], "Terms & Agreement must be accepted")
});

export const forgotpassword_schema = Yup.object().shape({
    email
});

export const resetpassword_schema = Yup.object().shape({
    password: password,
    confirmpassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const change_password_schema = Yup.object().shape({
    oldpassword: Yup.string().label('Old Password').required().matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be a minimum of 8 characters, and must contain at least 1 small letter, 1 capital letter, 1 number and 1 symbol."
    ),
    newpassword: Yup.string().label('New password').required().oneOf([Yup.ref('oldpassword'), null], 'Passwords must match')
});

export const booking_schema = Yup.object().shape({
    email,
    firstname,
    lastname,
    confirmemail: Yup.string().label('confirm password').required().oneOf([Yup.ref('email'), null], 'Emails must match'), 
});

export const share_plans  = Yup.object().shape({
    email
});

export const email_notification_schema = Yup.object().shape({
    newsletter: Yup.bool(),
    sms_notification: Yup.bool()
});

export const profile_schema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    bio: Yup.string().required(),
    phone: Yup.string(),
    country: Yup.string(),
});

export const img_urls_schema = Yup.object().shape({
    coverphoto: Yup.string(),
    website: Yup.string().required(),
    facebook: Yup.string().required(),
    twitter: Yup.string().required(),
    instagram: Yup.string().required(),
});