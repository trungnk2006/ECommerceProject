const User = require('../model/userModel')

function sanitizeUser(user) {
  if (!user) return null;
  const u = user.toObject ? user.toObject() : { ...user };
  delete u.password;
  return u;
}

const login = async (req, res) => {
  const { username, password } = req.body
  console.log('body: ', req.body);
  try {
    const user = await User.findOne(
      { username, password },
    );
    if (!user) {
      return res.status(400).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
    }
    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

const updateUserInfor = async (req, res) => {
  try {
    const accountUpdate = req.body
    await User.findOneAndUpdate({ _id: req.body._id }, { ...accountUpdate })
    res.json({ message: 'Cập nhập thông tin thành công' })
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

const getUserById = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(
      userId
    );
    if (!user) {
      return res.status(400).json({ message: 'Người dùng không tồn tại' });
    }
    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

const register = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username, password })
    await user.save()
    return res.json({ user: sanitizeUser(user) })
  } catch (e) {
    return res.status(500).json({ message: 'Tên người dùng đã tồn tại' })
  }
}

const updateProfile = async (req, res) => {

}

const addToCart = async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product) {
    return res.status(400).json({ error: 'User id and productId are required' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // normalize product object from frontend (may pass either { id, quantity } or { productId, quantity })
    const prodId = product.productId || product.id;
    const qty = product.quantity || 1;

    user.cart.push({ productId: prodId, quantity: qty });
    await user.save();

    return res.status(200).json({ message: 'Thành công!', cart: user.cart, user: sanitizeUser(user) });
  } catch (err) {
    console.error('addToCart error:', err);
    return res.status(500).json({ message: err.message });
  }
};

const updateOrderInCart = async (req, res) => {
  const { userId, product } = req.body;

  console.log('id: ', userId);
  console.log('product: ', product);



  if (!userId || !product) {
    return res.status(400).json({ error: 'User id and productId are required' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const prodId = product.productId || product.id;

    const existingProduct = user.cart.find(item => item.productId === prodId);

    if (existingProduct) {
      // 👉 Set quantity to the new value
      existingProduct.quantity = product.quantity;
    } else {
      // 👉 Add new product if it doesn't exist
      user.cart.push({ productId: prodId, quantity: product.quantity });
    }

    await user.save();

    return res.status(200).json({ message: 'Thành công!', cart: user.cart, user: sanitizeUser(user) });
  } catch (err) {
    console.error('addToCart error:', err);
    return res.status(500).json({ message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId, userId } = req.body; // get productId from the request body

  console.log('productId: ', productId);
  console.log(userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Remove item
    const updated = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { productId: productId } } },
      { new: true }
    );

    return res.status(200).json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng', cart: updated.cart, user: sanitizeUser(updated) });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login: login,
  register: register,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getUserById: getUserById,
  updateUserInfor: updateUserInfor,
  updateOrderInCart: updateOrderInCart,
}