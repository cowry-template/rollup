import { nodeResolve } from "@rollup/plugin-node-resolve"; // 解析 node_modules 文件中的模块
import commonjs from "@rollup/plugin-commonjs"; // cjs => esm
import alias from "@rollup/plugin-alias"; // alias 和 resolve 功能
import replace from "@rollup/plugin-replace"; // 打包时替换指定字符
import eslint from "@rollup/plugin-eslint";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import clear from "rollup-plugin-clear";
import json from "@rollup/plugin-json"; // 支持在源码中直接引入json文件，不影响下面的

import { buildOutput, getPackageInfo } from "./utils/index.js";

const { name, version, author } = getPackageInfo();

const packageName = "wk_utils";
// 打包处理的文件，添加的备注信息
const banner =
  "/*!\n" +
  ` * ${name} v${version}\n` +
  ` * (c) ${new Date().getFullYear()} ${author}\n` +
  " * Released under the MIT License.\n" +
  " */";

export default {
  input: "src/index.js",
  output: buildOutput(["umd", "cjs", "es", "iife"], packageName, {
    banner,
    plugins: [terser()],
  }),

  plugins: [
    json(),
    clear({
      targets: ["dist"],
    }),
    alias(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs({
      include: "node_modules/**",
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ["src/**"],
      exclude: ["node_modules/**"],
    }),
    babel({
      babelHelpers: "bundled",
    }),
  ],
};
