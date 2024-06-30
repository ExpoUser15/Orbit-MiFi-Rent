const { QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../../config/db');
const rentalSchema = require('../../models/rentalSchema');
const contactSchema = require('../../models/contactSchema');
const notification = require("../../utils/notification");
const { formattedDate, finishDate } = require("../../utils/date");

let success = false;

const homeController = async (req, res) => {

    const path = req.path;
    const port = process.env.PORT || '7777';

    const testimoni = await sequelize.query('SELECT name, testimonial, text FROM tb_testimonials ORDER BY createdAt DESC LIMIT 3', {
        type: QueryTypes.SELECT
    });

    const data = {
        path,
        testimoni
    };

    res.render('index.ejs', {
        data,
        title: 'Telkomsel Orbit MiFi Rent',
        uri: `${req.protocol}://${req.hostname}:${port}`
    });
}

const rentController = async (req, res) => {
    try {
        const path = req.path;
        const port = process.env.PORT || '7777';

        const data = {
            path,
        };

        if (success === true) {
            const { notif } = notification('Form saved successfully', 'checked_190411.png', 'from-blue-300 to-blue-400');
            success = false;
            return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: ['0', '0'], title: 'Telkomsel Orbit MiFi Rent', uri: `${req.protocol}://${req.hostname}:${port}` });
        } else if (success === 'not images') {
            const { notif } = notification('Only images in PNG, JPEG and WEBP formats are available.', 'alert_10265049.png', 'from-yellow-300 to-orange-400');
            success = false;
            return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: ['0', '0'], title: 'Telkomsel Orbit MiFi Rent', uri: `${req.protocol}://${req.hostname}:${port}` });
        } else if (success === 'limit error') {
            const { notif } = notification('Please provide a photo of your passport and yourself with your passport', 'alert_10265049.png', 'from-yellow-300 to-orange-400');
            success = false;
            return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: ['0', '0'], title: 'Telkomsel Orbit MiFi Rent', uri: `${req.protocol}://${req.hostname}:${port}` });
        } else if (success === 'failed') {
            const { notif } = notification('Failed to save. Please try again!', 'alert_10265049.png', 'from-red-300 to-red-600');
            success = false;
            return res.render('index.ejs', { data: { path, notif, success: true }, jumlah: ['0', '0'], title: 'Telkomsel Orbit MiFi Rent', uri: `${req.protocol}://${req.hostname}:${port}` });
        }

        if (success === 'error') {
            success = false;
            res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Please contact the customer service!' });
        }

        res.render('index.ejs', {
            data,
            jumlah: ['0', '0'],
            title: 'Telkomsel Orbit MiFi Rent',
            uri: `${req.protocol}://${req.hostname}:${port}`
        });
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Please contact the customer service!', });
    }
}

const locationApiController = async (req, res) => {
    try {
        const data = await sequelize.query('SELECT tb_locations.location, tb_ready_stoks.n1, tb_ready_stoks.n2 FROM `tb_locations` JOIN `tb_ready_stoks` ON tb_ready_stoks.location = tb_locations.location_id');

        res.json({
            data
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
            msg: 'Please contact the customer service!'
        })
    }
}

const rentPostController = async (req, res) => {
    try {
        const body = req.body
        const files = req.files

        const uuid = uuidv4();

        let extract;

        if (!files.passport) {
            success = 'limit error';

            return res.redirect('/rent');
        } else {
            extract = files.passport.map(item => item.filename);
        }

        const joinFilename = extract.join(' - ');

        if (!body.name || !body.destination || !files.passport || !body.modem || !body.plan || !body.modemPrice || !body.price || !body.total) {
            success = false;

            return res.redirect('/rent');
        }

        if (files.passport.length < 2 || files.passport.length > 2) {
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
                        success = true;
                    })
                    .catch((error) => {
                        success = 'error';
                        res.redirect('/rent');
                    });
            } else {
                success = 'failed';
            }

        }

        res.redirect('/rent');
    } catch (error) {
        success = 'error';
        res.redirect('/rent');
    }

}

const contactController = (req, res) => {
    try {
        const path = req.path;
        const port = process.env.PORT || '7777';

        if (success) {
            success = false;
            const { notif } = notification('Your message has been saved. We will respond as soon as possible.', 'checked_190411.png', 'from-sky-300 to-blue-400');
            return res.render('index.ejs', { data: { path, notif, success: true }, title: 'Telkomsel Orbit MiFi Rent', uri: `${req.protocol}://${req.hostname}:${port}` });
        }

        if (success === 'error') {
            success = false;
            res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Please contact the customer service!' });
        }

        res.render('index.ejs', { 
            data: { path }, 
            title: 'Telkomsel Orbit MiFi Rent', 
            uri: `${req.protocol}://${req.hostname}:${port}` 
        });
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Please contact the customer service!' });
    }
}
const aboutController = (req, res) => {
    try {
        const path = req.path;
        const port = process.env.PORT || '7777';
        const data = {
            path,
        };

        res.render('index.ejs', { 
            data, 
            title: 'Telkomsel Orbit MiFi Rent', 
            uri: `${req.protocol}://${req.hostname}:${port}` 
        });
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Please contact the customer service!' });
    }
}

const contactPostController = async (req, res) => {
    try {
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
                success = true;
            })
            .catch((error) => {
                console.error("Error synchronizing models with database:", error);
                success = 'error';
                res.redirect('/contact');
            });

        success = true;
        res.redirect('/contact');
    } catch (error) {
        success = 'error';
        res.redirect('/contact');
    }
}

module.exports = {
    homeController,
    rentController,
    aboutController,
    contactController,
    contactPostController,
    rentPostController,
    locationApiController
}