const sequelize = require('../../config/db');
const stokSchema = require('../../models/stokSchema');
const rentalSchema = require('../../models/rentalSchema');

const penyediaController = async (req, res) => {
    const io = req.app.get('socketio');

    const jenisModem = await stokSchema.findAll();

    io.on('connection', async (socket) => {
        console.log('User connected:', socket.id);

        socket.on('editStok', async (data) => {
            if(data.modem === 'N1' || data.modem === 'N2'){
                if(data.jumlah === ''){
                    return socket.emit('editStatus', { msg: 'Silahkan masukan jumlah modem!' });
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
                        jumlah: data.jumlah
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

                        socket.emit('editStatus', { jumlahModem: {
                            modem: data.modem,
                            jumlah: getJumlah
                        }});
                      })
                      .catch((error) => {
                        console.error('Error updating jumlah:', error);
                        socket.emit('editStatus', { msg: 'Stok gagal ditambahkan.' });
                      });
                  })
                  .catch((error) => {
                    console.error('Error syncing database:', error);
                    socket.emit('editStatus', { msg: '(500) Internal Server Error!' });
                  });
            }else{
                socket.emit('editStatus', { msg: 'Stok gagal ditambahkan.' });
            }
        });

    });


    

    res.render('service/penyedia.ejs', { title: 'Penyedia',
        jumlahModem: {
            N1: jenisModem[0].dataValues.jumlah,
            N2: jenisModem[1].dataValues.jumlah
        }
    });
}

module.exports = {
    penyediaController,
} 