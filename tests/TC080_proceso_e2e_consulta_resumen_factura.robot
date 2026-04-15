*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar proceso E2E completo incluyendo consulta, resumen de cuenta y facturación
    [Tags]    PruebaGeneradaIA    E2E    BES    Vista360    ResumenCuenta    Factura    Integral
    [Documentation]    Verificar el proceso completo desde la venta con financiamiento Amigo Paguitos
    ...                hasta la consulta de información, generación de resumen de cuenta y facturación
    ...                a través de los canales internos y externos.
    ...                El flujo incluye: completar venta en AP.AG, transferir información a BES,
    ...                acceder desde canal interno (CAC/CVT/CAT) a Vista 360, consultar información
    ...                del crédito con desglose de cuotas y pagos, generar resumen de cuenta con
    ...                todos los movimientos y calendario de pagos, solicitar factura con datos fiscales
    ...                y conceptos del financiamiento, consultar desde canal externo (Distribuidor o
    ...                Cadena Comercial) la información del crédito, y validar reportes de ventas
    ...                por vendedor y concentrado por fuerza de venta.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Preconditions: BES integrado con Vista 360; Financiamiento Amigo Paguitos activo
    ...                con movimientos registrados; Usuario de canal interno o externo autenticado con
    ...                permisos de consulta; Configuración de reportes de ventas habilitada
    Given se completa una venta con financiamiento Amigo Paguitos en AP.AG y se transfiere a BES
    When un asesor de canal interno accede a Vista 360 de BES
    Then el sistema autentica al asesor y despliega la pantalla Vista 360
    And se consulta la información del crédito Amigo Paguitos del cliente
    And BES muestra en Vista 360 toda la información del financiamiento incluyendo ventas y datos del cliente
    And se genera el resumen de cuenta del financiamiento con detalle de movimientos
    And BES genera el resumen mostrando cargos, pagos, saldo actual y calendario de pagos
    And se solicita la generación de factura por los conceptos del financiamiento
    And el sistema genera la factura con los datos fiscales del cliente y conceptos del financiamiento
    And un usuario de canal externo consulta desde Vista 360 la información del crédito del cliente
    And los reportes de ventas muestran correctamente las ventas por vendedor y concentrado por fuerza de venta

*** Keywords ***
Se completa una venta con financiamiento Amigo Paguitos en AP.AG y se transfiere a BES
    Se completa una venta con financiamiento Amigo Paguitos desde AP.AG    Carlos López    Av. Reforma 456    5557654321    CLI789456    30000    12
    BES recibe y almacena el financiamiento con todos los datos    CLI789456    Carlos López    30000

Un asesor de canal interno accede a Vista 360 de BES
    El asesor de canal interno accede a Vista 360 de BES    CAC

El sistema autentica al asesor y despliega la pantalla Vista 360
    El sistema autentica al asesor y muestra Vista 360

Se consulta la información del crédito Amigo Paguitos del cliente
    Se consulta en Vista 360 la información del crédito Amigo Paguitos    CLI789456

BES muestra en Vista 360 toda la información del financiamiento incluyendo ventas y datos del cliente
    BES muestra en Vista 360 la información completa del financiamiento

Se genera el resumen de cuenta del financiamiento con detalle de movimientos
    Se genera desde BES el resumen de cuenta del financiamiento

BES genera el resumen mostrando cargos, pagos, saldo actual y calendario de pagos
    BES genera el resumen de cuenta con detalle de movimientos

Se solicita la generación de factura por los conceptos del financiamiento
    Se solicita la generación de factura por conceptos del financiamiento    XAXX010101000    CLIENTE EJEMPLO SA DE CV    Calle Ejemplo 123, Col. Centro

El sistema genera la factura con los datos fiscales del cliente y conceptos del financiamiento
    El sistema genera la factura con los datos fiscales y conceptos    XAXX010101000    CLIENTE EJEMPLO SA DE CV

Un usuario de canal externo consulta desde Vista 360 la información del crédito del cliente
    El canal externo accede a Vista 360 y visualiza información del crédito    Distribuidores    CLI789456

Los reportes de ventas muestran correctamente las ventas por vendedor y concentrado por fuerza de venta
    Los reportes de ventas muestran ventas por vendedor y concentrado
    BES presenta reportes segmentados por vendedor y consolidados
