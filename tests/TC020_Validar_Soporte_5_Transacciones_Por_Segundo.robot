*** Settings ***
Documentation    Caso de prueba: Validar soporte de 5 transacciones por segundo
...              Proceso: Administración de Crédito
...              Aplicación: PACPagosService
...              Funcionalidad: Capacidad de procesamiento y rendimiento del servicio
...              Escenario: Verificar que el servicio PACPagosService soporte al menos 5 transacciones
...              por segundo (5 TPS) equivalente a 300 transacciones por minuto (300 TPM) cumpliendo
...              con los requerimientos de rendimiento especificados
...
...              Precondiciones:
...              - Servicio PACPagosService desplegado en ambiente de pruebas o productivo
...              - Herramienta de pruebas de carga configurada
...              - Datos de prueba de clientes Amigo Paguitos disponibles en BES
...              - Infraestructura dimensionada para soportar la carga especificada
...              - Servicios de BES con capacidad adecuada
...
...              Técnica ISTQB: Prueba exploratoria
...              Complejidad: Alta

Library           RequestsLibrary
Library           Collections
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Configuración de la prueba de carga
${DURACION_PRUEBA_MINUTOS}       10
${TPS_OBJETIVO}                  5
${TPM_ESPERADO}                  300
${TIMEOUT_MAXIMO_SEGUNDOS}       120
${PORCENTAJE_EXITO_MINIMO}       99.0

# Pool de datos de prueba - Números telefónicos de clientes Amigo Paguitos existentes en BES
@{TELEFONOS_PRUEBA}
...    5512345678
...    5512345679
...    5512345680
...    5512345681
...    5512345682
...    5512345683
...    5512345684
...    5512345685
...    5512345686
...    5512345687

*** Test Cases ***
Validar Soporte De 5 Transacciones Por Segundo En PACPagosService
    [Documentation]    Este caso de prueba verifica que el servicio PACPagosService soporte al menos
    ...                5 transacciones por segundo (5 TPS) equivalente a 300 transacciones por minuto (300 TPM)
    ...                cumpliendo con los requerimientos de rendimiento especificados.
    ...
    ...                Flujo de validación:
    ...                1. Preparar un conjunto de datos de prueba con números telefónicos válidos de clientes
    ...                   Amigo Paguitos existentes en BES para ejecutar consultas realistas
    ...                2. Configurar la prueba de carga para generar exactamente 5 transacciones por segundo
    ...                   durante un período de al menos 10 minutos
    ...                3. Ejecutar la prueba de carga sostenida generando una carga constante de 5 TPS (300 TPM)
    ...                   hacia el servicio PACPagosService
    ...                4. Monitorear y registrar los tiempos de respuesta de cada transacción, verificando que
    ...                   se mantengan dentro del timeout configurado de 120 segundos para el BUS
    ...                5. Verificar que el servicio procese exitosamente las 5 transacciones por segundo sin
    ...                   generar errores de timeout (ESB3, ESB6), errores de servicio no disponible (ESB2)
    ...                   o errores de conexión (ESB4)
    ...                6. Validar que la infraestructura del ESB y los servicios de BES soporten la carga sin
    ...                   degradación significativa del rendimiento ni saturación de recursos
    [Tags]    PruebaGeneradaIA    PruebasNoFuncionales    Rendimiento    Carga    PACPagosService

    # STEP 1: Preparar un conjunto de datos de prueba con números telefónicos válidos de clientes Amigo Paguitos
    Dado que el servicio PACPagosService está disponible
    Y cuento con datos de prueba de clientes Amigo Paguitos en BES
    ...    @{TELEFONOS_PRUEBA}

    # STEP 2 y STEP 3: Ejecutar una prueba de carga sostenida generando exactamente 5 transacciones por segundo
    # durante un período de al menos 10 minutos
    Cuando ejecuto una prueba de carga sostenida de 5 TPS durante el período especificado
    ...    ${DURACION_PRUEBA_MINUTOS}    ${TPS_OBJETIVO}

    # STEP 4: Monitorear y registrar los tiempos de respuesta de cada transacción verificando que se mantengan
    # dentro del timeout configurado de 120 segundos para el BUS
    Y monitoreo los tiempos de respuesta de cada transacción

    # STEP 4 (validación): Todas las transacciones completan su procesamiento dentro de los límites de tiempo
    Entonces todas las transacciones completan dentro del timeout configurado de 120 segundos

    # STEP 5: Verificar que el servicio procese exitosamente las 5 transacciones por segundo sin generar errores
    # de timeout (ESB3, ESB6), errores de servicio no disponible (ESB2) o errores de conexión (ESB4)
    Y el servicio procesa exitosamente las transacciones sin errores

    # STEP 5 (validación adicional): Validar ausencia de errores específicos ESB
    Y valido que no se generaron errores de timeout ni servicio no disponible

    # Limpieza: Cerrar la sesión del servicio
    [Teardown]    Finalmente cierro la sesión del servicio
