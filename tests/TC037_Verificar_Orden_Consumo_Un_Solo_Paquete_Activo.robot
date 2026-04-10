*** Settings ***
Documentation     Test Case ID: 37
...               Título: Verificar orden de consumo cuando solo hay un paquete activo
...               Proceso: Postventa
...               Aplicación: UPC
...               Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
...
...               Escenario: Verificar que el orden de débito de paquetes no se altera cuando solo existe
...               un Paquete Internet Amigo activo
...
...               Tipo de Prueba: Regresión
...               Complejidad: Low
...               Técnica ISTQB: Casos de uso

Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_TEST}          5512345678
${PAQUETE_100_PESOS}          PAQ_AMIGO_100
${MB_ESPERADOS_INICIAL}       1000
${MB_ESPERADOS_DESPUES}       950
${CONSUMO_MB}                 50

*** Test Cases ***
Verificar Orden De Consumo Cuando Solo Hay Un Paquete Activo
    [Documentation]    Verifica que el orden de débito de paquetes no se altera cuando solo existe
    ...                un Paquete Internet Amigo activo de $100 con 1000 MB
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    OrdenDebito    Regresion

    Given el usuario prepago autenticado accede al módulo de Paquetes Internet Amigo
    When activa un solo Paquete Internet Amigo de 100 pesos con 1000 MB
    Then el sistema registra el paquete con 1000 MB y su vigencia correspondiente
    And el orden de débito original queda registrado en el sistema
    When realiza consumo de datos de navegación libre
    Then el sistema debita el consumo del paquete activo siguiendo el orden de débito establecido
    And el orden de débito no ha sido modificado y se mantiene igual que antes
    When consulta el saldo restante después del consumo
    Then el saldo se muestra correctamente descontado del paquete activo

*** Keywords ***
El Usuario Prepago Autenticado Accede Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_TEST}
    Log    Usuario prepago autenticado accede al módulo de Paquetes Internet Amigo

Activa Un Solo Paquete Internet Amigo De 100 Pesos Con 1000 MB
    Activar Paquete Internet Amigo 100
    Log    Se activó un solo Paquete Internet Amigo de $100 con 1000 MB

El Sistema Registra El Paquete Con 1000 MB Y Su Vigencia Correspondiente
    Verificar Mensaje De Activación Exitosa
    Consultar Cantidad Total De Datos Disponibles
    Verificar Suma De Datos En Bolsa    ${MB_ESPERADOS_INICIAL}
    Log    El sistema registró el paquete con ${MB_ESPERADOS_INICIAL} MB y su vigencia correspondiente

El Orden De Débito Original Queda Registrado En El Sistema
    ${orden_original}=    Registrar Orden De Debito Original Del Sistema
    Log    Orden de débito original registrado: ${orden_original}

Realiza Consumo De Datos De Navegación Libre
    Realizar Consumo De Datos De La Bolsa Unificada    ${CONSUMO_MB}
    Log    Se realizó consumo de ${CONSUMO_MB} MB de datos de navegación libre

El Sistema Debita El Consumo Del Paquete Activo Siguiendo El Orden De Débito Establecido
    Verificar Datos Restantes En Bolsa Unificada    ${MB_ESPERADOS_DESPUES}
    Log    El sistema debitó ${CONSUMO_MB} MB del paquete activo siguiendo el orden establecido

El Orden De Débito No Ha Sido Modificado Y Se Mantiene Igual Que Antes
    Verificar Orden De Debito Se Mantiene Sin Alteraciones
    Log    El orden de débito no ha sido modificado por el consumo de datos

Consulta El Saldo Restante Después Del Consumo
    Consultar Cantidad Total De Datos Disponibles
    Log    Consultando saldo restante después del consumo

El Saldo Se Muestra Correctamente Descontado Del Paquete Activo
    Verificar Datos Restantes Consistentes En Todas Las Plataformas    ${MB_ESPERADOS_DESPUES}
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Log    El saldo se muestra correctamente: ${MB_ESPERADOS_DESPUES} MB disponibles en todas las plataformas
