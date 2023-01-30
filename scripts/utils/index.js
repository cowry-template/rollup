import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取 __dirname

export function getDirName() {
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(__filename);
}

// 获取 package.json 内容
export function getPackageInfo() {
  const __dirname = getDirName();

  const data = fs.readFileSync(
    path.resolve(__dirname, "../../package.json"),
    "utf8"
  );
  return JSON.parse(data);
}

// output 配置
export function buildOutput(types, pkgName, defaultOpts = {}) {
  return types.map((format) => {
    let file = `dist/${pkgName}.${format}.js`;
    if (format == "iife") {
      file = `dist/${pkgName}.js`;
    }
    return {
      file,
      format,
      name: pkgName,
      ...defaultOpts,
    };
  });
}
