const Transfer = require('../models/transfer.models');
const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const users = await User.findAll({
      where: {
        status: true,
      },
    });
    if (!users) {
      return res.status(404).json({
        status: 'error',
        message: 'None Users was found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;

    // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        id,
      },
    });

    // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  } catch (error) {
    console.log(error.parent);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const register = async (req, res = response) => {
  const { name, password } = req.body;
  const amount = 1000;
  const accountNumber = Math.floor(Math.random() * 900000) + 100000;
  const user = await User.create({
    name: name.toLowerCase(),
    password: password,
    accountNumber,
    amount,
  });
  res.status(201).json({
    status: 'succes',
    message: 'User Created succesfully',
    user,
  });
};

const login = async (req, res = response) => {
  try {
    const { accountNumber, password } = req.body;
    const user = await User.findOne({
      where: {
        accountNumber: accountNumber,
        password: password,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Account not found or invalid',
      });
    }
    res.status(201).json({
      status: 'success',
      message: 'User Login successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail logging user',
      message: 'Internal server error',
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const transferHistory = await Transfer.findAll({
      where: {
        senderUserId: id,
      },
      order: [['id', 'DESC']],
    });
    if (!transferHistory) {
      return res.status(404).json({
        status: 'fail',
        message: 'No entries found in transfer history',
      });
    }
    res.status(200).json({
      status: 'success',
      data: transferHistory,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Server error',
    });
  }
};
module.exports = {
  findUsers,
  findUser,
  register,
  login,
  getHistory,
};
