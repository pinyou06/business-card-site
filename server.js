const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3000;
const SPREADSHEET_ID = "1NRKF8JRfKlXFyjkT3hdyo_DSvRHbpRDhDa1-l5D_Io4"; // スプレッドシートID

// Google認証
const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString()),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});


async function getSheetData() {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });
    const range = "シート1!B2:F"; // D列（画像URL）まで取得

        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: range,
            });
    
            console.log("スプレッドシートから取得したデータ:", response.data.values);
            return response.data.values;
        } catch (error) {
            console.error("スプレッドシート取得エラー:", error);
            throw error;
        }
}


app.get("/data", async (req, res) => {
    try {
        const data = await getSheetData();
        console.log("取得データ:", data); // デバッグ用
        res.json(data);
    } catch (error) {
        console.error("データ取得エラー:", error);
        res.status(500).json({ error: error.toString() }); // エラーを JSON 形式で送る
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
