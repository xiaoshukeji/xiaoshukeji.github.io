const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 2222;
const HOST = "0.0.0.0";
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent((urlPath || "/").split("?")[0]);
  const target = cleanPath === "/" ? "/index.html" : cleanPath;
  const normalized = path.normalize(target).replace(/^(\.\.[\/\\])+/, "");
  return path.join(ROOT, normalized);
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-cache" });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Bluetooth speaker app listening on http://${HOST}:${PORT}`);
});
