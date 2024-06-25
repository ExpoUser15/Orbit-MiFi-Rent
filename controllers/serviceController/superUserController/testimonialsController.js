const { QueryTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const { formattedDate } = require("../../../utils/date");
const { v4: uuidv4 } = require('uuid');

let action;

const testimonialsController = async (req, res) => {
    try {
        const query = await sequelize.query('SELECT * FROM `tb_testimonials` ORDER BY createdAt DESC LIMIT 18', {
            type: QueryTypes.SELECT,
        });

        const json = {
            data: query
        }

        if(action === 'empty fields'){
            action = null;
            return res.render('service/superuser/testimonials.ejs', { path: req.path, success: `<script>alert("Form tidak boleh kosong!")</script>`,  json: JSON.stringify(json) });
        }

        if(action === 'add'){
            action = null;
            return res.render('service/superuser/testimonials.ejs', { path: req.path, success: `<script>alert("Berhasil menambahkan testimonial.")</script>`,  json: JSON.stringify(json) });
        }
        if(action === 'delete'){
            action = null;
            return res.render('service/superuser/testimonials.ejs', { path: req.path, success: `<script>alert("Berhasil menghapus testimonial.")</script>`,  json: JSON.stringify(json) });
        }

        res.render('service/superuser/testimonials.ejs', { path: req.path, success: true, json: JSON.stringify(json) });
    } catch (error) {
        return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const addTestimonialController = async (req, res) => {
    try {
        const body = req.body;  
        const files = req.files;

        if(body.name === '' || body.text === '' || !files.testimonial){
            console.log('empty')
            action = 'empty fields'
            return res.redirect('/superuser/testimonial')
        }

        const createdAt = formattedDate();

        const uuid = uuidv4();

        console.log(body)
        console.log(files)
        
        await sequelize.query("INSERT INTO tb_testimonials (testimonial_id, name, testimonial, text, createdAt) VALUES (:uuid, :name, :testimonial, :text, :createdAt)", {
            type: QueryTypes.INSERT,
            replacements: { 
                uuid, 
                name: body.name,
                testimonial: files.testimonial[0].filename,
                text: body.text,
                createdAt
            }
        });

        sequelize
            .sync()
            .then(() => {
                action = 'add';
                console.log('Added testimonial');
                return res.redirect('/superuser/testimonial');
            })
            .catch((error) => {
                return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    } catch (error) {
        
    }
}

const deleteTestimonialController = async (req, res) => {
    try {
        const body = req.body;

        await sequelize.query("DELETE FROM `tb_testimonials` WHERE testimonial_id = :id", {
            type: QueryTypes.DELETE,
            replacements: { 
                id: req.params.id 
            }
        });

        sequelize
            .sync()
            .then(() => {
                action = 'delete';
                console.log('Deleted testimonial');
                return res.redirect('/superuser/testimonial');
            })
            .catch((error) => {
                console.log(error)
                return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    } catch (error) {
        console.log(error)
        return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

module.exports = {
    testimonialsController,
    addTestimonialController,
    deleteTestimonialController
}