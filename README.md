# PruebasAutomatizadas

## Entrega realizada por:
| Nombre     | Correo                                        |
|--------------------|----------------------------------------------------|
| Miguel Alejandro Rodríguez Sierra | ma.rodriguezs123456@uniandes.edu.co  |

## Pre-requisitos para la instalación y ejecución
* Node v20.18.0
* Visual Studio Code v1.95.3
* Google Chrome v131.0.6778.86
* Cuenta creada en GitHub
* Ghost-CLI version: 1.26.1
* Ghost version: 5.101.2

## Pasos para la instalación y ejecucion
### 1. Clonar el proyecto desde git hub
Ubicarse en una ruta dentro del PC y ejecutar el siguiente comando:

```
git clone https://github.com/mars192/PruebasAutomatizadas.git
```

### 2. Confirmar la versión de NodeJS
Para esta entrega se usa la versión v20.18.0 de NodeJS, por lo tanto, se debe ejecutar el siguiente comando para confirmar dicha versión:

```
node --version
```
### 3. Instalar dependencias para ghost
Acceder a la carpeta _/PruebasAutomatizadas/ghost/_ presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe remplazar el valor de _<YOUR_DIRECTORY_HERE>_ según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/ghost/
```
Luego de esto, ejecutar el siguiente comando
```
npm install
```

### 4. Subir ghost
Desde el directorio _<YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/ghost/ghost/_ ejecutar el comando:
```
../node_modules/ghost-cli/bin/ghost start
```
_**Nota:** En caso de no utilizar los archivos de ghost presentes en el proyecto de git y con el objetivo de que las pruebas se ejecuten de forma exitosa, se debe crear un usuario adminsitrador con los datos: email: ma.rodriguezs123456@uniandes.edu.co y contrsaeña: Prueba123456_ 

### 5. Instalar dependencias para cypress
Acceder a la carpeta _/PruebasAutomatizadas/cypress/_ presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe remplazar el valor de _<YOUR_DIRECTORY_HERE>_ según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/cypress/
```
Luego de esto, ejecutar el siguiente comando
```
npm install
```

### 6. Desplegar la ingerfaz gráfica de cypress
Desde el directorio _<YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/cypress/_ ejecutar el comando:
```
npm run cy:open
```
Luego de estos debe seleccionar/configurar la opcion _E2E Testing_ y finalmente seleccionar el navegador _Chrome_

### 7. Ejecutar pruebas
En la interfaz gráfica de cypress se ecuentra la sigueinte estructura:
- cypress/e2e/funcionalidades
  - F01_InternalTags
      - F01_Create_a-priori.cy.js
      - F01_Create_aleatorio.cy.js
      - F01_Create_pseudo.cy.js
      - F01_Modify_a-priori.cy.js
      - F01_Modify_aleatorio.cy.js
      - F01_Modify_pseudo.cy.js
  - F02_SignUp
    - F02_SignUp_a-priori.cy.js
    - F02_SignUp_aleatorio.cy.js
    - F02_SignUp_pseudo.cy.js
  - F03_Views
    - F03_Create_a-priori.cy.js
    - F03_Create_aleatorio.cy.js
    - F03_Create_pseudo.cy.js
Para ejecutar los casos de cada funcionalidad, se debe dar clic cobre el archivo .cy.js.
