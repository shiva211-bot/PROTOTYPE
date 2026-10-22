import http.server
import socketserver
import os
import webbrowser

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # Chrome needs byte-range responses to seek through the showroom video.
    def _serve_walkthrough(self, head_only=False):
        from urllib.parse import unquote, urlsplit
        request_path = unquote(urlsplit(self.path).path)
        if request_path != "/assets/drift-walkthrough.mp4":
            return False
        file_path = os.path.join(DIRECTORY, "assets", "drift-walkthrough.mp4")
        if not os.path.isfile(file_path):
            self.send_error(404, "Walkthrough video not found")
            return True
        size = os.path.getsize(file_path)
        start, end = 0, size - 1
        range_header = self.headers.get("Range")
        if range_header and range_header.startswith("bytes="):
            try:
                spec = range_header[6:].split(",", 1)[0].strip()
                left, right = spec.split("-", 1)
                if left:
                    start = int(left)
                    end = min(int(right), size - 1) if right else size - 1
                else:
                    suffix = int(right)
                    start = max(0, size - suffix)
                if start >= size or end < start:
                    self.send_response(416)
                    self.send_header("Content-Range", f"bytes */{size}")
                    self.send_header("Accept-Ranges", "bytes")
                    self.end_headers()
                    return True
            except (ValueError, IndexError):
                start, end = 0, size - 1
        partial = bool(range_header and range_header.startswith("bytes="))
        self.send_response(206 if partial else 200)
        self.send_header("Content-Type", "video/mp4")
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}") if partial else None
        self.send_header("Last-Modified", self.date_time_string(os.path.getmtime(file_path)))
        self.end_headers()
        if not head_only:
            with open(file_path, "rb") as video_file:
                video_file.seek(start)
                remaining = end - start + 1
                while remaining:
                    chunk = video_file.read(min(64 * 1024, remaining))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    remaining -= len(chunk)
        return True

    def do_GET(self):
        if self._serve_walkthrough():
            return
        super().do_GET()

    def do_HEAD(self):
        if self._serve_walkthrough(head_only=True):
            return
        super().do_HEAD()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving Shruti Silk Stories at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
