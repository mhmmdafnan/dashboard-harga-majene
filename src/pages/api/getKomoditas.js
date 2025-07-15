import { google } from "googleapis";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    // Ambil dari ENV lalu decode base64
    const decoded = Buffer.from(
      process.env.GOOGLE_CREDENTIALS,
      "base64"
    ).toString("utf-8");
    const credentials = JSON.parse(decoded);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1DQqrUh9ZafZpo4I00FZwXcQlPX8YL-ztQQbYz6ay4h8",
      range: "Sheet1!A1:AB390",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }

    const headers = rows[0];
    const data = rows.slice(1).map((row) =>
      headers.reduce((obj, key, i) => {
        obj[key] = row[i] || "";
        return obj;
      }, {})
    );

    // Ambil semua nama unik dari kolom tersebut
    const uniqueNames = [
      ...new Set(
        data.map((item) =>
          item["Kelompok/Sub Kelompok/Komoditas Jenis Barang dan Jasa"]?.trim()
        )
      ),
    ].filter(Boolean); // buang undefined/null

    res.status(200).json(uniqueNames);
  } catch (error) {
    console.error("Error fetching komoditas:", error);
    res.status(500).json({ message: "Server error" });
  }
}
