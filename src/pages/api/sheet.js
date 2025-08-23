import { google } from "googleapis";

export default async function handler(req, res) {
  try {
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
      spreadsheetId: "1R9_IijsAoi9UYZvipw7zkzyIsbCibR-R9BSUYSAcp7U",
      range: "Sheet1!A1:AB3090",
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

    let filtered;
    let graph;

    if (req.query.bulan) {
      const selectedYear = Number(req.query.tahun);
      const selectedMonth = Number(req.query.bulan); // 1–12

      // Ambil 8 bulan terakhir dari bulan yang dipilih
      let monthsRange = [];
      for (let i = 0; i < 7; i++) {
        let month = selectedMonth - i;
        let year = selectedYear;

        if (month <= 0) {
          month += 12;
          year -= 1;
        }

        monthsRange.push({ month, year });
      }

      // Data spesifik (untuk ditampilkan di atas misalnya)
      filtered = data.find(
        (item) =>
          item["Nama Komoditas"] === req.query.nama &&
          Number(item["Tahun"]) === selectedYear &&
          Number(item["Bulan"]) === selectedMonth
      );

      // Data grafik (8 bulan terakhir)
      graph = data.filter((item) => {
        let itemMonth = Number(item["Bulan"]);
        let itemYear = Number(item["Tahun"]);

        return (
          item["Nama Komoditas"] === req.query.nama &&
          monthsRange.some((m) => m.month === itemMonth && m.year === itemYear)
        );
      });
    } else {
      // kalau ga ada bulan → ambil semua data dalam tahun tsb
      filtered = data.filter(
        (item) =>
          item["Nama Komoditas"] === req.query.nama &&
          String(item["Tahun"]) === String(req.query.tahun)
      );
    }

    console.log("Filtered data:", filtered);
    console.log("Graph data:", graph);
    // res.status(200).json(filtered);
    res.status(200).json({
      filtered,
      graph,
    });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).json({ message: "Server error" });
  }
}
