import { onRequest as health } from "./functions/api/health.js";
import { onRequest as auth } from "./functions/api/auth.js";
import { onRequest as results } from "./functions/api/results.js";
import { onRequest as state } from "./functions/api/state.js";
import { onRequest as submissions } from "./functions/api/submissions.js";

const apiHandlers = new Map([
  ["/api/health", health],
  ["/api/auth", auth],
  ["/api/results", results],
  ["/api/state", state],
  ["/api/submissions", submissions]
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    const handler = apiHandlers.get(url.pathname);
    if (!handler) {
      return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return handler({ request, env });
  }
};
