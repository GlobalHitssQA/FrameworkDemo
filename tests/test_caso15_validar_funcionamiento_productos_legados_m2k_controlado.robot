*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA

*** Test Cases ***
Validar funcionamiento en productos legados m2k para Controlado
    [Tags]    PruebaGeneradaIA
    [Documentation]    Verificar que las nuevas reglas de negocio se aplican correctamente en usuarios controlados con productos legados m2k
    ...                Caso ID: 15
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia

    Given el usuario está autenticado en UPC
    And se identifica un usuario controlado con productos legados m2k
    When se activa un Paquete Internet Amigo de 30 pesos
    And se activa un segundo Paquete Internet Amigo de 50 pesos
    Then el sistema debe sumar automáticamente los datos de ambos paquetes
    And la vigencia resultante debe corresponder al paquete de 50 pesos que tiene mayor vigencia
    And se deben conservar los beneficios del paquete de 50 pesos con mayores beneficios
    And el sistema debe mostrar una sola bolsa para navegación y una para redes sociales
    [Teardown]    Cerrar Navegador

*** Keywords ***
El usuario está autenticado en UPC
    Iniciar Sesión En UPC

Se identifica un usuario controlado con productos legados m2k
    Identificar Usuario Controlado Con Productos Legados M2K    5512345678

Se activa un Paquete Internet Amigo de 30 pesos
    Activar Paquete Internet Amigo De 30 Pesos En Usuario Controlado

Se activa un segundo Paquete Internet Amigo de 50 pesos
    Activar Segundo Paquete Internet Amigo De 50 Pesos En Usuario Controlado

El sistema debe sumar automáticamente los datos de ambos paquetes
    Verificar Suma Automática De Datos De Paquetes 30 Y 50    3GB

La vigencia resultante debe corresponder al paquete de 50 pesos que tiene mayor vigencia
    Verificar Vigencia Resultante Corresponde Al Paquete De 50 Pesos    30 días

Se deben conservar los beneficios del paquete de 50 pesos con mayores beneficios
    Verificar Beneficios Conservados Son Del Paquete De 50 Pesos    Redes Sociales Ilimitadas

El sistema debe mostrar una sola bolsa para navegación y una para redes sociales
    Consultar Bolsas De Datos Unificadas
