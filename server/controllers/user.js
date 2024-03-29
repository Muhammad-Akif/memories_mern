import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log('email: ', req.body)
  console.log('email: ', email)
  console.log('password: ', password)

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exisit." })

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

    res.status(200).json({ result: existingUser, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const signup = async (req, res) => {
  console.log("req ==> ", req.body);
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    console.log('email ==> ',{email});
    const existingUser = await User.findOne({ email });
    console.log('existingUser ==> ',existingUser);

    if (existingUser) return res.status(400).json({ message: "User already exists" });
    
    if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match ..." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

    res.status(201).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};