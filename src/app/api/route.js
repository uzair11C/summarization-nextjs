import { spawn } from "child_process";

export default function POST(req, res) {
    if (req.method === "POST") {
        const { text } = req.body;

        const pythonProcess = spawn("python3", ["summarize.py", text]);

        pythonProcess.stdout.on("data", (data) => {
            const summary = JSON.parse(data.toString());
            res.status(200).json(summary);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
            res.status(500).send(
                "An error occurred while summarizing the text"
            );
        });

        pythonProcess.on("close", (code) => {
            if (code !== 0) {
                res.status(500).send(
                    "An error occurred while summarizing the text"
                );
            }
        });
    } else {
        // res.status(405).send("Method Not Allowed");
        res.status(200).json({ message: "Hello from Next.js!" });
    }
}
