*** Settings ***
Documentation    Keywords de alto nivel (capa de negocio) para la Sección Fotos (Galería)
...              de la App iOS Claro Drive. No contienen locators; orquestan los Page Objects.
Library          SeleniumLibrary
Library          Collections
Resource         ../pages/LoginPage.resource
Resource         ../pages/GaleriaFotosPage.resource

*** Variables ***
${USUARIO_PRUEBA}      usuario_prueba@clarodrive.com
${PASSWORD_PRUEBA}     Prueba123*
${CARPETA_DESTINO}     Carpeta_Destino_Regresion

*** Keywords ***
Dado Que El Usuario Esta Autenticado En Claro Drive
    [Documentation]    Precondición: usuario autenticado en la App iOS Claro Drive.
    Abrir Aplicacion Claro Drive
    Ingresar Credenciales De Usuario    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Validar Sesion Iniciada

Y El Usuario Abre La Seccion Fotos
    [Documentation]    Abre la Sección Fotos (Galería).
    Abrir Seccion Fotos

Cuando El Usuario Ejecuta La Accion Preview Sobre La Imagen
    [Documentation]    Selecciona una imagen y ejecuta preview a resolución completa.
    Seleccionar Primera Imagen
    Abrir Menu De Acciones De Imagen
    Ejecutar Accion Preview

Entonces La Imagen Se Muestra En Vista Previa Completa
    [Documentation]    Valida el preview y regresa a la Galería.
    Wait Until Element Is Visible    ${GALERIA_PREVIEW_RESOLUCION_FULL}    timeout=20s
    Cerrar Preview

Cuando El Usuario Comparte La Imagen A Un Destino
    [Documentation]    Ejecuta la acción de compartir eligiendo un destino.
    Abrir Menu De Acciones De Imagen
    Ejecutar Accion Compartir

Entonces La Imagen Se Comparte Correctamente
    [Documentation]    Valida la confirmación de compartir.
    Wait Until Element Is Visible    ${GALERIA_CONFIRMACION_COMPARTIR}    timeout=20s

Cuando El Usuario Mueve La Imagen A Otra Ubicacion
    [Documentation]    Ejecuta la acción de mover hacia la carpeta destino.
    Abrir Menu De Acciones De Imagen
    Ejecutar Accion Mover    ${CARPETA_DESTINO}

Entonces La Imagen Se Mueve A La Ubicacion Destino
    [Documentation]    Valida la confirmación de movimiento.
    Wait Until Element Is Visible    ${GALERIA_CONFIRMACION_MOVER}    timeout=20s

Cuando El Usuario Elimina La Imagen Seleccionada
    [Documentation]    Ejecuta la acción de eliminar y confirma.
    Abrir Menu De Acciones De Imagen
    Ejecutar Accion Eliminar

Entonces La Imagen Se Elimina De La Galeria
    [Documentation]    Valida la confirmación de eliminación.
    Wait Until Element Is Visible    ${GALERIA_CONFIRMACION_ELIMINAR}    timeout=20s

Entonces La Galeria Refleja Los Cambios Sin Regresiones
    [Documentation]    Valida que la Galería siga estable, sin freezes ni crashes.
    Validar Galeria Sin Regresiones

Entonces Las Imagenes Se Presentan Ordenadas Cronologicamente
    [Documentation]    Valida el orden cronológico descendente del lote visible.
    ${fechas}=    Obtener Fechas De Imagenes
    Validar Orden Cronologico Descendente    ${fechas}

Cuando El Usuario Recorre Varios Lotes De La Galeria
    [Documentation]    Realiza scroll a través de varios lotes de imágenes.
    Hacer Scroll Hasta El Final De La Galeria

Entonces El Orden Cronologico Se Mantiene Entre Lotes
    [Documentation]    Valida la continuidad del orden cronológico tras el scroll.
    ${fechas}=    Obtener Fechas De Imagenes
    Validar Orden Cronologico Descendente    ${fechas}

Cuando El Usuario Reabre La Seccion Fotos Varias Veces
    [Documentation]    Cierra y reabre la Sección Fotos la cantidad de veces indicada.
    [Arguments]    ${veces}
    FOR    ${indice}    IN RANGE    ${veces}
        Cerrar Seccion Fotos
        Abrir Seccion Fotos
        Hacer Scroll Hasta El Final De La Galeria
    END

Entonces La Galeria No Presenta Duplicados Ni Discrepancias
    [Documentation]    Valida ausencia de duplicados tras las reaperturas.
    ${fechas}=    Obtener Fechas De Imagenes
    Validar Ausencia De Duplicados    ${fechas}

Entonces El Conteo Total De Imagenes Se Mantiene Consistente
    [Documentation]    Compara el conteo actual contra el conteo inicial esperado.
    [Arguments]    ${conteo_esperado}
    ${conteo_actual}=    Contar Imagenes En Galeria
    Should Be Equal As Integers    ${conteo_actual}    ${conteo_esperado}
    ...    El conteo total de imágenes cambió respecto a la primera apertura

Finalizar Prueba
    [Documentation]    Cierra el navegador/app al terminar la prueba.
    Close Browser
