import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

/* UMD 는 CJS 소비자 호환용이라 단일 번들이어야 합니다.
   ES 는 트리셰이킹을 위해 모듈 구조를 보존하므로 두 포맷을 따로 빌드합니다. */
const UMD_BUILD = process.env.BUILD_FORMAT === "umd";

const EXTERNAL_PACKAGES = [
  ...Object.keys(pkg.peerDependencies),
  ...Object.keys(pkg.dependencies),
];

/* 하위 경로 import(`recharts/es6/...`)까지 external 로 잡습니다.
   다만 의존성이 제공하는 CSS(`react-day-picker/style.css`)는 번들에 넣어야 합니다.
   external 로 두면 style.css 에서 빠져 DatePicker 계열 스타일이 사라집니다. */
const SUBPATH_PATTERN = new RegExp(
  `^(${EXTERNAL_PACKAGES.map((n) => n.replace(/[/\\-]/g, "\\$&")).join("|")})/`,
);

const isExternal = (id: string) => {
  if (id === "react/jsx-runtime") return true;
  if (id.endsWith(".css")) return false;
  if (EXTERNAL_PACKAGES.includes(id)) return true;
  return SUBPATH_PATTERN.test(id);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(UMD_BUILD
      ? []
      : [
          dts({
            insertTypesEntry: true,
            exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
          }),
        ]),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CashdocCmsDesignSystem",
      formats: UMD_BUILD ? ["umd"] : ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      /* dependencies 도 external 로 둡니다. preserveModules 는 번들에 흡수하지 않은
         의존성을 dist/node_modules 아래로 복사해버려, 소비자 쪽에 중복 사본이 생깁니다. */
      external: isExternal,
      output: UMD_BUILD
        ? {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
              "framer-motion": "FramerMotion",
              "react-dropzone": "ReactDropzone",
            },
          }
        : {
            /* 모듈 구조를 유지해야 소비자 번들러가 쓰지 않는 컴포넌트를 덜어낼 수 있습니다.
               단일 번들로 말면 rollup 이 한 덩어리로 내보내 트리셰이킹이 사실상 무력해집니다. */
            preserveModules: true,
            preserveModulesRoot: "src",
            entryFileNames: "[name].js",
          },
    },
    sourcemap: true,
    emptyOutDir: !UMD_BUILD,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 5600,
  },
});
