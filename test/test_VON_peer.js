/*
    unit test for VON_peer

    2012.07.10
*/


// flags
var AUTOMATIC_LEAVE_PERIOD = 3;     // number of seconds

require('../lib/common.js');

// do not show debug
LOG.setLevel(1);

// set default IP/port
var gateway_addr = {host: VAST.Settings.IP_gateway, port: VAST.Settings.port_gateway};
var is_client = false;

// IP/port
if (process.argv[2]) {
	var addr = UTIL.parseAddress(process.argv[2]);

	// if this is IP + port
	if (addr.host === '')
		addr.host = VAST.Settings.IP_gateway;
	else
		is_client = true;

	gateway_addr = addr;

	var move = JSON.parse(process.argv[3]);
}

LOG.debug('GW ip: ' + gateway_addr.host + ' port: ' + gateway_addr.port);
LOG.debug('is_client: ' + is_client);

var x = Math.floor(Math.random() * 1000);
var y = Math.floor(Math.random() * 1000);

x = x == 0 ? x+1: x;
y = y == 0 ? y+1: y;

// create GW or a connecting client;
var peer = new VON.peer();
peer.debug(false);
var aoi  = new VAST.area(new VAST.pos(x, y), 10);

var moveAround = function () {
	aoi = peer.getSelf().aoi;

    // random walk new location (5 units within current center position)
    aoi.center.x += Math.floor((Math.random()*10) - 5);
    aoi.center.y += Math.floor((Math.random()*10) - 5);

    if (aoi.center.x < 0)
        aoi.center.x *= -1;
	if (aoi.center.x == 0)
		aoi.center.x = 1;
	if (aoi.center.x >= 1000)
		aoi.center.x = 999;
	if (aoi.center.y >= 1000)
		aoi.center.y = 999;
	if (aoi.center.y == 0)
		aoi.center.y = 1;
    if (aoi.center.y < 0)
        aoi.center.y *= -1;

    var neighbor_size = Object.keys(peer.list()).length;
    LOG.debug('move around to ' + aoi.center.toString() + ' neighbor size: ' + neighbor_size);
    peer.move(aoi);
}

// join to myself as the gateway
// NOTE: interesting idea to always be able to "join self" (i.e., everyone is a gateway)
var interval_id = undefined;

// after init the peer will bind to a local port
peer.init((is_client ? VAST.ID_UNASSIGNED : VAST.ID_GATEWAY), gateway_addr.port, function () {

    peer.join(gateway_addr, aoi,

        // done callback
        function (id) {
            LOG.warn('joined successfully! id: ' + id + '\n');

            // try to move around once in a while...  (if not gateway)
            if (id !== VAST.ID_GATEWAY && move) {
                interval_id = setInterval(function(){ moveAround() }, 1000);
            }
        }
    );
});
