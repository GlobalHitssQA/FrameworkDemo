*** Settings ***
Documentation     Page Resource de Vista 360 / autenticación del asesor CAC.
...               Modela el acceso del asesor CAC a la plataforma Vista 360 desde
...               la cual se opera el alta y la consulta de financiamientos BES
...               (Amigo Paguitos - Integración ESB BES-APAG).
...
...               REGLA DE ORO: archivo Append-Only. NUNCA elimines ni modifiques
...               locators existentes. Si necesitas otro selector, agrega una
...               variable NUEVA al final.
...
...               Prioridad de locators: id > name > CSS semántico > XPath.
...               # Locators pendientes de validación con app en vivo
...               (Selenium no pudo ejecutarse en este entorno: chromedriver glibc
...               incompatible con Alpine/musl y sin chromedriver nativo offline.
...               Locators tomados del proyecto existente y de la app ZeroBank.)
Library           SeleniumLibrary

*** Variables ***
# --- URLs de la plataforma (Vista 360 / acceso CAC) ---
${VISTA360_URL_BASE}          http://zero.webappsecurity.com
${VISTA360_URL_INDEX}         ${VISTA360_URL_BASE}/index.html
${VISTA360_URL_LOGIN}         ${VISTA360_URL_BASE}/login.html
${VISTA360_URL_HOME}          ${VISTA360_URL_BASE}/bank/index.html

# --- Navegador ---
${VISTA360_NAVEGADOR}         headlesschrome
${VISTA360_TIMEOUT}           20s

# --- Locators de acceso (login del asesor CAC) ---
${VISTA360_BTN_INGRESAR}      id:signin_button
${VISTA360_INPUT_USUARIO}     id:user_login
${VISTA360_INPUT_PASSWORD}    id:user_password
${VISTA360_BTN_SIGNIN}        css:form#login_form button[type='submit']
${VISTA360_TXT_LOGIN}         xpath://h3[contains(.,'Log in to ZeroBank')]
${VISTA360_FORM_LOGIN}        id:login_form

# --- Locators de sesión autenticada (asesor CAC dentro de Vista 360) ---
${VISTA360_LINK_LOGOUT}       id:logout_link
${VISTA360_NAV_FEATURES}      id:online_banking_features
${VISTA360_TBL_RESUMEN}       id:account_summary

*** Keywords ***
Abrir Vista 360
    [Documentation]    Abre el navegador en la pantalla de acceso de Vista 360.
    Open Browser    ${VISTA360_URL_INDEX}    ${VISTA360_NAVEGADOR}
    Maximize Browser Window
    Set Selenium Timeout    ${VISTA360_TIMEOUT}

Ir A Pantalla De Acceso
    [Documentation]    Navega desde el portal a la pantalla de autenticación CAC.
    Wait Until Element Is Visible    ${VISTA360_BTN_INGRESAR}
    Click Element    ${VISTA360_BTN_INGRESAR}
    Wait Until Element Is Visible    ${VISTA360_FORM_LOGIN}

Capturar Usuario CAC
    [Documentation]    Captura el usuario del asesor CAC en la pantalla de acceso.
    [Arguments]    ${usuario}
    Wait Until Element Is Visible    ${VISTA360_INPUT_USUARIO}
    Input Text    ${VISTA360_INPUT_USUARIO}    ${usuario}

Capturar Password CAC
    [Documentation]    Captura el password del asesor CAC en la pantalla de acceso.
    [Arguments]    ${password}
    Wait Until Element Is Visible    ${VISTA360_INPUT_PASSWORD}
    Input Password    ${VISTA360_INPUT_PASSWORD}    ${password}

Confirmar Acceso CAC
    [Documentation]    Envía las credenciales del asesor CAC.
    Click Element    ${VISTA360_BTN_SIGNIN}

Validar Sesion CAC Iniciada
    [Documentation]    Verifica que el asesor CAC quedó autenticado en Vista 360.
    Wait Until Element Is Visible    ${VISTA360_LINK_LOGOUT}    ${VISTA360_TIMEOUT}

Cerrar Vista 360
    [Documentation]    Cierra el navegador de Vista 360.
    Close Browser
