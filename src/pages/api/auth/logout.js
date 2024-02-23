import cookie from 'cookie';

const logout = (req,res) =>{
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token",req.body.token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            expires: new Date(0),
            SameSite: "strict",
            path:"/",
        })
    )

    res.statusCode = 200;
    res.json({ success: true })
}

export default logout;