const { QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../../config/db');
const rentalSchema = require('../../models/rentalSchema');
const stokSchema = require('../../models/stokSchema');
const contactSchema = require('../../models/contactSchema');
const notification = require("../../utils/notification");
const {formattedDate, finishDate} = require("../../utils/date");

let success = false;
let countData = 0;

const homeController = (req, res) => {

    const path = req.path;

    const data = {
        path,
    };

    res.render('index.ejs', { data });
}

const rentController = async (req, res) => {
    const io = req.app.get('socketio');
    const path = req.path;

    io.of('/rent').on('connection', (socket) => {
        console.log('Socket Connected to penyedia!: ', socket.id);
        socket.emit('jumlahPesanan', { countData });
    });

    const jenisModem = await stokSchema.findAll();

    const dataValues = jenisModem.map(item => item.dataValues.jumlah);

    const data = {
        path,
    };

    if (success === true) {
        const { notif } = notification('Form saved successfully', 'checked_190411.png', 'from-sky-300 to-blue-400');
        success = false;
        return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: dataValues });
    } else if (success === 'not images') {
        const { notif } = notification('Only images in PNG, JPEG and WEBP formats are available.', 'alert_10265049.png', 'from-yellow-300 to-orange-400');
        success = false;
        return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: dataValues });
    } else if (success === 'limit error') {
        const { notif } = notification('Please provide a photo of your passport and yourself with your passport', 'alert_10265049.png', 'from-yellow-300 to-orange-400');
        success = false;
        return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: dataValues });
    } else if (success === 'failed') {
        const { notif } = notification('Failed to save. Please try again!', 'alert_10265049.png', 'from-red-300 to-red-600');
        success = false;
        return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: dataValues });
    }

    res.render('index.ejs', { data, jumlah: dataValues });
}

const rentPostController = async (req, res) => {
    const io = req.app.get('socketio');
    const body = req.body
    const files = req.files

    const uuid = uuidv4();

    const extract = files.passport.map(item => item.filename);
    const joinFilename = extract.join(' - 2');

    if (!body.name || !body.destination || !files.passport || !body.modem || !body.plan || !body.modemPrice || !body.price || !body.total) {
        success = false;

        return res.redirect('/rent');
    }

    if (files.passport.length < 2) {
        success = 'limit error';

        return res.redirect('/rent');
    }

    let mimetypeCount = 0;
    const imageMimeTypeRegex = /image\/(jpe?g|png|webp)/i;
    files.passport.forEach(el => {
        if (!imageMimeTypeRegex.test(el.mimetype)) {
            console.log(imageMimeTypeRegex.test(el.mimetype))
            mimetypeCount++;
        }
    });

    if (mimetypeCount !== 0) {
        success = 'not images';
    } else {
        success = true;

        const planIdregex = /P0[1-8]/;
        const planIdTest = planIdregex.test(body.plan);
        const planMatching = body.plan.split('-')[1];

        const plan = await sequelize.query('SELECT time FROM `tb_plan` WHERE plan_id = :planMatching', {
            replacements: {
                planMatching
            },
            type: QueryTypes.SELECT,
        });

        const planTime = plan[0].time.split(' ')[0];
        const finishTime = finishDate(planTime);
        const startTime = formattedDate();

        if (planIdTest) {
            await rentalSchema.create({
                id: uuid,
                name: body.name,
                destination: body.destination,
                passport: joinFilename,
                boarding_passport: files.boardingpass ? files.boardingpass[0].filename : '-',
                modem: body.modem === 'N1' ? 'N101' : 'N202',
                plan: planMatching,
                total_price: body.total,
                status: 'In Progress',
                startAt: startTime,
                finishAt: finishTime
            });

            sequelize
                .sync()
                .then(() => {
                    console.log("Synchronizing Succesfully");

                    // menghitung jumlah pesanan
                    rentalSchema.count()
                    .then((count) => {
                        if(count){
                            countData = count;
                        }
                    });

                    success = true;
                })
                .catch((error) => {
                    console.error("Error synchronizing models with database:", error);
                    res.redirect('/error');
                });
        } else {
            success = 'failed';
        }

    }

    res.redirect('/rent');
}

const contactController = (req, res) => {
    const path = req.path;

    if (success) {
        success = false;
        const { notif } = notification('Your message has been saved. We will respond as soon as possible.', 'checked_190411.png', 'from-sky-300 to-blue-400');
        return res.render('index.ejs', { data: { path, notif, success: true } })
    }

    res.render('index.ejs', { data: { path } });
}
const aboutController = (req, res) => {
    const path = req.path;
    const data = {
        path,
    };

    res.render('index.ejs', { data });
}

const contactPostController = async (req, res) => {
    const body = req.body

    const uuid = uuidv4();

    if (!body.name || !body.email || !body.message) {
        success = false

        res.redirect('/contact');
    }

    await contactSchema.create({
        contact_id: uuid,
        name: body.name,
        email: body.email,
        message: body.message,
        phone: body.phone
    })

    sequelize
        .sync()
        .then(() => {
            console.log("Database & tables created!");
            success = true;
        })
        .catch((error) => {
            console.error("Error synchronizing models with database:", error);
            res.redirect('/error');
        });

    console.log(req.files);
    console.log(req.body);

    success = true;
    res.redirect('/contact');
}

module.exports = {
    homeController,
    rentController,
    aboutController,
    contactController,
    contactPostController,
    rentPostController,
}