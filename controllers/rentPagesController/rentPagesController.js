const notification = require("../../utils/notification");

let success = false;

const homeController = (req, res) => {

    const path = req.path;

    const data = {
        path,
    };

    res.render('index.ejs', { data });
}

const rentController = (req, res) => {
    const path = req.path;
    const data = {
        path
    };

    res.render('index.ejs', { data });
}

const rentPostController = (req, res) => {
    const body = req.body
    const files = req.files

    if (!body.name || !body.dc || !files.passport || !body.modem || !body.plan || !body.modemPrice || !body.price || !body.total ) {
        return;
    }

    if(files.length < 2){
        return;
    }

    // console.log(body)
    // console.log(file)

    success = true;
    res.redirect('/rent');
}

const contactController = (req, res) => {
    const path = req.path;

    if(success){
        const { notif } = notification('Successfully sent the messages', 'checked_190411.png', 'from-sky-300 to-blue-400');
        success = false;
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

const contactPostController = (req, res) => {
    const body = req.body

    if (!body.name || !body.email || !body.message) {
        return;
    }

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