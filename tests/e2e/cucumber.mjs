import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  default: {
    // Absolute paths ensure Windows + ESM works
    paths: [path.join(__dirname, "features/**/*.feature")],
    import: [
      path.join(__dirname, "steps/**/*.ts"),
      path.join(__dirname, "support/**/*.ts")
    ],
    format: ["progress"]
  }
};
