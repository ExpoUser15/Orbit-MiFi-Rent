const sequelize = require('../../config/db');
const stokSchema = require('../../models/stokSchema');

const handlePenyediaSocketConnection = (socket) => {
    socket.on('stokAction', async (data) => {
        if(data.modem === 'N1' || data.modem === 'N2'){
            if(data.jumlah === ''){
                return socket.emit('status', { msg: 'Silahkan masukan jumlah modem!' });
            }

            let jumlahModem = await stokSchema.findOne({
                where: {
                  jenis_modem: data.modem
                }
            });
            
            let getJumlah = jumlahModem.dataValues.jumlah;

             sequelize.sync()
             .then(() => {
              
                stokSchema.update({ 
                    jumlah: data.actionType === 'update' ? data.jumlah : Number(data.jumlah) + getJumlah
                 },
                 {
                    where: {
                        jenis_modem: data.modem
                    }
                 })
                  .then(async () => {
                    console.log('Jumlah updated successfully');

                    jumlahModem = await stokSchema.findOne({
                        where: {
                          jenis_modem: data.modem
                        }
                    });
                    
                    getJumlah = jumlahModem.dataValues.jumlah

                    socket.emit('status', { jumlahModem: {
                        modem: data.modem,
                        jumlah: getJumlah
                    }});
                  })
                  .catch((error) => {
                    console.error('Error updating jumlah:', error);
                    socket.emit('status', { msg: 'Stok gagal ditambahkan.' });
                  });
              })
              .catch((error) => {
                console.error('Error syncing database:', error);
                socket.emit('status', { msg: '(500) Internal Server Error!' });
              });
        }else{
            socket.emit('status', { msg: 'Stok gagal ditambahkan.' });
        }
    });

    socket.on('tambahkanStok', (data) => {
        console.log(data)
    });
}

module.exports = handlePenyediaSocketConnection; 