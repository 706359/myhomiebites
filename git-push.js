// const { execSync } = require("child_process");
import { execSync } from "child_process"
const message = process.argv[2];
if (!message) { console.error("❌ Commit message is required."); process.exit(1); }
try {
    execSync(`git add . && git commit -m "${message}" && git push`, { stdio: "inherit", });
} catch (err) { console.error("🚨 Git command failed."); process.exit(1); }
