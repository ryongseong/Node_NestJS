const messageModel = require('../models/messages.model');

const getToken = (sender, receiver) => {
    const key = [sender, receiver].sort().join("_");
    return key;
}

const saveMessages = async ({from, to, message, time }) => {
    try {
        let token = getToken(from, to);
        let data = {
            from,
            message,
            time
        }
        const result = await messageModel.updateOne({ userToken: token }, { $push: { messages: data } });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const fetchMessages = async (io, sender, receiver) => {
    try {
        const token = getToken(sender, receiver);
        const foundToken = await messageModel.findOne({ userToken: token });

        if (foundToken) {
            io.to(sender).emit('stored-messages', { messages: foundToken.messages});
        } else {
            let data = {
                userToken: token,
                messages: []
            }

            const message = new messageModel(data);
            const savedMessage = await message.save();

            if (savedMessage) {
                console.log('메시지가 생성되었습니다.')
            }
        }
    } catch (err) {
        console.log('에러 발생');
    }
}

module.exports = {
    saveMessages,
    fetchMessages
}