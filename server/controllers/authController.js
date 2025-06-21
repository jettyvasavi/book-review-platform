export const registerUser = async (req, res, next) => {
  console.log('--- Register User endpoint hit ---'); // 1. Log entry
  const { name, email, password } = req.body;
  console.log(`Received data: Name - ${name}, Email - ${email}`); // 2. Log received data

  try {
    if (!name || !email || !password) {
      console.log('Validation failed: Missing fields.');
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    console.log('Checking if user exists...');
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log(`User already exists with email: ${email}`);
      res.status(400);
      throw new Error('User with this email already exists');
    }

    console.log('User does not exist. Proceeding to hash password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashed successfully.');

    console.log('Attempting to create user in database...');
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log('User.create command executed.');

    if (user) {
      console.log(`User created successfully with ID: ${user._id}`);
      // Respond with user data and token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    } else {
      console.log('User creation failed silently. User object is null/undefined.');
      res.status(400);
      throw new Error('Invalid user data, creation failed');
    }
  } catch (error) {
    console.error('Error in registerUser catch block:', error); // 3. Log the exact error
    next(error);
  }
};


// The loginUser function can remain the same
export const loginUser = async (req, res, next) => {
  // ...
};