*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar el proceso de reverso de pagos en BES cuando se requiere anular una acreditación de pago de parcialidad
    [Tags]    PruebaGeneradaIA    Posventa    BES    AdministracionCredito    Funcional
    [Documentation]    Verificar el proceso de reverso de pagos en BES cuando se requiere anular
    ...                una acreditación de pago de parcialidad en Administración de crédito Amigo Paguitos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES con permisos de administración de pagos;
    ...                Crédito activo con al menos un pago acreditado;
    ...                Conexión con servicios de BES disponible
    Given el usuario accede a la pantalla de administración de pagos con un crédito que tiene pagos acreditados
    When el usuario selecciona un pago acreditado previamente y ejecuta la función de reverso de pago
    And el usuario confirma la operación de reverso de pago
    Then el sistema ejecuta el reverso del pago exitosamente
    And el saldo del crédito se actualiza correctamente sumando el monto revertido
    And el sistema registra la operación de reverso en el historial de transacciones con todos los detalles

*** Keywords ***
El usuario accede a la pantalla de administración de pagos con un crédito que tiene pagos acreditados
    El usuario accede a la interfaz de administración de pagos con un crédito que tiene pagos acreditados    PREST123456

El usuario selecciona un pago acreditado previamente y ejecuta la función de reverso de pago
    Se selecciona un pago acreditado y se ejecuta la función de reverso    1    4500

El usuario confirma la operación de reverso de pago
    Se confirma la operación de reverso de pago

El sistema ejecuta el reverso del pago exitosamente
    # La verificación de ejecución exitosa ya se realiza en el keyword anterior
    Page Should Contain Element    ${BES_MENSAJE_REVERSO_EXITOSO}

El saldo del crédito se actualiza correctamente sumando el monto revertido
    El saldo del crédito se actualiza correctamente sumando el monto revertido    ${REFERENCIA_CREDITO}    ${MONTO_REVERSO}

El sistema registra la operación de reverso en el historial de transacciones con todos los detalles
    El historial de transacciones registra la operación de reverso con todos los detalles    ${REFERENCIA_CREDITO}    ${MONTO_REVERSO}    usuario_test
