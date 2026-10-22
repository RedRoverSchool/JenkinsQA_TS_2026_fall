<h1 align="center">Project: Jenkins TS 2026 Fall</h1>

<p align="center">
  <img src="media/jenkins.svg" alt="Jenkins logo" width="100"/>
</p>

## ️ Documentation

**Предварительные условия (Prerequisites)**

- Chrome browser
- Node.js version 20 (https://nodejs.org/en/download)
- NPM (устанавливается вместе с Node)
- VSCode
- Java версия 25
- Jenkins version 2.580.1-lts

**Как запустить проект (How to run the project)**

1. Clone repository to your local folder "c:\Ts_2026_Fal\Ts_Practice"
2. Open VSCode and navigate to project folder "c:\Ts_2026_Fall\Ts_Practice\JenkinsQA_TS_2026_Fall"
3. Create `.env` file and modify it
4. In VSCode terminal, run command `npm ci` then `npx playwright install`
5. Run command `npx playwright test --ui` in VSCode terminal to run tests

Note: Global cleanup is executed before each test

**Соглашение о кодировании проекта (Project Coding Convention)**

Naming files:

- Use camelCase for naming files: `myFirstTest`
- Name should be relevant to the user story name

**Структура спецификации (Spec structure)**

- Each block `describe` should be named as a user story
- Each test (`test`) should be named as a test case

example:

```
describe('US_01.001 | New Item > Create a new item', () => {

    test('TC_01.001.01 | Verify page load', function () {
        ...
    })

})
```

<a name="rules"></a>

## ОБЯЗАТЕЛЬНЫЕ ПРАВИЛА (MUST-FOLLOW RULES)

- Students are not allowed to install any libraries, plugins, etc.
- Students are not allowed to modify any configuration files.

**!!Не изменять и не пушать файлы как (Do not push changed files as):**

- `README.md`
- `package.json`
- `package-lock.json`
- `playwright.config.ts`
- `.gitignore`
- `base.ts`
- `global-setup.ts`
- `ci.yml`
- `cancel.yml`
- `wait-for-jenkins.sh`
- `cleanData.ts`
- any other non-test-related files
