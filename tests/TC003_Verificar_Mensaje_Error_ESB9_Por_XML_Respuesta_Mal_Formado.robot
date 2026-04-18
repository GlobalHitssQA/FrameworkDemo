*** Settings ***
Documentation    Caso de prueba: Verificar mensaje de error ESB9 por XML de respuesta mal formado
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Validación de estructura XML
...              Escenario: Verificar que el ESB detecta y notifica correctamente cuando el XML
...              de respuesta de BES está mal formado con elementos faltantes o sobrantes
...
...              Precondiciones:
...              - Servicio BES configurado para devolver XML mal formado
...              - Usuario autenticado en el sistema
...              - Validación de estructura XML habilitada en el ESB
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para simular XML mal formado
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Verificar Mensaje De Error ESB9 Por XML De Respuesta Mal Formado
    [Documentation]    Este caso de prueba verifica que el ESB detecta y notifica correctamente
    ...                cuando el XML de respuesta de BES está mal formado con elementos faltantes
    ...                o elementos adicionales no especificados en el esquema esperado.
    ...
    ...                Pasos:
    ...                1. Configurar el servicio BES para generar una respuesta con XML mal formado
    ...                2. Enviar una petición de consulta desde Amigo Paguitos con número telefónico
    ...                3. Procesar la respuesta de BES en el ESB aplicando validación de estructura XML
    ...                4. Verificar que el ESB genera el código de error ESB9
    ...                5. Validar que no se aplica reintento automático para este tipo de error
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ValidacionXML    IntegracionServicios

    # STEP 1: Configurar el servicio BES para generar una respuesta con XML mal formado que contenga elementos faltantes o adicionales
    Cuando se configura el servicio BES para devolver XML mal formado
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2 y 3: Enviar petición desde Amigo Paguitos y el ESB procesa la respuesta aplicando validación XML
    Entonces el ESB detecta que el XML está mal formado y faltan o sobran elementos

    # STEP 4: Verificar que el ESB genera el código de error ESB9 indicando esquema de mensaje de salida no válido
    Y el ESB genera el código de error ESB9 indicando esquema de mensaje de salida no válido

    # STEP 4 (continuación): El ESB devuelve al consumidor el error ESB9 con la descripción de XML mal formado
    Entonces el ESB devuelve al consumidor el error ESB9 con la descripción de XML mal formado

    # STEP 5: Validar que no se aplica reintento automático para este tipo de error (reintento N)
    Y el ESB marca el error sin reintento automático porque es error de validación
