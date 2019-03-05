const xml2js = require('xml2js');

module.exports = {
    xmlTojson: async (ctx, next) => {
        console.log(ctx.request.body);
        try {
            ctx.request.body = await new Promise((resolve, reject) => {

                xml2js.parseString(ctx.request.body.replace(/^\ufeff/i, "").replace(/^\ufffe/i, ""), (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        } catch (e) {
            throw e;
        }

        next();
    }
};