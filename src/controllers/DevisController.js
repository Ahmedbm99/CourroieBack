const { Devis } = require('../models');
module.exports = {
async addDevis(req,res){
    try{

        const newDevis = Devis.create(req.body)
        req.status(201).send(newDevis)
    }catch(error)
    {
        res.status(400).send({
                error: "An error occured when adding your devis " + err
            });
    }

}


};
