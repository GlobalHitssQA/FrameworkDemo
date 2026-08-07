*** Settings ***
Documentation    Page Object de la Sección Fotos (Galería) de la App iOS Claro Drive.
...              Cubre acciones sobre imágenes (preview, compartir, mover, eliminar),
...              orden cronológico y consistencia de datos tras optimización CDIS-10000.
...              Locators pendientes de validación con app en vivo (app nativa iOS no accesible vía Selenium web).
Library          SeleniumLibrary

*** Variables ***
# ---- Navegación y contenedores ----
# Locators pendientes de validación con app en vivo
${GALERIA_MENU_FOTOS}                   id:tab_fotos
${GALERIA_CONTENEDOR_CUADRICULA}        id:galeria_grid
${GALERIA_IMAGEN_ITEM}                  css:.galeria-grid [data-role='foto-item']
${GALERIA_PRIMERA_IMAGEN}               css:.galeria-grid [data-role='foto-item']:first-child
${GALERIA_INDICADOR_CARGA}              id:galeria_loader
${GALERIA_BOTON_CERRAR_SECCION}         id:btn_cerrar_fotos

# ---- Preview ----
${GALERIA_VISTA_PREVIA}                 id:foto_preview_full
${GALERIA_PREVIEW_RESOLUCION_FULL}      css:#foto_preview_full img[data-resolution='full']
${GALERIA_BOTON_CERRAR_PREVIEW}         id:btn_cerrar_preview

# ---- Menú de acciones sobre imagen ----
${GALERIA_BOTON_ACCIONES}               id:btn_acciones_imagen
${GALERIA_ACCION_PREVIEW}               id:accion_preview
${GALERIA_ACCION_COMPARTIR}             id:accion_compartir
${GALERIA_ACCION_MOVER}                 id:accion_mover
${GALERIA_ACCION_ELIMINAR}              id:accion_eliminar

# ---- Compartir ----
${GALERIA_HOJA_COMPARTIR}               id:share_sheet
${GALERIA_DESTINO_COMPARTIR}            css:#share_sheet [data-role='destino']:first-child
${GALERIA_CONFIRMACION_COMPARTIR}       id:share_confirmacion

# ---- Mover ----
${GALERIA_SELECTOR_CARPETA_DESTINO}     id:mover_carpeta_destino
${GALERIA_BOTON_CONFIRMAR_MOVER}        id:btn_confirmar_mover
${GALERIA_CONFIRMACION_MOVER}           id:mover_confirmacion

# ---- Eliminar ----
${GALERIA_BOTON_CONFIRMAR_ELIMINAR}     id:btn_confirmar_eliminar
${GALERIA_CONFIRMACION_ELIMINAR}        id:eliminar_confirmacion

# ---- Orden cronológico ----
${GALERIA_ENCABEZADO_LOTE}              css:.galeria-grid [data-role='lote-fecha']
${GALERIA_FECHA_IMAGEN}                 css:[data-role='foto-item'] [data-role='fecha-captura']

*** Keywords ***
Abrir Seccion Fotos
    [Documentation]    Abre la Sección Fotos (Galería) y espera la cuadrícula de imágenes.
    Wait Until Element Is Visible    ${GALERIA_MENU_FOTOS}    timeout=15s
    Click Element                    ${GALERIA_MENU_FOTOS}
    Wait Until Element Is Visible    ${GALERIA_CONTENEDOR_CUADRICULA}    timeout=30s

Cerrar Seccion Fotos
    [Documentation]    Cierra la Sección Fotos (Galería).
    Wait Until Element Is Visible    ${GALERIA_BOTON_CERRAR_SECCION}    timeout=15s
    Click Element                    ${GALERIA_BOTON_CERRAR_SECCION}

Seleccionar Primera Imagen
    [Documentation]    Selecciona la primera imagen de la cuadrícula.
    Wait Until Element Is Visible    ${GALERIA_PRIMERA_IMAGEN}    timeout=15s
    Click Element                    ${GALERIA_PRIMERA_IMAGEN}

Abrir Menu De Acciones De Imagen
    [Documentation]    Despliega el menú de acciones sobre la imagen seleccionada.
    Wait Until Element Is Visible    ${GALERIA_BOTON_ACCIONES}    timeout=15s
    Click Element                    ${GALERIA_BOTON_ACCIONES}

Ejecutar Accion Preview
    [Documentation]    Ejecuta la acción de preview y valida la vista previa a resolución completa.
    Click Element                    ${GALERIA_ACCION_PREVIEW}
    Wait Until Element Is Visible    ${GALERIA_VISTA_PREVIA}                timeout=20s
    Wait Until Element Is Visible    ${GALERIA_PREVIEW_RESOLUCION_FULL}    timeout=20s

Cerrar Preview
    [Documentation]    Cierra la vista previa de la imagen.
    Wait Until Element Is Visible    ${GALERIA_BOTON_CERRAR_PREVIEW}    timeout=15s
    Click Element                    ${GALERIA_BOTON_CERRAR_PREVIEW}

Ejecutar Accion Compartir
    [Documentation]    Ejecuta la acción de compartir, selecciona un destino y valida la hoja de compartir.
    Click Element                    ${GALERIA_ACCION_COMPARTIR}
    Wait Until Element Is Visible    ${GALERIA_HOJA_COMPARTIR}        timeout=20s
    Wait Until Element Is Visible    ${GALERIA_DESTINO_COMPARTIR}     timeout=15s
    Click Element                    ${GALERIA_DESTINO_COMPARTIR}
    Wait Until Element Is Visible    ${GALERIA_CONFIRMACION_COMPARTIR}    timeout=20s

Ejecutar Accion Mover
    [Documentation]    Ejecuta la acción de mover hacia una carpeta destino y confirma.
    [Arguments]    ${carpeta_destino}
    Click Element                    ${GALERIA_ACCION_MOVER}
    Wait Until Element Is Visible    ${GALERIA_SELECTOR_CARPETA_DESTINO}    timeout=20s
    Click Element                    ${GALERIA_SELECTOR_CARPETA_DESTINO}
    Wait Until Element Is Visible    ${GALERIA_BOTON_CONFIRMAR_MOVER}    timeout=15s
    Click Element                    ${GALERIA_BOTON_CONFIRMAR_MOVER}
    Wait Until Element Is Visible    ${GALERIA_CONFIRMACION_MOVER}    timeout=20s

Ejecutar Accion Eliminar
    [Documentation]    Ejecuta la acción de eliminar y confirma la eliminación.
    Click Element                    ${GALERIA_ACCION_ELIMINAR}
    Wait Until Element Is Visible    ${GALERIA_BOTON_CONFIRMAR_ELIMINAR}    timeout=20s
    Click Element                    ${GALERIA_BOTON_CONFIRMAR_ELIMINAR}
    Wait Until Element Is Visible    ${GALERIA_CONFIRMACION_ELIMINAR}    timeout=20s

Validar Galeria Sin Regresiones
    [Documentation]    Verifica que la Galería sigue visible y respondiendo tras las acciones.
    Wait Until Element Is Visible    ${GALERIA_CONTENEDOR_CUADRICULA}    timeout=20s
    Page Should Contain Element      ${GALERIA_IMAGEN_ITEM}

Contar Imagenes En Galeria
    [Documentation]    Retorna la cantidad de imágenes visibles en la cuadrícula.
    ${cantidad}=    Get Element Count    ${GALERIA_IMAGEN_ITEM}
    RETURN    ${cantidad}

Hacer Scroll Hasta El Final De La Galeria
    [Documentation]    Realiza scroll hasta el último elemento de la cuadrícula.
    Execute Javascript    document.querySelector("#galeria_grid").scrollTo(0, document.querySelector("#galeria_grid").scrollHeight)
    Sleep    2s

Obtener Fechas De Imagenes
    [Documentation]    Retorna la lista de fechas de captura/carga de las imágenes visibles.
    ${fechas}=    Get WebElements    ${GALERIA_FECHA_IMAGEN}
    ${lista}=     Create List
    FOR    ${elemento}    IN    @{fechas}
        ${valor}=    Get Text    ${elemento}
        Append To List    ${lista}    ${valor}
    END
    RETURN    ${lista}

Validar Orden Cronologico Descendente
    [Documentation]    Verifica que la lista de fechas esté ordenada de la más reciente a la más antigua.
    [Arguments]    ${lista_fechas}
    ${ordenada}=    Evaluate    sorted(${lista_fechas}, reverse=True)
    Should Be Equal    ${lista_fechas}    ${ordenada}    Las imágenes no mantienen orden cronológico descendente

Validar Ausencia De Duplicados
    [Documentation]    Verifica que no existan imágenes duplicadas en la secuencia.
    [Arguments]    ${lista_identificadores}
    ${sin_duplicados}=    Remove Duplicates    ${lista_identificadores}
    Lists Should Be Equal    ${lista_identificadores}    ${sin_duplicados}    Se encontraron imágenes duplicadas en la Galería

# =======================================================================
# APPEND-ONLY — Variables nuevas (no modificar las anteriores)
# Locators pendientes de validación con app en vivo (app nativa iOS)
# =======================================================================

*** Variables ***
# ---- Paginación y fin de listado (TC009) ----
${GALERIA_ULTIMO_ELEMENTO}              css:.galeria-grid [data-role='foto-item']:last-child
${GALERIA_INDICADOR_FIN_LISTADO}        id:galeria_fin_listado
${GALERIA_MENSAJE_SIN_MAS_IMAGENES}     css:#galeria_fin_listado [data-role='mensaje-fin']
${GALERIA_PANTALLA_EN_BLANCO}           css:.galeria-grid[data-estado='vacio']

# ---- Caché y recuperación de imágenes (TC010) ----
${GALERIA_MINIATURA_IMAGEN}             css:[data-role='foto-item'] img[data-role='miniatura']
${GALERIA_MINIATURA_DESDE_CACHE}        css:[data-role='foto-item'] img[data-origen='cache']

*** Keywords ***
# =======================================================================
# APPEND-ONLY — Keywords nuevos (no modificar los anteriores)
# =======================================================================

# ---- TC009: Paginación incremental y fin de listado ----
Hacer Scroll Incremental Cargando Lotes
    [Documentation]    Realiza scroll incremental forzando la carga de lotes sucesivos de imágenes.
    [Arguments]    ${iteraciones}=5
    FOR    ${indice}    IN RANGE    ${iteraciones}
        Execute Javascript    document.querySelector("#galeria_grid").scrollBy(0, 1200)
        Sleep    1s
        Wait Until Element Is Not Visible    ${GALERIA_INDICADOR_CARGA}    timeout=20s
    END

Hacer Scroll Hasta El Ultimo Elemento Del Listado
    [Documentation]    Repite scroll hasta que aparece el indicador de fin de listado o el último elemento.
    FOR    ${intento}    IN RANGE    30
        ${fin}=    Run Keyword And Return Status    Element Should Be Visible    ${GALERIA_INDICADOR_FIN_LISTADO}
        Exit For Loop If    ${fin}
        Execute Javascript    document.querySelector("#galeria_grid").scrollTo(0, document.querySelector("#galeria_grid").scrollHeight)
        Sleep    1s
        Wait Until Element Is Not Visible    ${GALERIA_INDICADOR_CARGA}    timeout=20s
    END
    Wait Until Element Is Visible    ${GALERIA_ULTIMO_ELEMENTO}    timeout=15s

Validar Ultimo Elemento Y Fin De Listado
    [Documentation]    Verifica que el último elemento es visible y que la Galería detuvo la solicitud de lotes.
    Wait Until Element Is Visible    ${GALERIA_ULTIMO_ELEMENTO}          timeout=15s
    Wait Until Element Is Visible    ${GALERIA_INDICADOR_FIN_LISTADO}    timeout=15s
    Wait Until Element Is Not Visible    ${GALERIA_INDICADOR_CARGA}      timeout=10s

Intentar Scroll Adicional Mas Alla Del Final
    [Documentation]    Fuerza scroll adicional más allá del último elemento del listado.
    Execute Javascript    document.querySelector("#galeria_grid").scrollBy(0, 3000)
    Sleep    2s

Validar Fin De Listado Estable Sin Cargas Infinitas
    [Documentation]    Verifica que no hay cargas infinitas, ni pantalla en blanco, y el conteo se mantiene estable.
    [Arguments]    ${conteo_referencia}
    Page Should Not Contain Element      ${GALERIA_PANTALLA_EN_BLANCO}
    Wait Until Element Is Not Visible    ${GALERIA_INDICADOR_CARGA}          timeout=10s
    Element Should Be Visible            ${GALERIA_INDICADOR_FIN_LISTADO}
    ${conteo_actual}=    Contar Imagenes En Galeria
    Should Be Equal As Integers    ${conteo_actual}    ${conteo_referencia}
    ...    La Galería continuó solicitando lotes más allá del final del listado

Validar Aplicacion Estable Y Respondiendo
    [Documentation]    Verifica que la app sigue estable y la interfaz responde a la interacción tras el fin del listado.
    Wait Until Element Is Visible    ${GALERIA_CONTENEDOR_CUADRICULA}    timeout=15s
    Page Should Contain Element      ${GALERIA_IMAGEN_ITEM}
    Execute Javascript    document.querySelector("#galeria_grid").scrollBy(0, -600)
    Sleep    1s
    ${cantidad}=    Contar Imagenes En Galeria
    Should Be True    ${cantidad} > 0
    ...    La interfaz de la Galería no responde tras alcanzar el final del listado

# ---- TC010: Caché y recuperación de imágenes ----
Capturar Identificadores De Imagenes Visibles
    [Documentation]    Retorna la lista de identificadores (src) de las miniaturas visibles, preservando el orden.
    ${elementos}=    Get WebElements    ${GALERIA_MINIATURA_IMAGEN}
    ${lista}=        Create List
    FOR    ${elemento}    IN    @{elementos}
        ${identificador}=    Get Element Attribute    ${elemento}    src
        Append To List    ${lista}    ${identificador}
    END
    RETURN    ${lista}

Cerrar Aplicacion Por Completo
    [Documentation]    Cierra por completo la app/navegador simulando el cierre desde el administrador de aplicaciones.
    Close Browser

Reabrir Aplicacion Claro Drive
    [Documentation]    Reabre la app/navegador tras el cierre completo.
    Open Browser    ${URL_APP_CLARO_DRIVE}    browser=chrome
    Maximize Browser Window

Validar Miniaturas Recuperadas Desde Cache
    [Documentation]    Verifica que las miniaturas se muestran de inmediato desde caché, sin pantalla en blanco.
    Wait Until Element Is Visible      ${GALERIA_MINIATURA_IMAGEN}    timeout=10s
    Page Should Not Contain Element    ${GALERIA_PANTALLA_EN_BLANCO}
    ${desde_cache}=    Get Element Count    ${GALERIA_MINIATURA_DESDE_CACHE}
    Should Be True    ${desde_cache} > 0
    ...    Las miniaturas no se recuperaron desde la caché local

Comparar Conjuntos De Imagenes
    [Documentation]    Verifica que las imágenes recuperadas coinciden en contenido y orden con la sesión previa.
    [Arguments]    ${lista_previa}    ${lista_actual}
    Lists Should Be Equal    ${lista_previa}    ${lista_actual}
    ...    Las imágenes recuperadas desde caché no coinciden en contenido y orden con la sesión previa
