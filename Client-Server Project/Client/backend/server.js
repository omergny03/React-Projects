const express = require('express');
const cors = require('cors');  // CORS modülünü dahil et
const net = require('net');     // TCP modülü
const app = express();
const port = 3000;              // React uygulamanızın bağlanacağı port
const tcpPort = 8080;           // C sunucunuzun portu

// CORS yapılandırması
const corsOptions = {
    origin: 'http://localhost:5173', // React uygulamanızın çalıştığı port
    methods: ['POST', 'OPTIONS'], // Yalnızca POST ve OPTIONS metodlarını kabul et
    allowedHeaders: ['Content-Type'], // İzin verilen başlıklar
    preflightContinue: false, // Preflight isteklerinde yanıt ver
    optionsSuccessStatus: 200, // OPTIONS isteği başarılı durum
};

// JSON body parsing için middleware
app.use(cors(corsOptions)); // CORS'u aktif et
app.use(express.json()); // JSON formatındaki body'leri parse et

// TCP istemcisi fonksiyonu
function sendTcpMessage(message, callback) {
    const client = new net.Socket();
    client.connect(tcpPort, '127.0.0.1', function() {  //127.0.0.1
        console.log('Connected to C server');
        client.write(message); // Mesajı gönder
    });

    client.on('data', function(data) {  //sunucudan veri alındığında tetiklenir
        console.log('Received from C server: ' + data);
        callback(data.toString()); // C sunucusundan gelen yanıtı callback fonksiyonuna ilet
        client.destroy(); // Bağlantıyı kapat
    });

    client.on('error', function(err) {
        console.log('Error: ', err.message);
        callback('Error: ' + err.message); // Hata durumunda callback ile hata mesajını gönder
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}

// React'tan gelen HTTP isteklerine yanıt ver
app.post('/send-command', (req, res) => {
    const { command } = req.body;
    
    // Komut sunucuya gönderiliyor
    sendTcpMessage(command, function(response) {
        res.send({ message: response }); // Sunucudan alınan yanıt React'a gönderiliyor
    });
});

// Backend'i başlat
app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});