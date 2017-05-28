const express = require('express');
const router = express.Router();


const pool = {};

function sendJSON(res, status, obj) {
    res.status(status).json(obj);
}

router.get('/request', function(req, res, next) {
    const { connId, timeout } = req.query;
    if(!connId || !timeout){
        sendJSON(res,404,{
            success: false,
            reason: 'Invalid Params'
        });
    }
    else {
        const tRef = setTimeout(() => {
            sendJSON(res,200, { status: pool[connId].status || 'ok' });
            pool[connId] = undefined;
        }, timeout);
        pool[connId] = {
            timeout,
            startTime: Date.now(),
            status: 'ok',
            tRef,
            res
        }
    }
});

router.get('/serverStatus', function(req, res){
    const toSend = {};
    if(pool != undefined ){
    for (let key in pool) {
          console.log(pool[key]);
        toSend[key] = pool[key].timeout;
    }
    sendJSON(res, 200, toSend);
}
});


// assuming this function ends both the calls,
// if this is not desired behaviour then instead just set the status flag to failed in pool[connId]
router.put('/kill', function (req, res) {
    const { connId } = req.body;
    if (!connId) {
        sendJSON(res,404,{
            success: false,
            reason: 'Invalid Params'
        });
    }
    else if (!pool[connId]){
        sendJSON(res, 500, {
            status: `invalid connection id: ${connId}`
        });
    }
    else {
        clearTimeout(pool[connId].tRef);
        sendJSON(pool[connId].res, 200 ,{
            status: 'killed'
        });
        sendJSON(res, 200, {
            status: 'ok'
        });
    }
});

module.exports = router;
