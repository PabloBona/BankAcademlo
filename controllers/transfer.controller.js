const Transfer = require('../models/transfer.models');

exports.transferAmount = async (req, res) => {
  try {
    // 1. Obtener los datos de la solicitud
    const { amount, accountNumber, senderUserId } = req.body;

    // 2. Buscar al usuario receptor en la base de datos
    const userReceiver = await Transfer.findOne({
      where: {
        accountNumber,
        status: true,
      },
    }).catch(error => {
      console.error(`Error finding receiver user: ${error}`);
      return res.status(500).json({
        status: 'failed',
        message: 'Internal Server Error',
      });
    });

    if (!userReceiver) {
      console.error(
        `Receiver user not found for account number: ${accountNumber}`
      );
      return res.status(404).json({
        status: 'failed',
        message: 'Receiver user not found',
      });
    }

    try {
      // rest of the code here
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'Internal Server Error',
      });
    }

    console.log(accountNumber);

    // 3. Verificar si el usuario receptor existe
    if (!userReceiver) {
      return res.status(404).json({
        status: 'failed',
        message: 'Receiver user not found',
      });
    }

    // 4. Buscar al usuario remitente en la base de datos
    const userSender = await Transfer.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });

    // 5. Verificar si el usuario remitente existe
    if (!userSender) {
      return res.status(404).json({
        status: 'failed',
        message: 'Sender user not found',
      });
    }

    // 6. Verificar si el usuario remitente tiene suficiente dinero para hacer la transferencia
    if (userSender.amount < amount) {
      return res.status(400).json({
        status: 'failed',
        message: 'Sender user does not have enough funds',
      });
    }

    // 7. Verificar si el ID del usuario remitente es igual al ID del usuario receptor
    if (userSender.id === userReceiver.id) {
      return res.status(400).json({
        status: 'failed',
        message: 'Cannot transfer funds to the same user',
      });
    }

    // 8. Actualizar las cantidades de los usuarios en la base de datos
    await User.update(
      { amount: userSender.amount - amount },
      { where: { id: userSender.id } }
    );
    await User.update(
      { amount: userReceiver.amount + amount },
      { where: { id: userReceiver.id } }
    );

    // 9. Crear un objeto de transferencia
    const newTransfer = {
      senderUserId: userSender.id,
      receiverUserId: userReceiver.id,
      amount,
    };
    await Transfer.create({ amount, senderUserId, receiverUserId });
    // 10. Devolver una respuesta de éxito al cliente
    res.status(201).json({
      status: 'success',
      message: 'Transfer created successfully',
      newTransfer,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    });
  }
};
