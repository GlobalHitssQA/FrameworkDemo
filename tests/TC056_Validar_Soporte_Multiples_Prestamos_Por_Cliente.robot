*** Settings ***
Documentation    Caso de prueba: Validar soporte de múltiples préstamos por cliente
...              Proceso: Administración de crédito
...              Aplicación: BES
...              Funcionalidad: Gestión de préstamos múltiples
...              Escenario: Verificar que el sistema BES permita gestionar múltiples préstamos
...              activos para un mismo cliente según la configuración de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Cliente con al menos un préstamo activo
...              - Configuración de múltiples préstamos habilitada según límites de Amigo Paguitos
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente
${TELEFONO_CLIENTE}         5512345678
${CUSTOMER_ID}              CUS123456789

# Datos de prueba - Segundo Préstamo (nuevo a crear)
${MONTO_SEGUNDO_PRESTAMO}   10000
${PLAZO_SEGUNDO_PRESTAMO}   12
${CICLO_SEGUNDO_PRESTAMO}   mensual

*** Test Cases ***
Validar Soporte De Múltiples Préstamos Por Cliente
    [Documentation]    Este caso de prueba verifica que el sistema BES permita gestionar
    ...                múltiples préstamos activos para un mismo cliente según la configuración
    ...                de Amigo Paguitos, y que cada préstamo se gestione de manera independiente
    ...                con sus propias parcialidades y calendarios de pago.
    ...
    ...                Pasos:
    ...                1. Acceder al módulo de gestión de préstamos en BES
    ...                2. Consultar un cliente con al menos un préstamo activo existente
    ...                3. Iniciar el proceso de creación de un nuevo préstamo para el mismo cliente
    ...                4. Ingresar los datos del nuevo préstamo para el cliente
    ...                5. Confirmar la creación del segundo préstamo para el cliente
    ...                6. Verificar que ambos préstamos se gestionen de manera independiente
    [Tags]    PruebaGeneradaIA

    # Step 1: Acceder al módulo de gestión de préstamos en BES
    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de consulta de préstamos

    # Step 2: Consultar un cliente con al menos un préstamo activo existente
    Cuando consulta un cliente con al menos un préstamo activo existente    ${TELEFONO_CLIENTE}

    Entonces el sistema muestra el préstamo activo actual del cliente

    # Step 3: Iniciar el proceso de creación de un nuevo préstamo para el mismo cliente
    Cuando inicia el proceso de creación de un nuevo préstamo para el mismo cliente

    Entonces el sistema valida la configuración de múltiples préstamos permitidos según Amigo Paguitos

    # Step 4: Ingresar los datos del nuevo préstamo para el cliente
    Cuando ingresa los datos del nuevo préstamo para el cliente    ${CUSTOMER_ID}    ${MONTO_SEGUNDO_PRESTAMO}    ${PLAZO_SEGUNDO_PRESTAMO}    ${CICLO_SEGUNDO_PRESTAMO}

    # Step 5: Confirmar la creación del segundo préstamo para el cliente
    Cuando confirma la creación del segundo préstamo para el cliente

    Entonces el sistema registra el nuevo préstamo y muestra ambos préstamos activos del cliente

    # Step 6: Verificar que ambos préstamos se gestionen de manera independiente
    Y verifica que ambos préstamos se gestionan de manera independiente

    [Teardown]    Entonces cerrar la sesión del navegador
