const homeController = (req, res) => {

    const path = req.path;
    
    const data = {
        page: 'home',
        path
    };

    res.render('index.ejs', { data });
}

const rentController = (req, res) => {
    const path = req.path;
    const data = {
        page: 'rent',
        path
    };

    res.render('index.ejs', { data });
}
const contactController = (req, res) => {
    const path = req.path;
    const data = {
        page: 'contact',
        path
    };

    res.render('index.ejs', { data });
}
const aboutController = (req, res) => {
    const path = req.path;
    const data = {
        page: 'about',
        path
    };

    res.render('index.ejs', { data });
}

const contactPostController = (req, res) => {
    const body = req.body

    if(!body.name || !body.email || !body.message){
        return;
    }

    res.render('index.ejs', { data: {
        bg: true,
        notification: {
            element: `<div class="flex justify-between w-full" id=notif>
                            <div class="flex items-center gap-5">
                                <img src="assets/img/icon/checked_190411.png" alt="" class="w-10">
                                <p class="text-sky-800 text-sm me-5">Successfully sent the messages!</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="cursor-pointer">
                                    <i class="fa fa-xmark text-2xl text-red-800" id='closeNotif'></i>
                                </div>
                            </div>
                        </div>`,
            audio: '<audio autoplay id="audioNotif"><source src="assets/audio/cyan-message.mp3" type="audio/mp3"></audio>'
        }
    }});
}

module.exports = {
    homeController,
    rentController,
    aboutController,
    contactController,
    contactPostController,
}