import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { teamName, teamLeader, collegeName, teamNumber, problemNumber, category } = await req.json();

    if (!teamName || !teamLeader || !collegeName || !teamNumber || !problemNumber || !category) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !privateKey || !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({ message: "Google Sheets configuration is missing." }, { status: 500 });
    }

    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      privateKey,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    await auth.authorize();

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Teams!A1:F1";

    await google.sheets("v4").spreadsheets.values.append({
      auth,
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [teamName, teamLeader, collegeName, teamNumber, problemNumber, category],
        ],
      },
    });

    return NextResponse.json({ message: "Team data successfully submitted!" }, { status: 200 });

  } catch (error: any) {
    console.error("Error submitting team data:", error);

    return NextResponse.json(
      { message: "Internal server error", error: error.message || error.toString() },
      { status: 500 }
    );
  }
}
