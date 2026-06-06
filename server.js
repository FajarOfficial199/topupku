const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const QRCode = require("qrcode");
const app = express();

function md5(text) {
    return crypto.createHash("md5").update(text).digest("hex");
}

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
// PROFILE
app.get("/api/profile", async (req, res) => {
    try {
        const { api_id, api_key } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/profile",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key)
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/api/qrbuffer", async (req, res) => {
    try {

        const { qr } = req.query;

        if (!qr) {
            return res.json({
                status: false,
                msg: "Parameter qr kosong"
            });
        }

        const buffer = await QRCode.toBuffer(qr);

        res.setHeader("Content-Type", "image/png");
        res.send(buffer);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});
// SERVICE
app.get("/api/service", async (req, res) => {
    try {
        const { api_id, api_key, filter_value } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/service",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key),
                filter_value
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// KATEGORI
app.get("/api/kategori", async (req, res) => {
    try {
        const { api_id, api_key } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/kategori",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key)
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ORDER
app.get("/api/order", async (req, res) => {
    try {
        const {
            api_id,
            api_key,
            service_id,
            target_id,
            target_server
        } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/order",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key),
                service_id,
                target_id,
                target_server
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// STATUS ORDER
app.get("/api/status", async (req, res) => {
    try {
        const {
            api_id,
            api_key,
            order_id
        } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/status",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key),
                order_id
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CEK NICKNAME
app.get("/api/game", async (req, res) => {
    try {
        const {
            api_id,
            api_key,
            user_id,
            zone_id,
            code
        } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/game",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key),
                user_id,
                zone_id,
                code
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PAYMENT
app.get("/api/payment", async (req, res) => {
    try {
        const {
            api_id,
            api_key,
            reff_id,
            kode_bank,
            nominal
        } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/payment",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key + reff_id),
                reff_id,
                kode_bank,
                nominal
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// STATUS PAYMENT
app.get("/api/status-payment", async (req, res) => {
    try {
        const {
            api_id,
            api_key,
            reff_id
        } = req.query;

        const response = await axios.post(
            "https://topupku.com/api/status-payment",
            {
                api_id,
                api_key,
                signature: md5(api_id + api_key),
                reff_id
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
