# PRobe — Deep scan. Smart review. Ship with confidence.

**PRobe** is an AI-powered GitHub Pull Request analysis dashboard that helps maintainers and tech leads make informed code review decisions. Paste a GitHub repo URL, select any open PR, and get instant insights powered by IBM Watson Machine Learning with Granite 3.0 8B Instruct.

![PRobe Landing Page](https://github.com/user-attachments/assets/4b14b211-5814-44c1-9547-316893f18758)

## 🎯 What PRobe Does

PRobe analyzes pull requests and surfaces:

- **Plain English Summaries** — Understand what the PR does in seconds, written for non-technical stakeholders
- **Refactor Score** — Visual circular progress ring showing code quality (0-100 scale)
- **Test Coverage Analysis** — Identifies functions missing test coverage with severity ratings
- **Security Scanning** — Detects vulnerabilities, hardcoded secrets, and insecure patterns
- **PR Size Warnings** — Flags oversized PRs and mixed concerns with split suggestions
- **Auto-Label Suggestions** — AI-generated labels with confidence scores

All analysis happens in **one single AI call** to conserve credits and maximize efficiency.

![PRobe Dashboard](https://github.com/user-attachments/assets/84546c89-cdb2-48ba-abde-2a5321d1cdd6)

## 🚀 Features

### For Maintainers
- **Zero Configuration** — Works with public GitHub repos, no authentication required
- **Instant Analysis** — Results in ~10-15 seconds per PR
- **Smart Caching** — Analyzed PRs are cached for 30 minutes
- **Brutalist UI** — Clean, distraction-free interface with true black (#0a0a0a) background

### For Tech Leads
- **Risk Assessment** — Refactor scores highlight technical debt
- **Security First** — CVE detection, secret scanning, and pattern analysis
- **Review Efficiency** — Plain English summaries save review time
- **Data-Driven Decisions** — Confidence scores on all AI suggestions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS + Custom Brutalist Design System
- **AI Engine**: IBM Watson Machine Learning (Granite 3.0 8B Instruct)
- **GitHub Integration**: Octokit (GitHub REST API v3)
- **Deployment**: Vercel-ready with zero-config deployment

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- IBM Watson Machine Learning credentials
- (Optional) GitHub Personal Access Token for private repos

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/probe.git
   cd probe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the `probe` directory:
   ```env
   # IBM Watson Machine Learning
   WATSON_ML_URL=https://us-south.ml.cloud.ibm.com
   WATSON_ML_API_KEY=your_watson_api_key_here
   WATSON_ML_MODEL_ID=ibm/granite-3-8b-instruct
   WATSON_ML_PROJECT_ID=your_project_id_here

   # GitHub (optional, for private repos)
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

PRobe uses a custom brutalist design system:

- **Colors**: True black (#0a0a0a), Electric Violet (#8b5cf6) accent
- **Typography**: 
  - Bebas Neue (display numbers)
  - Space Grotesk (headings)
  - DM Mono (code/metadata)
  - Inter (body text)
- **Layout**: 2-column grid (220px sidebar + flexible main)
- **Components**: Borderless sections with subtle dividers

## 🔧 Configuration

### Watson ML Setup

1. Create a Watson Studio project in IBM Cloud
2. Note your Project ID from the "Manage" tab
3. Generate an API key from IBM Cloud IAM
4. Add credentials to `.env.local`

### GitHub Token (Optional)

For analyzing private repositories:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a token with `repo` scope
3. Add to `.env.local` as `GITHUB_TOKEN`

## 📖 Usage

### Analyzing a PR

1. **Enter a GitHub repo URL**
   ```
   https://github.com/owner/repo
   ```
   or just `owner/repo`

2. **Click "LOAD PRS →"**
   
   All open PRs will appear in the left panel

3. **Select a PR**
   
   Click any PR card to trigger analysis

4. **Review the insights**
   - Summary (top right)
   - Refactor Score (left sidebar)
   - Test Coverage, Security, PR Size, Labels (right column)

### Understanding the Refactor Score

- **0-39 (Green)**: Code is clean, no refactor needed
- **40-74 (Amber)**: Refactor optional but beneficial
- **75-100 (Red)**: Strongly consider refactoring

The score considers:
- Cyclomatic complexity
- Function length (>50 lines penalized)
- Code duplication
- Single Responsibility Principle violations
- Nesting depth (>4 levels penalized)

## 🏗️ Project Structure

```
probe/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   ├── api/
│   │   ├── prs/route.ts      # Fetch PRs endpoint
│   │   └── analyze/route.ts  # AI analysis endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── TopBar.tsx            # Logo + input + button
│   ├── PRList.tsx            # Left panel PR list
│   ├── PRCard.tsx            # Individual PR cards
│   ├── AnalysisPanel.tsx     # Right panel layout
│   ├── BobThinking.tsx       # Loading state
│   ├── analysis/
│   │   ├── SummarySection.tsx
│   │   ├── RefactorScore.tsx
│   │   ├── TestCoverage.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── PRSizeWarning.tsx
│   │   └── LabelSuggestions.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Input.tsx
├── lib/
│   ├── bob.ts                # Watson ML integration
│   ├── github.ts             # GitHub API wrapper
│   ├── cache.ts              # In-memory cache
│   └── utils.ts              # Helper functions
├── types/
│   └── index.ts              # TypeScript interfaces
└── public/                   # Static assets
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

PRobe is a standard Next.js app and can be deployed to:
- Railway
- Render
- AWS Amplify
- Netlify
- Self-hosted with Docker

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM Watson Machine Learning** for providing the Granite 3.0 8B Instruct model
- **GitHub** for the comprehensive REST API
- **Vercel** for Next.js and deployment platform
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on [GitHub Issues](https://github.com/syedzubeen/probe/issues)

---

## 🏆 IBM Bob Hackathon 2026

This project was built as part of the **IBM Bob Hackathon 2026**, showcasing the power of IBM Watson Machine Learning and the Granite model family for real-world developer tools. PRobe demonstrates how AI can enhance code review workflows, improve code quality, and accelerate software delivery.

**Built with ❤️ using IBM Watson ML + Granite 3.0 8B Instruct**
