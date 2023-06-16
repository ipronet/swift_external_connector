const dotenv = require("dotenv");
const { logger } = require("../logs/winston");
dotenv.config({ path: "./config/config.env" });
const { DetectDevice, DetectIp, } = require("./devicefuncs")
const systemDate = new Date().toISOString().slice(0, 19).replace("T", " ");
// const { ApiCall } = require("./autoCalls");

module.exports = {

    PickHistory: async (data, req) => {
        
        data.date_ended = systemDate
        data.device = req.headers.device
        data.ip =req.headers.ip
        data.url = req.path
        data.user = req.headers.user

        // console.log(data);
    //    ApiCall(`${process.env.AuditUrl}api/v1/savelogs`, 'POST', ``, data)

    },

};