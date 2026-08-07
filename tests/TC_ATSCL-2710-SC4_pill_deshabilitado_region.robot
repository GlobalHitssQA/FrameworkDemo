*** Settings ***
Documentation     ATSCL-2710-SC4 - Funcionalidad deshabilitada por región (enable false).
...               Verifica que el Pill de Canales recientes no se muestra cuando enable es false
...               para la región del usuario, conservando la distribución del Control Player.
...               Fase: UAT
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar La App De Video

*** Test Cases ***
Funcionalidad Canales Recientes Deshabilitada Por Region Enable False
    [Documentation]    Con enable false para la región, el Pill de Canales recientes no debe
    ...                aparecer y la distribución del Control Player debe conservarse.
    [Tags]    PruebaGeneradaIA
    # Precondición: show_filter_recent_channels enable=false para la región del usuario.
    Dado Que El Usuario Ha Ingresado A La App De Video
    Cuando Consulto La Configuracion De Canales Recientes Para La Region
    Entonces La Configuracion Enable Debe Ser    false
    Cuando Despliego El Control Player De TV
    Entonces El Pill Canales Recientes No Se Muestra
    Entonces La Distribucion Del Control Player Se Conserva
