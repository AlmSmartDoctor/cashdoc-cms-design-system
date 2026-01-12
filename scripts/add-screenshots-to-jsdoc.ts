import fs from "fs";
import path from "path";

const BASE_URL =
  "https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots";
const SCREENSHOT_DIR = "__screenshots__";

// 디렉토리 재귀 탐색
function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file.endsWith(".png")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 컴포넌트별 스크린샷 매핑 생성
function getComponentScreenshots(): Map<string, string[]> {
  const componentMap = new Map<string, string[]>();
  const screenshots = walkDir(SCREENSHOT_DIR);

  for (const screenshot of screenshots) {
    const relativePath = path.relative(SCREENSHOT_DIR, screenshot);
    const parts = relativePath.split(path.sep);

    if (parts.length >= 2) {
      const componentName = parts[1]; // Button, Dropdown 등

      if (!componentMap.has(componentName)) {
        componentMap.set(componentName, []);
      }

      componentMap.get(componentName)!.push(screenshot);
    }
  }

  return componentMap;
}

// 컴포넌트 파일 찾기
function findComponentFile(componentName: string): string | null {
  const srcDir = "src/components";

  function searchDir(dir: string): string | null {
    if (!fs.existsSync(dir)) return null;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const result = searchDir(filePath);
        if (result) return result;
      } else if (file === `${componentName}.tsx`) {
        return filePath;
      }
    }
    return null;
  }

  return searchDir(srcDir);
}

// 우선순위에 따라 대표 스크린샷 선택
function selectPrimaryScreenshot(screenshots: string[]): string | null {
  const priority = [
    "All States.png",
    "Default.png",
    "Comprehensive Example.png",
    "Basic.png",
  ];

  for (const prio of priority) {
    const found = screenshots.find((s) => s.endsWith(prio));
    if (found) return found;
  }

  return screenshots[0] || null;
}

// JSDoc에 이미지 섹션 추가 (맨 밑)
function addScreenshotToJSDoc(content: string, screenshotPath: string): string {
  // __screenshots__/Forms/TimePicker/Default.png -> Forms/TimePicker/Default.png
  const relativePath = path
    .relative(SCREENSHOT_DIR, screenshotPath)
    .replace(/\\/g, "/");
  const imageUrl = `${BASE_URL}/${relativePath}?raw=true`;

  const imageSection = `\n *\n * ## 참고사진\n * ![](${imageUrl})`;

  // JSDoc 블록 찾기 - 여러 패턴 시도
  // 패턴 1: export const/function
  let jsdocRegex = /(\/\*\*[\s\S]*?\*\/)\s*export\s+(const|function)\s+\w+/;
  let match = content.match(jsdocRegex);

  // 패턴 2: const ComponentName = forwardRef (export 전에 선언)
  if (!match) {
    jsdocRegex =
      /(\/\*\*[\s\S]*?\*\/)\s*const\s+\w+\s*=\s*(React\.)?forwardRef/;
    match = content.match(jsdocRegex);
  }

  // 패턴 3: const ComponentName = PrimitiveName; (Radix 패턴)
  if (!match) {
    jsdocRegex = /(\/\*\*[\s\S]*?\*\/)\s*const\s+\w+\s*=\s*\w+\.\w+;/;
    match = content.match(jsdocRegex);
  }

  if (!match) {
    console.log("  ⚠️  JSDoc not found");
    return content;
  }

  const jsdocBlock = match[1];

  // 이미 참고사진 섹션이 있는지 확인
  if (jsdocBlock.includes("## 참고사진")) {
    console.log("  ℹ️  참고사진 section already exists");
    return content;
  }

  // JSDoc 맨 밑에 삽입 (마지막 */ 바로 앞)
  const newJsdoc = jsdocBlock.replace(/(\n \*\/)$/, `${imageSection}\n */`);
  return content.replace(jsdocBlock, newJsdoc);
}

// 메인 실행
function main() {
  console.log("🔍 Scanning screenshots...\n");

  const componentScreenshots = getComponentScreenshots();

  console.log(
    `📸 Found ${componentScreenshots.size} components with screenshots\n`,
  );

  // 각 컴포넌트 파일 처리
  for (const [componentName, screenshots] of componentScreenshots) {
    console.log(`\n📝 Processing ${componentName}...`);
    console.log(`   Found ${screenshots.length} screenshot(s)`);

    // 컴포넌트 TSX 파일 찾기
    const componentFile = findComponentFile(componentName);

    if (!componentFile) {
      console.log(`  ⚠️  Component file not found for ${componentName}`);
      continue;
    }

    console.log(`   File: ${componentFile}`);

    // 대표 스크린샷 선택
    const primaryScreenshot = selectPrimaryScreenshot(screenshots);

    if (!primaryScreenshot) {
      console.log(`  ⚠️  No suitable screenshot found`);
      continue;
    }

    console.log(`   Using: ${path.basename(primaryScreenshot)}`);

    // 파일 읽기
    const content = fs.readFileSync(componentFile, "utf-8");

    // JSDoc에 이미지 추가
    const newContent = addScreenshotToJSDoc(content, primaryScreenshot);

    if (newContent !== content) {
      fs.writeFileSync(componentFile, newContent, "utf-8");
      console.log("  ✅ Screenshot added to JSDoc");
    }
  }

  console.log("\n\n✨ Done!");
}

main();
