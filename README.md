# Confirmar Recibo de Nómina

Este proyecto es una automatización de pruebas desarrollada con CodeceptJS, que utiliza Gherkin para la definición y ejecución de pruebas. La prueba consiste en realizar la aceptación de los recibos de nómina en el sistema SF:ERP.

## Tecnologías Utilizadas

- **CodeceptJS**: Framework de pruebas de aceptación de extremo a extremo.
- **Gherkin**: Lenguaje para definir pruebas de manera legible.
- **Playwright**: Herramienta para la automatización de navegadores.
- **Allure**: Plugin para la generación de reportes de pruebas.

## Configuración del Proyecto

### Archivo `.env`

Para manejar datos sensibles como el usuario y la contraseña, se utiliza un archivo `.env`. Asegúrate de crear este archivo en la raíz del proyecto con el siguiente contenido:

```properties
USER_NAME=tu_usuario@ejemplo.com
PASSWORD=tu_contraseña
```

### Archivo `package.json`

El archivo `package.json` contiene las dependencias y scripts necesarios para ejecutar las pruebas y generar los reportes:

```json
{
    "name": "confirmar_recibo_nomina",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "codeceptjs": "codeceptjs run --steps",
        "report": "allure serve output/allure-results"
    },
    "devDependencies": {
        "@codeceptjs/configure": "^1.0.1",
        "allure-codeceptjs": "^3.0.6",
        "codeceptjs": "^3.6.7",
        "dotenv": "^16.4.5",
        "playwright": "^1.49.0"
    }
}
```

### Estructura de Archivos

- **`sf_erp.js`**: Contiene los métodos para interactuar con la interfaz del sistema SF:ERP.
- **`basic.feature`**: Define los escenarios de prueba utilizando Gherkin.
- **`codecept.conf.js`**: Configuración de CodeceptJS.
- **`confirm_payroll_receipts_steps.js`**: Implementación de los pasos definidos en el archivo `.feature`.
- **`steps_file.js`**: Archivo para agregar métodos personalizados al objeto `I`.

### Ejecución de Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run codeceptjs
```

### Generación de Reportes

Para generar y visualizar los reportes de Allure, utiliza el siguiente comando:

```bash
npm run report
```

Los reportes se generarán en la carpeta `output/allure-results`.
