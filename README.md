# 🎭 Automation Exercise - Playwright Test Framework

A UI automation framework built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern. This project automates end-to-end test scenarios for the Automation Exercise demo application.

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Page Object Model (POM)
- Prettier

---

## 📂 Project Structure

```
automationexercise/
│
├── pages/                 # Page Object Models
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│
├── tests/
│   ├── authentication/
│   ├── signup/
│
├── fixtures/              # Test data
├── utils/                 # Helper methods
├── playwright.config.ts
├── package.json
└── README.md
```

---

## ✅ Test Coverage

### Authentication

- Login with valid credentials
- Login with invalid credentials
- Logout successfully

### Signup

- Register a new user
- Register with an existing email
- Delete account

---

## 🏗 Framework Features

- Page Object Model (POM)
- Cross-browser testing
- HTML reporting
- Parallel execution
- Automatic screenshots on failure
- Video recording on failure
- Trace collection on retry
- GitHub Actions CI/CD
- Prettier code formatting

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/abidek005/autoexercise.git
```

Navigate to the project

```bash
cd autoexercise
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

Run all tests

```bash
npx playwright test
```

Run Chromium only

```bash
npx playwright test --project=Chromium
```

Run Firefox only

```bash
npx playwright test --project=Firefox
```

Run WebKit only

```bash
npx playwright test --project=WebKit
```

Run headed

```bash
npx playwright test --headed
```

Run UI Mode

```bash
npx playwright test --ui
```

Debug tests

```bash
npx playwright test --debug
```

---

## 📊 View Test Report

```bash
npx playwright show-report
```

---

## 🎨 Format Code

Automatically format the project

```bash
npm run format
```

Check formatting

```bash
npm run format:check
```

---

## 🔄 Continuous Integration

GitHub Actions automatically executes the test suite when:

- Code is pushed to **staging**
- Code is pushed to **main**
- A Pull Request is opened against **staging**
- A Pull Request is opened against **main**

The workflow:

1. Checks out the repository
2. Installs Node.js
3. Installs project dependencies
4. Installs Playwright browsers
5. Executes the test suite
6. Uploads the HTML report as an artifact

---

## 📸 Reporting

Playwright generates:

- HTML Reports
- Screenshots on failure
- Videos on failure
- Trace files for failed retries

---

## 👨‍💻 Author

**Abidemi Ogunjobi**

QA Automation Engineer

GitHub:
https://github.com/abidek005