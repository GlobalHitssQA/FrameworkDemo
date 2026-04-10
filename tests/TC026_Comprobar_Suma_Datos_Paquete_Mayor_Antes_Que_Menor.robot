*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_AMIGO}    5512345678
${DATOS_ESPERADOS_SUMA}    150MB
${VIGENCIA_ESPERADA_PAQUETE_MAYOR}    30 días

*** Test Cases ***
Comprobar Suma De Datos Cuando Se Activa Primero El Paquete Mayor
    [Documentation]    ID: 26
    ...                Título: Comprobar suma de datos cuando se activa primero el paquete mayor
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Suma de Paquetes Internet Amigo
    ...                Escenario: Verificar el comportamiento de suma de datos y vigencia cuando se activa primero
    ...                un paquete Internet Amigo mayor y posteriormente uno menor
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Tabla de decisión
    ...                Precondición: Usuario Amigo sin paquetes Internet Amigo activos; Sistema UPC disponible;
    ...                Dos paquetes Internet Amigo de diferente denominación disponibles
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional    SumaDatos
    Given el usuario Amigo sin paquetes activos está en el módulo de Paquetes Internet Amigo
    When activa un paquete Internet Amigo de mayor denominación y registra MBs vigencia y beneficios
    And activa posteriormente un paquete Internet Amigo de menor denominación
    Then el sistema muestra una única bolsa con la suma de MBs del paquete mayor más el menor
    And el sistema mantiene la vigencia del paquete mayor originalmente activado
    And el sistema conserva los beneficios del paquete de mayor denominación
    And las plataformas de consulta muestran una sola bolsa de datos sumada correctamente

*** Keywords ***
El Usuario Amigo Sin Paquetes Activos Está En El Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Buscar Usuario Amigo Sin Paquetes Activos    ${NUMERO_LINEA_AMIGO}

Activa Un Paquete Internet Amigo De Mayor Denominación Y Registra MBs Vigencia Y Beneficios
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia
    Set Global Variable    ${VIGENCIA_PAQUETE_MAYOR}    ${EMPTY}
    Set Global Variable    ${DATOS_PAQUETE_MAYOR}    ${EMPTY}
    Abrir Pestaña Plataforma 360
    ${vigencia_mayor}=    Obtener Vigencia En Plataforma 360
    ${datos_mayor}=    Obtener Datos Totales En Plataforma 360
    Set Global Variable    ${VIGENCIA_PAQUETE_MAYOR}    ${vigencia_mayor}
    Set Global Variable    ${DATOS_PAQUETE_MAYOR}    ${datos_mayor}
    Log    Paquete mayor activado - Vigencia: ${VIGENCIA_PAQUETE_MAYOR}, Datos: ${DATOS_PAQUETE_MAYOR}

Activa Posteriormente Un Paquete Internet Amigo De Menor Denominación
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

El Sistema Muestra Una Única Bolsa Con La Suma De MBs Del Paquete Mayor Más El Menor
    Actualizar Consulta De Vigencia
    Consultar Datos Disponibles En Plataformas
    Verificar Suma De Datos De Ambos Paquetes    ${DATOS_ESPERADOS_SUMA}

El Sistema Mantiene La Vigencia Del Paquete Mayor Originalmente Activado
    Abrir Pestaña Plataforma 360
    ${vigencia_actual}=    Obtener Vigencia En Plataforma 360
    Should Contain    ${vigencia_actual}    ${VIGENCIA_ESPERADA_PAQUETE_MAYOR}
    Log    La vigencia se mantiene del paquete mayor: ${vigencia_actual}

El Sistema Conserva Los Beneficios Del Paquete De Mayor Denominación
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo

Las Plataformas De Consulta Muestran Una Sola Bolsa De Datos Sumada Correctamente
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
