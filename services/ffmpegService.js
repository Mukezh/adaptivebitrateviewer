import { exec } from "child_process";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import util from 'util'
import { uploadToS3 } from "./s3Service.js";

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transcodeToHLS = async (inputPath, outputDir, baseFileName) => {
    fs.mkdirSync(outputDir, {
        recursive : true
    });

    const resolutions = [
        {name: "480p", size: "854x480", bitrate: "800k"},
        {name: "720p", size: "1280x720", bitrate: "2500k"},
        {name: "1080p", size: "1920x1080", bitrate: "5000k"},
    ];


    const playlistFiles = [];

    for(const res of resolutions){
        const outFile = path.join(outputDir, `${res.name}.m3u8`);
        playlistFiles.push(outFile);

        const cmd = `
        ffmpeg -i "${inputPath}" -vf scale=${res.size} -c:a aac -ar 48000 -c:v h264 \
      -profile:v main -crf 20 -sc_threshold 0 \
      -g 48 -keyint_min 48 -b:v ${res.bitrate} \
      -maxrate ${res.bitrate} -bufsize ${2 * parseInt(res.bitrate)} \
      -hls_time 10 -hls_playlist_type vod -f hls "${outFile}"
      `;
      console.log(`transcoding ${res.name}`);
      await execPromise(cmd);
    }

    const masterPath = path.join(outputDir, "master.m3u8");

    const masterContent = resolutions.map(
        (r) => 
            `#EXT-X-STREAM-INF:BANDWIDTH=${parseInt(r.bitrate) * 1000},RESOLUTION=${r.size}\n${r.name}.m3u8`
    )
    .join("\n");

    fs.writeFileSync(masterPath,`#EXTM3U\n${masterContent}`);

    return { outputDir, playlistFiles: [masterPath, ...playlistFiles]};
};