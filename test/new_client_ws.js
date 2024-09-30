const { VASTWebSocketClient } = require('../lib/client-ws');

VASTWebSocketClient.create({
    url: 'ws://localhost:20001',
    id: 'test',
    pos: [0, 0],
    flags: [],
}).then(async client => {
    await client.waitUntilAssigned();

    client.on('publication', publication => {
        console.log('Received publication:', publication.payload);
    });

    client.subscribe({
        aoi: {
            field: 'circular',
            value: {
                center: { x: 0, y: 0 },
                radius: 100
            }
        },
        follow: false,
        channel: 'test'
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    client.publish({
        aoi: {
            field: 'circular',
            value: {
                center: {
                    x: 10, y: 10
                },
                radius: 10
            }
        },
        channel: 'test',
        payload: new Uint8Array([1, 2, 3, 4, 5])
    });
});