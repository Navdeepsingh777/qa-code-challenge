# Pokédex QA Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

A comprehensive end-to-end testing framework for the React Pokédex application, built with **Playwright**, **Cucumber BDD**, and **TypeScript**. This framework validates bug fixes across multiple branches and provides detailed HTML reports with visual evidence.

## 🎯 Project Overview

This framework tests a React Pokédex application across three different branches to validate progressive bug fixes:

- **main** - Contains intentional bugs (pagination, detail pages, theme, settings)
- **fix-1** - First iteration of bug fixes 
- **fix-2** - Additional bug fixes and improvements

## 🛠️ Tech Stack

- **Playwright** - Modern browser automation with multi-browser support
- **Cucumber BDD** - Behavior-driven development with Gherkin syntax
- **TypeScript** - Type-safe test development
- **Page Object Model** - Maintainable test architecture
- **Allure Reports** - Rich visual reporting with screenshots and videos
- **Multi-Environment** - Testing across different application branches

## 📁 Project Structure

```
qa-code-challenge/
├── tests/
│   ├── features/               # Gherkin feature files
│   │   ├── home.feature
│   │   ├── detail.feature
│   │   ├── settings.feature
│   │   └── integration.feature
│   │
│   ├── pages/                  # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── DetailPage.ts
│   │   └── SettingsPage.ts
│   │
│   ├── step-definitions/       # Cucumber step implementations
│   │   ├── home.steps.ts
│   │   ├── detail.steps.ts
│   │   ├── settings.steps.ts
│   │   └── integration.steps.ts
│   │
│   ├── support/               # Test configuration
│   │   └── World.ts
│   │
│   ├── hooks/                # Test lifecycle hooks
│   │   └── hooks.ts
│   │
│   ├── utils/                # Utility functions
│   │   └── Logger.ts
│   │
│   └── environments/         # Branch-specific configs
│       ├── main.env
│       ├── fix-1.env
│       └── fix-2.env
│
├── scripts/                  # Test automation scripts
│   ├── test-all-branches.js
│   └── generate-reports.js
│
├── reports/                  # Generated test reports
│   ├── main/
│   ├── fix-1/
│   └── fix-2/
│
├── package.json
├── playwright.config.ts
├── cucumber.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Navdeepsingh777/qa-code-challenge.git
cd qa-code-challenge

# Install dependencies
npm install

# Install browser binaries
npx playwright install
```

### Setup Application Under Test

```bash
# Navigate to parent directory
cd ..

# Clone main branch application
git clone https://github.com/RivetWork/qa-code-challenge.git qa-main
cd qa-main && git checkout main && npm install && cd ..

# Clone fix-1 branch application
git clone https://github.com/RivetWork/qa-code-challenge.git qa-fix1
cd qa-fix1 && git checkout fix-1 && npm install && cd ..

# Clone fix-2 branch application
git clone https://github.com/RivetWork/qa-code-challenge.git qa-fix2
cd qa-fix2 && git checkout fix-2 && npm install && cd ..

# Return to test framework
cd qa-code-challenge
```

## 🧪 Running Tests

### Quick Test Commands

```bash
# Test main branch (with bugs)
npm run test:main

# Test fix-1 branch (partial fixes)
npm run test:fix1

# Test fix-2 branch (more fixes)
npm run test:fix2

# Test all branches sequentially
npm run test:all-branches
```

### Test Categories

```bash
# Critical functionality tests
npm run test:smoke

# Full regression suite
npm run test:regression

# Mobile responsive tests
npm run test:mobile

# Debug mode (visible browser)
npm run test:debug
```

### Advanced Usage

```bash
# Run specific feature
npx cucumber-js features/home.feature

# Run with specific tags
npx cucumber-js --tags "@smoke"

# Run in parallel
npx cucumber-js --parallel 2

# Generate and view report
npm run test:main && npm run report:main
```

## 📊 Test Reports

### Generate Reports

```bash
# Generate HTML report for single branch
npm run report:main
npm run report:fix1
npm run report:fix2

# Generate consolidated comparison report
npm run report:comparison

# Clean old reports
npm run clean:reports
```

### Report Features

- Test execution summary with pass/fail rates
- Automatic screenshots on test failures
- Video recordings of test sessions
- Cross-browser compatibility results
- Performance metrics and timing data
- Detailed error logs and stack traces
- Branch comparison analysis

## 🎯 Test Coverage & Results

### Bug Validation Matrix

| Feature | Main Branch | Fix-1 Branch | Fix-2 Branch | Test Coverage |
|---------|-------------|--------------|--------------|---------------|
| **Pagination** | ❌ Broken | ✅ Fixed | ✅ Working | 15 scenarios |
| **Detail Pages** | ❌ Broken | ❌ Still broken | ✅ Fixed | 12 scenarios |
| **Theme Toggle** | ❌ Broken | ❌ Still broken | ✅ Fixed | 8 scenarios |
| **Settings** | ❌ Broken | ❌ Still broken | ⚠️ Partial | 10 scenarios |

### Test Categories

- **Smoke Tests** (25 scenarios) - Critical functionality validation
- **Regression Tests** (45 scenarios) - Comprehensive feature testing
- **Integration Tests** (15 scenarios) - Cross-page workflows
- **Mobile Tests** (12 scenarios) - Responsive design validation
- **Performance Tests** (8 scenarios) - Load time verification

## 🔧 Configuration

### Environment Variables

```bash
# .env configuration
BASE_URL=http://localhost:5173
BROWSER=chromium
HEADLESS=false
TIMEOUT=30000
SCREENSHOT=on-failure
VIDEO=retain-on-failure
```

### Multi-Browser Support

```javascript
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } }
]
```

## 🎬 Demo Commands

Perfect for interviews and presentations:

```bash
# Complete demonstration workflow
npm run demo:full

# Step-by-step demo
npm run demo:bugs        # Show main branch failures
npm run demo:fixes       # Show progressive improvements
npm run demo:reports     # Generate visual comparison
```

## 🐛 Debugging & Troubleshooting

### Debug Mode

```bash
# Run tests with visible browser
npm run test:debug

# Take screenshots on every step
SCREENSHOT=always npm test

# Enable verbose logging
LOG_LEVEL=debug npm test
```

### Common Issues

```bash
# Clear all caches and reinstall
npm run clean && npm install

# Reinstall browsers
npx playwright install --force

# Check system requirements
npx playwright doctor
```

## 📈 CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        branch: [main, fix-1, fix-2]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:${{ matrix.branch }}
      - uses: actions/upload-artifact@v3
        with:
          name: test-reports-${{ matrix.branch }}
          path: reports/
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }
        stage('Test All Branches') {
            parallel {
                stage('Main Branch') {
                    steps { sh 'npm run test:main' }
                }
                stage('Fix-1 Branch') {
                    steps { sh 'npm run test:fix1' }
                }
                stage('Fix-2 Branch') {
                    steps { sh 'npm run test:fix2' }
                }
            }
        }
        stage('Generate Reports') {
            steps {
                sh 'npm run report:comparison'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: 'index.html',
                    reportName: 'E2E Test Report'
                ])
            }
        }
    }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tests`)
3. Follow the existing patterns and code standards
4. Ensure all tests pass (`npm run test:all`)
5. Submit a pull request with detailed description

### Code Standards

- Use TypeScript for all new code
- Follow Page Object Model patterns
- Write descriptive Gherkin scenarios
- Include appropriate test tags (@smoke, @regression, @critical)
- Add comprehensive error handling

## 📚 Documentation

### Writing New Tests

```gherkin
@smoke @homepage
Feature: Pokemon List Display
  As a user
  I want to see Pokemon cards
  So that I can browse available Pokemon

  @critical
  Scenario: Display Pokemon grid
    Given I am on the Pokemon home page
    Then I should see Pokemon cards displayed
    And each card should show Pokemon name and image
```

### Page Object Example

```typescript
export class HomePage extends BasePage {
  private readonly pokemonCards = this.page.locator('.pokemon-card');
  
  async verifyPokemonCardsDisplayed(): Promise<void> {
    await this.assertElementVisible(this.pokemonCards.first());
    const cardCount = await this.pokemonCards.count();
    expect(cardCount).toBeGreaterThan(0);
  }
}
```

## 🏆 Key Achievements

This framework successfully:

- **Identifies 4 major bugs** in the main application branch
- **Validates progressive fixes** across development iterations
- **Provides visual evidence** through screenshots and videos
- **Supports multiple browsers** and responsive testing
- **Generates comprehensive reports** for stakeholders
- **Enables CI/CD integration** for automated testing

## 🌟 Features

- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Mobile responsive validation**
- **Automatic screenshot capture** on failures
- **Video recording** of test execution
- **Performance monitoring** and metrics
- **Multi-environment support**
- **Rich HTML reporting** with visual elements
- **BDD methodology** with business-readable scenarios

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/Navdeepsingh777/qa-code-challenge/issues)
- **Email**: navdeep.singh@example.com
- **LinkedIn**: [Navdeep Singh](https://linkedin.com/in/navdeepsingh777)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for comprehensive QA validation**

*This framework demonstrates enterprise-grade test automation practices including BDD methodology, cross-browser testing, visual validation, and detailed reporting suitable for production applications.*

### ⭐ Star this repository if it helped you!

[![GitHub stars](https://img.shields.io/github/stars/Navdeepsingh777/qa-code-challenge.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/Navdeepsingh777/qa-code-challenge/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/Navdeepsingh777/qa-code-challenge.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/Navdeepsingh777/qa-code-challenge/network/)
[![GitHub watchers](https://img.shields.io/github/watchers/Navdeepsingh777/qa-code-challenge.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/Navdeepsingh777/qa-code-challenge/watchers/)