const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
    });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || '').toLowerCase();
    // const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@leaddesk.com').toLowerCase();
    // const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

     const defaultEmail = (process.env.ADMIN_EMAIL  ).toLowerCase();
    const defaultPassword = process.env.ADMIN_PASSWORD ;

    if (normalizedEmail === defaultEmail && password === defaultPassword) {
      const existingUser = await User.findOne({ email: defaultEmail });
      if (!existingUser) {
        const createdUser = await User.create({
          name: 'Admin',
          email: defaultEmail,
          password: defaultPassword,
          role: 'admin',
        });

        return res.json({
          success: true,
          user: { id: createdUser._id, name: createdUser.name, email: createdUser.email, role: createdUser.role },
        });
      }

      return res.json({
        success: true,
        user: { id: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role },
      });
    }

    const user = await User.findOne({ email: normalizedEmail, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
