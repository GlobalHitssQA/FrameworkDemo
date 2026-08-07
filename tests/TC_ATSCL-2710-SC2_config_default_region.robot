*** Settings ***
Documentation     ATSCL-2710-SC2 - Obtención de configuración default para región sin configuración propia.
...               Verifica que la app usa la configuración default cuando la región del usuario
...               (Colombia o Perú) no tiene configuración propia para show_filter_recent_channels.
...               Fase: UAT
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar La App De Video

*** Test Cases ***
Obtencion De Configuracion Default Para Region Sin Configuracion Propia
    [Documentation]    Región sin configuración específica debe resolver a la configuración
    ...                default, obteniendo enable:false.
    [Tags]    PruebaGeneradaIA
    # Precondición: usuario de una región sin configuración propia (Colombia o Perú)
    Dado Que El Usuario Ha Ingresado A La App De Video
    Cuando Consulto La Configuracion De Canales Recientes Para La Region
    Entonces La Configuracion Debe Provenir Del Objeto Default
    Entonces La Configuracion Enable Debe Ser    false
