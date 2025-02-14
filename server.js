const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const SPREADSHEET_ID = "1NRKF8JRfKlXFyjkT3hdyo_DSvRHbpRDhDa1-l5D_Io4"; // スプレッドシートID

// Google認証
const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString()),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});


// スプレッドシートからデータを取得
async function getSheetData() {
    try {
        console.log("Google API に接続中...");
        const client = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: client });

        console.log("データ取得中...");
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "シート1!A1:D10",
        });

        console.log("取得したデータ:", response.data.values);
        return response.data.values;
    } catch (error) {
        console.error("スプレッドシート取得エラー:", error);
        throw error;
    }
}

// APIエンドポイントの設定
app.get("/api/data", async (req, res) => {
    try {
        console.log("API `/api/data` にリクエストが来ました");
        const data = await getSheetData();
        res.json(data);
    } catch (error) {
        console.error("API のエラー:", error);
        res.status(500).send(error.toString());
    }
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});