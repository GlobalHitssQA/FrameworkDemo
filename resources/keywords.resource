*** Settings ***
Documentation     Keywords de negocio (alto nivel) para el feature ATSCL-2710 - Canales recientes.
...               Estos keywords orquestan los Page Objects. No contienen locators.
Library           SeleniumLibrary
Library           Collections
Resource          ../pages/LoginPage.resource
Resource          ../pages/ControlPlayerTvPage.resource

*** Variables ***
${USUARIO_DEFAULT}     usuario_uat
${PASSWORD_DEFAULT}    Password.123

*** Keywords ***
Dado Que El Usuario Ha Ingresado A La App De Video
    [Documentation]    Abre la app de video e inicia sesión con un usuario válido.
    [Arguments]    ${usuario}=${USUARIO_DEFAULT}    ${password}=${PASSWORD_DEFAULT}
    Abrir Navegador En La App De Video
    Ingresar Credenciales De Usuario    ${usuario}    ${password}
    Verificar Ingreso Exitoso A La App

Cuando Consulto La Configuracion De Canales Recientes Para La Region
    [Documentation]    Obtiene el valor 'enable' resuelto por la app para la región del usuario
    ...                y lo deja como variable de suite para su validación posterior.
    ${enable}=    Obtener Configuracion De Canales Recientes Para Region
    Set Suite Variable    ${ENABLE_CANALES_RECIENTES}    ${enable}

Entonces La Configuracion Enable Debe Ser
    [Documentation]    Valida que el valor 'enable' resuelto coincida con el esperado.
    [Arguments]    ${valor_esperado}
    Should Be Equal As Strings    ${ENABLE_CANALES_RECIENTES}    ${valor_esperado}
    ...    msg=El valor de 'enable' para la región no coincide con el esperado

Entonces La Configuracion Debe Provenir Del Objeto Default
    [Documentation]    Valida que la configuración usada corresponde al objeto 'default'
    ...                (región sin configuración propia).
    ${origen}=    Obtener Origen De Configuracion De Canales Recientes
    Should Be Equal As Strings    ${origen}    default
    ...    msg=La configuración no proviene del objeto default para una región sin configuración propia

Cuando Despliego El Control Player De TV
    [Documentation]    Abre el Control Player sobre el reproductor de TV.
    Abrir El Control Player De TV

Entonces El Pill Canales Recientes Se Muestra Junto A Guia Rapida
    [Documentation]    Verifica que el Pill de Canales recientes es visible y está en segunda
    ...                posición junto al Pill de Guía rápida.
    Verificar Que El Pill Guia Rapida Esta Visible
    Verificar Que El Pill Canales Recientes Esta Visible
    Verificar Que El Pill Canales Recientes Esta En Segunda Posicion

Entonces El Pill Canales Recientes No Se Muestra
    [Documentation]    Verifica que el Pill de Canales recientes no aparece en el Control Player.
    Verificar Que El Pill Canales Recientes No Esta Visible

Entonces La Distribucion Del Control Player Se Conserva
    [Documentation]    Verifica que, al no mostrarse Canales recientes, se conserva la
    ...                distribución del Control Player (Guía rápida sigue visible).
    Verificar Que El Pill Guia Rapida Esta Visible

Cerrar La App De Video
    [Documentation]    Cierra todos los navegadores abiertos.
    Close All Browsers
