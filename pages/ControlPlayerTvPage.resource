*** Settings ***
Documentation     Page Object del Control Player de TV de la app de video Telcel/Claro.
...               Modela los Pills del Control Player (Guía rápida, Canales recientes) y la
...               obtención de la configuración de región (llave show_filter_recent_channels).
...               Feature ATSCL-2710 - Canales recientes.
Library           SeleniumLibrary
Library           Collections

*** Variables ***
# ------------------------------------------------------------------
# Locators pendientes de validación con app en vivo
# (no se dispuso de URL/credenciales de la app de video para ATSCL-2710)
# Prioridad de locators: id > name > CSS semántico > XPath
# ------------------------------------------------------------------

# --- Reproductor / Control Player de TV ---
${LOCATOR_REPRODUCTOR_TV}              css:[data-testid="tv-player"]
${LOCATOR_CONTROL_PLAYER_TV}          css:[data-testid="tv-player-controls"]
${LOCATOR_ZONA_PILLS}                  css:[data-testid="player-pills"]

# --- Pills del Control Player ---
${LOCATOR_PILL_GUIA_RAPIDA}           css:[data-testid="pill-guia-rapida"]
${LOCATOR_PILL_CANALES_RECIENTES}     css:[data-testid="pill-canales-recientes"]
# Segunda posición de la barra de pills (junto a Guía rápida)
${LOCATOR_PILL_EN_SEGUNDA_POSICION}   css:[data-testid="player-pills"] > *:nth-child(2)

# --- Configuración de región (llave show_filter_recent_channels) ---
# Elemento oculto/dato de estado que expone la configuración resuelta por la app.
${LOCATOR_CONFIG_RECENT_CHANNELS}     css:[data-config-key="show_filter_recent_channels"]
${ATTR_CONFIG_ENABLE}                  data-enable
${ATTR_CONFIG_ORIGEN}                  data-config-source

*** Keywords ***
Abrir El Control Player De TV
    [Documentation]    Despliega el Control Player sobre el reproductor de TV.
    Wait Until Element Is Visible    ${LOCATOR_REPRODUCTOR_TV}       timeout=20s
    Click Element                    ${LOCATOR_REPRODUCTOR_TV}
    Wait Until Element Is Visible    ${LOCATOR_CONTROL_PLAYER_TV}    timeout=15s

Obtener Configuracion De Canales Recientes Para Region
    [Documentation]    Devuelve el valor de 'enable' resuelto por la app para la región del
    ...                usuario, a partir de la llave show_filter_recent_channels.
    Wait Until Page Contains Element    ${LOCATOR_CONFIG_RECENT_CHANNELS}    timeout=15s
    ${enable}=    Get Element Attribute    ${LOCATOR_CONFIG_RECENT_CHANNELS}    ${ATTR_CONFIG_ENABLE}
    RETURN    ${enable}

Obtener Origen De Configuracion De Canales Recientes
    [Documentation]    Devuelve el origen de la configuración resuelta (default o específica de región).
    Wait Until Page Contains Element    ${LOCATOR_CONFIG_RECENT_CHANNELS}    timeout=15s
    ${origen}=    Get Element Attribute    ${LOCATOR_CONFIG_RECENT_CHANNELS}    ${ATTR_CONFIG_ORIGEN}
    RETURN    ${origen}

Verificar Que El Pill Canales Recientes Esta Visible
    [Documentation]    Verifica que el Pill de Canales recientes se muestra en el Control Player.
    Wait Until Element Is Visible    ${LOCATOR_PILL_CANALES_RECIENTES}    timeout=15s

Verificar Que El Pill Canales Recientes No Esta Visible
    [Documentation]    Verifica que el Pill de Canales recientes NO se muestra en el Control Player.
    Wait Until Element Is Not Visible    ${LOCATOR_PILL_CANALES_RECIENTES}    timeout=15s

Verificar Que El Pill Guia Rapida Esta Visible
    [Documentation]    Verifica que el Pill de Guía rápida permanece visible en el Control Player.
    Wait Until Element Is Visible    ${LOCATOR_PILL_GUIA_RAPIDA}    timeout=15s

Verificar Que El Pill Canales Recientes Esta En Segunda Posicion
    [Documentation]    Verifica que el Pill de Canales recientes ocupa la segunda posición,
    ...                junto al Pill de Guía rápida.
    Wait Until Element Is Visible    ${LOCATOR_PILL_EN_SEGUNDA_POSICION}    timeout=15s
    ${id_esperado}=    Get Element Attribute    ${LOCATOR_PILL_CANALES_RECIENTES}       data-testid
    ${id_segundo}=     Get Element Attribute    ${LOCATOR_PILL_EN_SEGUNDA_POSICION}    data-testid
    Should Be Equal    ${id_segundo}    ${id_esperado}
    ...    msg=El Pill de Canales recientes no está en la segunda posición del Control Player

Contar Pills Del Control Player
    [Documentation]    Devuelve la cantidad de Pills presentes en el Control Player.
    ${cantidad}=    Get Element Count    css:[data-testid="player-pills"] > *
    RETURN    ${cantidad}
