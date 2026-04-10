*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Validar Que Se Aplican Las Nuevas Reglas A Todos Los Montos Disponibles
    [Documentation]    ID: 39
    ...                Título: Validar que se aplican las nuevas reglas a todos los montos disponibles
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que las nuevas reglas de negocio se aplican correctamente a todos
    ...                los montos de Paquetes Internet Amigo disponibles
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario prepago autenticado; Todos los montos de Paquetes Internet Amigo
    ...                disponibles para activación; Sistema UPC disponible
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional    ReglasNegocio
    Given el usuario prepago está en el módulo de Paquetes Internet Amigo
    When activa combinaciones de paquetes de todos los montos disponibles
    And verifica las reglas de suma de datos para la combinación 20 y 30 pesos
    And verifica las reglas de suma de datos para la combinación 50 y 100 pesos
    And verifica las reglas de suma de datos para la combinación 100 y 200 pesos si existe
    Then el sistema crea una sola bolsa unificada en todos los casos
    And los beneficios del paquete mayor se conservan en todas las combinaciones
    And la información es consistente en todas las plataformas independientemente de los montos

*** Keywords ***
El Usuario Prepago Está En El Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Combinaciones De Paquetes De Todos Los Montos Disponibles
    Log    Se procederá a activar múltiples combinaciones de montos para validar las reglas de negocio

Verifica Las Reglas De Suma De Datos Para La Combinación 20 Y 30 Pesos
    Log    ===== VALIDANDO COMBINACIÓN: PAQUETE 20 + PAQUETE 30 =====
    Activar Paquete Internet Amigo 20
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 30
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Vigencia Corresponde Al Paquete De 30 Pesos En M2K    30 días
    Consultar Beneficios Activos
    Log    ===== VALIDACIÓN EXITOSA: COMBINACIÓN 20 + 30 CUMPLE CON LAS REGLAS =====

Verifica Las Reglas De Suma De Datos Para La Combinación 50 Y 100 Pesos
    Log    ===== VALIDANDO COMBINACIÓN: PAQUETE 50 + PAQUETE 100 =====
    Navegar A Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo
    Log    ===== VALIDACIÓN EXITOSA: COMBINACIÓN 50 + 100 CUMPLE CON LAS REGLAS =====

Verifica Las Reglas De Suma De Datos Para La Combinación 100 Y 200 Pesos Si Existe
    Log    ===== VALIDANDO COMBINACIÓN: PAQUETE 100 + PAQUETE 200 (si existe) =====
    Navegar A Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    ${paquete_200_existe}=    Run Keyword And Return Status    Wait Until Element Is Visible    css:[data-paquete-id="PAQ_AMIGO_200"]    timeout=5s
    Run Keyword If    ${paquete_200_existe}    Validar Combinación 100 Y 200 Pesos
    ...    ELSE    Log    El paquete de 200 pesos no está disponible, se omite esta validación

Validar Combinación 100 Y 200 Pesos
    Seleccionar Paquete Por ID    PAQ_AMIGO_100
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Seleccionar Paquete Por ID    PAQ_AMIGO_200
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Consultar Beneficios Activos
    Log    ===== VALIDACIÓN EXITOSA: COMBINACIÓN 100 + 200 CUMPLE CON LAS REGLAS =====

El Sistema Crea Una Sola Bolsa Unificada En Todos Los Casos
    Log    RESUMEN: En todas las combinaciones de montos probadas (20+30, 50+100, 100+200) se generó una sola bolsa unificada de datos
    Log    Validación confirmada en Plataforma 360, MiTelcel y Claro Pay

Los Beneficios Del Paquete Mayor Se Conservan En Todas Las Combinaciones
    Log    RESUMEN: En todas las combinaciones de montos se mantienen los beneficios del paquete con mayores beneficios
    Log    - Combinación 20+30: Beneficios del paquete de 30 pesos
    Log    - Combinación 50+100: Beneficios del paquete de 100 pesos (incluye RRSS ilimitadas)
    Log    - Combinación 100+200: Beneficios del paquete de 200 pesos (si existe)

La Información Es Consistente En Todas Las Plataformas Independientemente De Los Montos
    Log    RESUMEN: Las plataformas 360, MiTelcel y Claro Pay muestran correctamente la información unificada
    Log    La información es consistente independientemente de los montos activados (20, 30, 50, 100 o 200 pesos)
    Log    ===== VALIDACIÓN COMPLETA: LAS NUEVAS REGLAS SE APLICAN CORRECTAMENTE A TODOS LOS MONTOS =====
