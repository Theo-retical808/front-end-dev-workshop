@echo off
title Frontend Workshop - Environment Setup
color 0A

echo ============================================================
echo   Frontend Workshop - Environment Setup
echo   "Crafting Interactive Interfaces: Frontend Development Basics"
echo ============================================================
echo.

:: -------------------------------------------------------
:: CHECK NODE.JS
:: -------------------------------------------------------
echo [1/5] Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo   [!] Node.js is NOT installed.
    echo   [!] Download it from: https://nodejs.org/
    echo   [!] Install the LTS version, then re-run this script.
    echo.
    set NODE_INSTALLED=0
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo   [OK] Node.js found: %NODE_VERSION%
    set NODE_INSTALLED=1
)

:: -------------------------------------------------------
:: CHECK NPM
:: -------------------------------------------------------
echo.
echo [2/5] Checking npm installation...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo   [!] npm is NOT installed.
    echo   [!] It usually comes with Node.js. Reinstall Node.js from https://nodejs.org/
    echo.
    set NPM_INSTALLED=0
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo   [OK] npm found: %NPM_VERSION%
    set NPM_INSTALLED=1
)

:: -------------------------------------------------------
:: CHECK VS CODE
:: -------------------------------------------------------
echo.
echo [3/5] Checking VS Code installation...
where code >nul 2>nul
if %errorlevel% neq 0 (
    echo   [!] VS Code is NOT detected in PATH.
    echo   [!] Download it from: https://code.visualstudio.com/
    echo   [!] Make sure to check "Add to PATH" during installation.
    echo.
    set VSCODE_INSTALLED=0
) else (
    echo   [OK] VS Code found in PATH.
    set VSCODE_INSTALLED=1
)

:: -------------------------------------------------------
:: INSTALL VS CODE EXTENSIONS
:: -------------------------------------------------------
echo.
echo [4/5] Installing recommended VS Code extensions...
if %VSCODE_INSTALLED%==1 (
    echo   Installing Live Server...
    code --install-extension ritwickdey.LiveServer >nul 2>nul
    echo   Installing Prettier...
    code --install-extension esbenp.prettier-vscode >nul 2>nul
    echo   Installing HTML CSS Support...
    code --install-extension ecmel.vscode-html-css >nul 2>nul
    echo   [OK] Extensions installed successfully!
) else (
    echo   [SKIP] VS Code not found, skipping extension install.
)

:: -------------------------------------------------------
:: INSTALL REACT DEMO DEPENDENCIES
:: -------------------------------------------------------
echo.
echo [5/5] Setting up React demo (optional)...
if %NPM_INSTALLED%==1 (
    echo   Installing dependencies in react-demo folder...
    pushd "%~dp0react-demo"
    call npm install
    popd
    if %errorlevel% equ 0 (
        echo   [OK] React demo dependencies installed!
    ) else (
        echo   [!] Failed to install React demo dependencies.
        echo   [!] You can try manually: cd react-demo ^& npm install
    )
) else (
    echo   [SKIP] Node.js/npm not found, skipping React setup.
    echo   [SKIP] Install Node.js from https://nodejs.org/ if you want to use the React demo.
)

:: -------------------------------------------------------
:: SUMMARY
:: -------------------------------------------------------
echo.
echo ============================================================
echo   SETUP COMPLETE! Here's your summary:
echo ============================================================
echo.
if %NODE_INSTALLED%==1 (
    echo   [OK] Node.js ........... Installed
) else (
    echo   [!!] Node.js ........... NOT FOUND - Install from https://nodejs.org/
)
if %NPM_INSTALLED%==1 (
    echo   [OK] npm ............... Installed
) else (
    echo   [!!] npm ............... NOT FOUND
)
if %VSCODE_INSTALLED%==1 (
    echo   [OK] VS Code ........... Installed
    echo   [OK] Live Server ....... Extension installed
    echo   [OK] Prettier .......... Extension installed
    echo   [OK] HTML CSS Support .. Extension installed
) else (
    echo   [!!] VS Code ........... NOT FOUND - Install from https://code.visualstudio.com/
)
echo.
echo ============================================================
echo   HOW TO START:
echo ============================================================
echo.
echo   1. Open this folder in VS Code:
echo        code "%~dp0"
echo.
echo   2. Right-click any index.html file and select "Open with Live Server"
echo.
echo   3. For the React demo:
echo        cd react-demo
echo        npm run dev
echo.
echo   4. Start with 01-html-basics and work your way up!
echo.
echo ============================================================
echo   Happy coding! Press any key to exit...
echo ============================================================
pause >nul
