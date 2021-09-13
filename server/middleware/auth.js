import jwt from "jsonwebtoken"
// wants to like a post
// click the like button => auth middleware (next) => like controller ...
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length > 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = await jwt.verify(token, "test");
            req.userId = decodedData?.id; // added userId in req obj (post info)
        }
        else{

            decodedData = await jwt.decode(token);
            req.userId = decodedData?.sub; 
        }

        next()
    } catch (error) {
        console.log(error)
    }
}
export default auth;