#!/bin/bash

# Script de ejecución de pruebas Robot Framework
# Proyecto: Automatización Telcel - Amigo Paguitos

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Telcel - Robot Framework Test Runner${NC}"
echo -e "${GREEN}  Amigo Paguitos Test Suite${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Verificar instalación de Robot Framework
if ! command -v robot &> /dev/null
then
    echo -e "${RED}ERROR: Robot Framework no está instalado${NC}"
    echo -e "${YELLOW}Por favor ejecuta: pip3 install -r requirements.txt${NC}"
    exit 1
fi

# Crear directorio de reportes si no existe
mkdir -p reports

# Opciones de ejecución
MODE=${1:-all}
REPORT_DIR="reports"

case $MODE in
    "tc032")
        echo -e "${YELLOW}Ejecutando TC032: Validación de oferta primaria...${NC}"
        robot -d $REPORT_DIR tests/TC_032_Validacion_Oferta_Primaria_Amigo_Paguitos.robot
        ;;
    "tc033")
        echo -e "${YELLOW}Ejecutando TC033: Alta de oferta suplementaria Telcel Up...${NC}"
        robot -d $REPORT_DIR tests/TC_033_Alta_Oferta_Suplementaria_Telcel_Up.robot
        ;;
    "tc038")
        echo -e "${YELLOW}Ejecutando TC038: Restricciones de trámites postactivación...${NC}"
        robot -d $REPORT_DIR tests/TC_038_Restricciones_Tramites_Postactivacion.robot
        ;;
    "tc039")
        echo -e "${YELLOW}Ejecutando TC039: Cambio de ciclo de facturación...${NC}"
        robot -d $REPORT_DIR tests/TC_039_Cambio_Ciclo_Facturacion_99.robot
        ;;
    "tc067")
        echo -e "${YELLOW}Ejecutando TC067: Validar no cambio de oferta primaria...${NC}"
        robot -d $REPORT_DIR tests/TC_067_Validar_No_Cambio_Oferta_Primaria.robot
        ;;
    "ofertas")
        echo -e "${YELLOW}Ejecutando tests de Ofertas...${NC}"
        robot -d $REPORT_DIR -i Ofertas tests/
        ;;
    "restricciones")
        echo -e "${YELLOW}Ejecutando tests de Restricciones...${NC}"
        robot -d $REPORT_DIR -i Restricciones tests/
        ;;
    "dryrun")
        echo -e "${YELLOW}Ejecutando validación de sintaxis (dry run)...${NC}"
        robot --dryrun -d $REPORT_DIR tests/
        ;;
    "all")
        echo -e "${YELLOW}Ejecutando todos los tests...${NC}"
        robot -d $REPORT_DIR tests/
        ;;
    "help")
        echo "Uso: ./run_tests.sh [opción]"
        echo ""
        echo "Opciones disponibles:"
        echo "  tc032          - Ejecutar TC032 (Validación oferta primaria)"
        echo "  tc033          - Ejecutar TC033 (Alta Telcel Up)"
        echo "  tc038          - Ejecutar TC038 (Restricciones trámites)"
        echo "  tc039          - Ejecutar TC039 (Cambio ciclo 99)"
        echo "  tc067          - Ejecutar TC067 (No cambio oferta)"
        echo "  ofertas        - Ejecutar tests con tag 'Ofertas'"
        echo "  restricciones  - Ejecutar tests con tag 'Restricciones'"
        echo "  dryrun         - Validar sintaxis sin ejecutar"
        echo "  all            - Ejecutar todos los tests (por defecto)"
        echo "  help           - Mostrar esta ayuda"
        echo ""
        echo "Ejemplos:"
        echo "  ./run_tests.sh tc032"
        echo "  ./run_tests.sh ofertas"
        echo "  ./run_tests.sh dryrun"
        exit 0
        ;;
    *)
        echo -e "${RED}Opción no válida: $MODE${NC}"
        echo "Usa './run_tests.sh help' para ver las opciones disponibles"
        exit 1
        ;;
esac

# Verificar resultado
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✓ Ejecución completada exitosamente${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Reportes generados en: $REPORT_DIR/${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}  ✗ La ejecución falló${NC}"
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Revisa los reportes en: $REPORT_DIR/${NC}"
    echo ""
    exit 1
fi
