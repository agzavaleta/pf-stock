// PF Stock — shared release version label.
// Plain classic script (no `window.`/`self.` prefix) so it works both as a
// <script src> in index.html (becomes window.APP_VERSION) and via
// importScripts() inside service-worker.js (becomes self.APP_VERSION).
//
// This is the human-facing release label only. It is NOT the same thing as
// BUILD_VERSION in service-worker.js, which is the internal deploy counter
// that triggers the PWA update dialog — bump that separately on every
// deploy, regardless of whether APP_VERSION changes.
var APP_VERSION = "1.0.0";
