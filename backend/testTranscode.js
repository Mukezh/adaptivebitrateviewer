import { transcodeToHLS } from "./services/ffmpegService.js";

async function run() {
  try {
    const inputPath = "./test_input/sample.mp4";    // path to your test video
    const outputDir = "./test_output";              // where HLS files will go
    const baseName = "sample";
    console.log('inside try')
    const result = await transcodeToHLS(inputPath, outputDir, baseName);
    console.log("✅ Transcoding complete!");
    console.log(result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

run();
