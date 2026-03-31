# Claude Code Source v2.1.88

> **Claude Code Source** v2.1.88 源码泄露存档合集 -- 整合自三个不同来源，涵盖从原始破解还原到可直接运行的完整版本。**Claude Code** 源码、**v2.1.88** 下载、**Claude Code** 破解版、**Claude Code** 完整源码。

---

## 目录导航

- [Claude Code Source v2.1.88](#claude-code-source-v2188)
- [项目总览](#项目总览)
- [快速开始](#快速开始-5-分钟上手)
- [三个版本详细说明](#三个版本详细说明)
  - [01-claude-code-source-crack -- 原始破解版](#01-claude-code-source-crack----原始破解版)
  - [02-claude-code-source-research -- 学术研究版](#02-claude-code-source-research----学术研究版)
  - [03-claude-code-runnable -- 可运行版](#03-claude-code-runnable----可运行版推荐)
- [源码核心架构速览](#源码核心架构速览)
- [三个版本之间的区别对照](#三个版本之间的区别对照)
- [常见问题 FAQ](#常见问题-faq)
- [关键数据](#关键数据)
- [声明](#声明)

---

## 项目总览

| # | 目录 | 来源 | 定位 | 适合谁 |
|---|------|------|------|--------|
| 1 | `01-claude-code-source-crack/` | [Janlaywss/cloud-code](https://github.com/Janlaywss/cloud-code) | 原始破解版 -- 含 npm .tgz 包、还原脚本、source map 还原后源码 + 构建脚本 | 想了解还原过程的研究者 |
| 2 | `02-claude-code-source-research/` | [Rito-w/claude-code](https://github.com/Rito-w/claude-code) | 学术研究版 -- 纯 `src/` 源码快照 + 详细架构分析文档 | 想阅读 **Claude Code** 源码、学习架构的开发者 |
| 3 | `03-claude-code-runnable/` | [Rito-w/ClaudeCode](https://github.com/Rito-w/ClaudeCode) | **可直接运行版** -- 配好 shims、依赖、tsconfig，`bun install && bun run dev` 即可启动 | **想跑起来试试的人（推荐首选）** |

---

## 快速开始（5 分钟上手）

> 只想最快跑起来？直接看 `03-claude-code-runnable/` 即可。

### 前置环境要求

| 工具 | 版本要求 | 安装方式 |
|------|---------|---------|
| **Bun** | >= 1.3.5 | `curl -fsSL https://bun.sh/install | bash` |
| **Node.js** | >= 24.0.0 | [nodejs.org](https://nodejs.org) 或 `nvm install 24` |
| **Git** | any | 系统自带或 [git-scm.com](https://git-scm.com) |

### 步骤一：运行可运行版（03-claude-code-runnable）

```bash
# 进入可运行版目录
cd 03-claude-code-runnable/

# 安装依赖
bun install

# 启动 Claude Code CLI
bun run dev

# 验证版本
bun run version
# 输出: 999.0.0-restored (Claude Code)
```

> **注意**: 运行需要有效的 Anthropic API Key。设置方式：
> ```bash
> export ANTHROPIC_API_KEY="sk-ant-xxxxx"
> ```
> 或者通过 `claude /login` 命令进行 OAuth 登录。

---

## 三个版本详细说明

### 01-claude-code-source-crack -- 原始破解版 (Claude Code Source 还原)

**来源**: [Janlaywss/cloud-code](https://github.com/Janlaywss/cloud-code) (99 stars, 219 forks)

**内容清单**:

```
01-claude-code-source-crack/
  README.md                              # 还原方法说明
  anthropic-ai-claude-code-2.1.88.tgz    # 原始 npm 包 (.tgz)
  claude-code-extracted/package/          # 从 .tgz 直接解压的内容
  claude-code-source/                     # 从 source map 还原的完整源码
    README.md                            # 构建说明（含 build.ts 配置）
    src/                                 # 1902 个核心源码文件
    vendor/                              # 原生模块源码
    node_modules/                        # 打包的第三方依赖
```

**核心价值**:

- 保留了原始 `.tgz` npm 包文件
- 包含完整的 source map 还原脚本
- `claude-code-source/README.md` 中有详细的 `build.ts` 构建配置（90+ 特性开关）
- 展示了从 `cli.js.map` 逆向还原 4756 个源文件的完整过程

**还原方法**（已在 README 中说明）:

```bash
# 从 npm 下载 Claude Code v2.1.88
npm pack @anthropic-ai/claude-code --registry https://registry.npmjs.org

# 解压
tar xzf anthropic-ai-claude-code-2.1.88.tgz

# 用 source map 还原源码
node -e "
const fs = require('fs'), path = require('path');
const map = JSON.parse(fs.readFileSync('package/cli.js.map', 'utf8'));
for (let i = 0; i < map.sources.length; i++) {
  const content = map.sourcesContent[i];
  if (!content) continue;
  let relPath = map.sources[i];
  while (relPath.startsWith('../')) relPath = relPath.slice(3);
  const outPath = path.join('./claude-code-source', relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content);
}
"
```

---

### 02-claude-code-source-research -- 学术研究版 (Claude Code 源码分析)

**来源**: [Rito-w/claude-code](https://github.com/Rito-w/claude-code) (forked from instructkr/claude-code)

**内容清单**:

```
02-claude-code-source-research/
  README.md    # 详尽的架构分析文档
  src/         # 1900+ 个 TypeScript 源文件
```

**核心价值**:

- **最详尽的架构文档** -- README 中包含了完整的工具系统、命令系统、服务层、权限系统等分析
- 40+ 工具实现说明（BashTool、FileReadTool、AgentTool、MCPTool...）
- 50+ 斜杠命令说明（/commit、/review、/compact、/mcp...）
- Bridge 桥接系统架构分析
- Tech Stack 技术栈总结（Bun + TypeScript + React + Ink + Commander.js + Zod v4）
- 适合纯阅读和学习，不含构建配置

---

### 03-runnable -- 可运行版（推荐）Claude Code 完整源码

**来源**: [Rito-w/ClaudeCode](https://github.com/Rito-w/ClaudeCode) (forked from pengchengneo/Claude-Code)

**内容清单**:

```
03-runnable/
  package.json           # 已配置好的依赖声明
  tsconfig.json          # TypeScript 配置
  bun.lock               # 锁定的依赖版本
  AGENTS.md              # 开发指南
  image-processor.node   # 原生图片处理模块
  preview.png            # 预览截图
  shims/                 # 原生模块的兼容替代 (stub)
  src/                   # 核心源码 (1987 个文件)
  vendor/                # 原生绑定源码
  xiaohongshu/           # 功能发现分析的配图素材
```

**核心价值**:

- **开箱即用** -- `bun install && bun run dev` 直接启动
- 已解决私有包问题：通过 `shims/` 目录提供了所有私有包的功能存根
  - `@ant/claude-for-chrome-mcp` -- Chrome MCP 扩展存根
  - `@ant/computer-use-input` -- 计算机使用输入存根
  - `@anthropic-ai/mcpb` -- MCP bundle 处理器存根
  - `color-diff-napi` -- 语法高亮 native 模块存根
  - `modifiers-napi` -- macOS 按键修饰符存根
  - `url-handler-napi` -- URL 处理存根
- **7 大隐藏功能深度分析**（见 README）:
  1. BUDDY -- AI 电子宠物（18 种物种、5 级稀有度）
  2. KAIROS -- 永不关机的持久助手模式
  3. ULTRAPLAN -- 云端深度规划（30 分钟 Opus 研究）
  4. Coordinator -- 多 Agent 编排模式
  5. 26+ 隐藏命令 & 秘密开关
  6. Bridge -- 远程遥控终端
  7. 50 个编译开关 + 远程 GrowthBook 门控

---

## 源码核心架构速览 (Claude Code 架构分析)

```
src/
  main.tsx              # 应用入口 (Commander.js CLI + React/Ink 渲染)
  QueryEngine.ts        # LLM 查询引擎 (~46K 行，核心中的核心)
  Tool.ts               # 工具类型系统 (~29K 行)
  commands.ts           # 命令注册表 (~25K 行)
  tools.ts              # 工具注册表

  tools/                # 53 个 Agent 工具实现
    BashTool/           #   Shell 命令执行
    FileReadTool/       #   文件读取
    FileWriteTool/      #   文件创建/覆写
    FileEditTool/       #   局部文件修改
    GlobTool/           #   文件模式匹配
    GrepTool/           #   ripgrep 内容搜索
    AgentTool/          #   子代理派发
    MCPTool/            #   MCP 服务器工具调用
    ...

  commands/             # 87 个斜杠命令
  components/           # 148 个终端 UI 组件 (React + Ink)
  services/             # API / MCP / OAuth / Analytics 等核心服务
  hooks/                # 87 个自定义 Hooks (含权限系统)
  bridge/               # IDE 桥接层 (VS Code / JetBrains 双向通信)
  coordinator/          # 多 Agent 协调器
  buddy/                # 电子宠物系统
  skills/               # 技能加载与执行
  vim/                  # Vim 模式引擎
  voice/                # 语音交互
  ...
```

**技术栈**:

| 分类 | 技术 |
|------|------|
| 运行时 | Bun |
| 语言 | TypeScript (strict) |
| 终端 UI | React + Ink |
| CLI 解析 | Commander.js (extra-typings) |
| Schema 校验 | Zod v4 |
| 代码搜索 | ripgrep |
| 协议 | MCP SDK, LSP |
| API | Anthropic SDK |
| 遥测 | OpenTelemetry + gRPC |
| 特性门控 | GrowthBook |
| 认证 | OAuth 2.0, JWT, macOS Keychain |

---

## 三个版本之间的区别对照

| 特性 | 01-claude-code-source-crack | 02-claude-code-source-research | 03-claude-code-runnable |
|------|:-:|:-:|:-:|
| 原始 .tgz npm 包 | ✅ | - | - |
| Source map 还原脚本 | ✅ | - | - |
| 完整 src/ 源码 | ✅ | ✅ | ✅ |
| 架构分析文档 | 基础 | **详尽** | 隐藏功能分析 |
| 构建脚本 (build.ts) | ✅ (在 README 中) | - | - |
| package.json | - | - | ✅ |
| shims 兼容层 | - | - | ✅ |
| vendor 原生模块 | ✅ | - | ✅ |
| 可直接 `bun run dev` | ❌ (需自行配置) | ❌ (仅源码) | ✅ |
| 隐藏功能图文分析 | - | - | ✅ (xiaohongshu/) |

---

## 常见问题 FAQ

### Q: 我应该从哪个版本开始？

**想跑起来玩**: 直接看 `03-claude-code-runnable/`，跟着快速开始走。

**想学习架构**: 先读 `02-claude-code-source-research/README.md` 了解整体设计，再到 `03-claude-code-runnable/src/` 中阅读具体实现。

**想了解还原过程**: 看 `01-claude-code-source-crack/README.md` 和 `01-claude-code-source-crack/claude-code-source/README.md`。

### Q: `bun install` 失败怎么办？

1. 确认 Bun 版本 >= 1.3.5: `bun --version`
2. 确认 Node.js 版本 >= 24: `node --version`
3. 如果 shims 报错，检查 `03-claude-code-runnable/shims/` 目录是否完整
4. 网络问题可尝试: `bun install --registry https://registry.npmmirror.com`

### Q: 如何设置 API Key？

```bash
# 方法 1: 环境变量
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"

# 方法 2: OAuth 登录 (启动后执行)
claude /login

# 方法 3: 使用 AWS Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_ACCESS_KEY_ID="xxxxx"
export AWS_SECRET_ACCESS_KEY="xxxxx"

# 方法 4: 使用 Google Vertex
export CLAUDE_CODE_USE_VERTEX=1
```

### Q: 隐藏功能怎么开启？

大部分隐藏功能通过**编译开关**控制（需修改构建脚本重新编译），部分可通过**环境变量**尝试：

```bash
# 协调器模式 (多 Agent)
export CLAUDE_CODE_COORDINATOR_MODE=1

# 主动模式
export CLAUDE_CODE_PROACTIVE=1

# 简报模式
export CLAUDE_CODE_BRIEF=1

# 自定义模型
export ANTHROPIC_MODEL="claude-sonnet-4-20250514"

# 最大输出 token
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=16384
```

### Q: 这些代码是怎么泄露的？

2026 年 3 月 31 日，[@Fried_rice](https://x.com/Fried_rice/status/2038894956459290963) 发现 `@anthropic-ai/claude-code` npm 包中的 `cli.js.map` source map 文件包含了完整的 `sourcesContent`，可以无损还原所有 4756 个 TypeScript 源文件。这是一个典型的**构建产物泄露**（build artifact leak）安全事件。

---

## 关键数据

| 指标 | 数值 |
|------|------|
| 源文件总数 | 4,756 |
| 核心源码 (src/ + vendor/) | ~1,906 文件 |
| 代码行数 | 512,000+ |
| Source Map 大小 | 57 MB |
| npm 包版本 | 2.1.88 |
| 编译开关数量 | 50+ (外部版约 90 个配置项) |
| 工具实现 | 53 个 |
| 斜杠命令 | 87 个 |
| UI 组件 | 148 个 |

---

## 声明

- 本仓库为 **Claude Code Source** 整合存档，源码版权归 [Anthropic](https://www.anthropic.com) 所有
- 仅用于技术研究与学习，请勿用于商业用途
- 如有侵权，请联系删除
- 本仓库不隶属于、未经 Anthropic 认可或维护
