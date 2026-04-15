*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar centralización de información evitando descentralización en diferentes plataformas cuando se integra préstamo desde Amigo Paguitos
    [Tags]    PruebaGeneradaIA    BES    AmigoPaguitos    Funcional
    [Documentation]    Verificar que toda la información del financiamiento se centralice en BES evitando dispersión en múltiples plataformas
    ...                cuando se integra un préstamo desde Amigo Paguitos AP.AG. El sistema debe centralizar datos del cliente,
    ...                información del préstamo e información del equipo, permitiendo que todos los canales internos y externos
    ...                (CACs, CVTs, CAT, Distribuidores, Cadenas) visualicen la información del crédito desde la pantalla 360 de BES
    ...                como fuente única de verdad, sin necesidad de acceder a plataformas adicionales.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Baja
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario con permisos de administrador autenticado en BES; Préstamo generado desde Amigo Paguitos AP.AG migrado a BES; Conexión a servicios backend disponible
    Given un préstamo ha sido generado desde Amigo Paguitos AP.AG y migrado a BES
    When el administrador accede al sistema BES como usuario administrador
    And consulta la información del préstamo desde Amigo Paguitos incluyendo datos del cliente información del préstamo e información del equipo
    Then el sistema BES despliega de manera centralizada todos los datos del financiamiento
    And no existe duplicidad de información en otras plataformas externas a BES
    And los canales internos y externos pueden visualizar la información del crédito desde la pantalla 360 de BES sin necesidad de acceder a plataformas adicionales

*** Keywords ***
Un préstamo ha sido generado desde Amigo Paguitos AP.AG y migrado a BES
    Un préstamo ha sido generado desde Amigo Paguitos AP.AG y migrado correctamente a BES    Carlos Ramírez    Av. Reforma 456    5559876543    APAG987654    35000    12    12    14.5    2026-04-15

El administrador accede al sistema BES como usuario administrador
    Acceder al sistema BES como usuario administrador

Consulta la información del préstamo desde Amigo Paguitos incluyendo datos del cliente información del préstamo e información del equipo
    Consultar la información completa del préstamo generado desde Amigo Paguitos    APAG987654

El sistema BES despliega de manera centralizada todos los datos del financiamiento
    Verificar que BES despliega de manera centralizada todos los datos del financiamiento desde Amigo Paguitos    APAG987654

No existe duplicidad de información en otras plataformas externas a BES
    Verificar que la información del préstamo reside únicamente en BES como fuente única de verdad

Los canales internos y externos pueden visualizar la información del crédito desde la pantalla 360 de BES sin necesidad de acceder a plataformas adicionales
    Verificar que todos los canales pueden acceder a la información centralizada desde pantalla 360 de BES    APAG987654
