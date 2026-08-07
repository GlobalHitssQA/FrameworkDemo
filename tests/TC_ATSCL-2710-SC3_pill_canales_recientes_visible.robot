*** Settings ***
Documentation     ATSCL-2710-SC3 - Activación de funcionalidad Canales recientes cuando enable es true.
...               Verifica que el Pill de Canales recientes se muestra en segunda posición, junto al
...               Pill de Guía rápida, cuando enable es true para la región y existen canales en sesión.
...               Fase: UAT
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar La App De Video

*** Test Cases ***
Activacion De Canales Recientes Cuando Enable Es True
    [Documentation]    Con enable true para la región y al menos un canal reciente en sesión,
    ...                el Pill de Canales recientes debe mostrarse junto al de Guía rápida.
    [Tags]    PruebaGeneradaIA
    # Precondición: show_filter_recent_channels enable=true para la región del usuario
    # y API user/v3/livechannel con al menos un canal reciente.
    Dado Que El Usuario Ha Ingresado A La App De Video
    Cuando Consulto La Configuracion De Canales Recientes Para La Region
    Entonces La Configuracion Enable Debe Ser    true
    Cuando Despliego El Control Player De TV
    Entonces El Pill Canales Recientes Se Muestra Junto A Guia Rapida
