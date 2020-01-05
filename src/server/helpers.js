//Modulo para Handlenbar unicamente
const moment = require('moment'); // instalamos npm i moment, para poder decir cuanto hace desde k se publico
const helpers = {};

helpers.timeAgo = timestand => {
    return moment(timestand).startOf('minute').fromNow(); // a partir del tiempo dado dice cuantos minutos,horas , dias...fue
}

module.exports = helpers;