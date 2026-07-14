# Automation Exercise - Playwright TypeScript Framework

A scalable end-to-end automation testing framework built using **Playwright** and **TypeScript** following industry best practices such as **Page Object Model (POM)**, **Fixtures**, reusable test data, and **GitHub Actions CI/CD**.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Page Object Model (POM)
- Playwright Fixtures

---

## Project Structure

```text
automationexercise/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── fixtures.ts
│
├── pages/
│   ├── CartPage.ts
│   ├── LoginPage.ts
│   ├── SearchPage.ts
│   └── SignupPage.ts
│
├── tests/
│   ├── Authentication/
│   │   ├── login.spec.ts
│   │   └── invalidlogin.spec.ts
│   │
│   ├── product/
│   │   ├── addcart.spec.ts
│   │   └── searchproduct.spec.ts
│   │
│   └── Signup/
│       ├── signup.spec.ts
│       └── signupexistemail.spec.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Features

- Page Object Model (POM)
- Playwright Fixtures
- Cross-browser testing
- GitHub Actions CI
- Reusable page objects
- Reusable test methods
- Stable locators (`data-qa`, IDs, CSS)
- HTML Test Reports
- Automatic screenshots on failure
- Automatic trace collection

---

## Test Coverage

### Authentication

- ✅ Successful Login
- ✅ Invalid Login
- ✅ Empty Email
- ✅ Empty Password
- ✅ Invalid Email Format
- ✅ SQL Injection Validation
- ✅ XSS Validation

---

### Signup

- ✅ Register New User
- ✅ Existing Email Validation

---

### Product

- ✅ Search Product
- ✅ View Product
- ✅ Add Multiple Products to Cart

---

## Running Tests

Run all tests

```bash
npx playwright test
```

Run Chromium only

```bash
npx playwright test --project=chromium
```

Run Firefox

```bash
npx playwright test --project=firefox
```

Run WebKit

```bash
npx playwright test --project=webkit
```

Run a single test

```bash
npx playwright test tests/Authentication/login.spec.ts
```

Run in headed mode

```bash
npx playwright test --headed
```

Debug a test

```bash
npx playwright test --debug
```

---

## Test Reports

Generate HTML report

```bash
npx playwright show-report
```

---

## Continuous Integration

This project includes a GitHub Actions workflow that:

- Installs dependencies
- Installs Playwright browsers
- Executes tests
- Publishes Playwright HTML reports

---

## Design Pattern

This framework follows the **Page Object Model (POM)** design pattern.

Each page contains:

- Page locators
- Business actions
- Assertions

Fixtures are used to inject page objects into tests, reducing duplication and improving maintainability.

---

## Future Enhancements

- API Testing
- Allure Reports
- Data-driven testing
- Environment configuration
- Visual Testing
- Accessibility Testing
- Docker support
- Performance Testing
- Parallel execution improvements

---

## Author

**Abidemi Ogunjobi**

Senior QA Automation Engineer

Playwright | TypeScript | API Testing | CI/CD | GitHub Actions