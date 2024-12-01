# PruebasAutomatizadas

## Entrega realizada por:
| Nombre     | Correo                                        |
|--------------------|----------------------------------------------------|
| Miguel Alejandro Rodríguez Sierra | ma.rodriguezs123456@uniandes.edu.co  |

## Pre-requisitos para la instalación y ejecución
* Node v20.18.0
* Google Chrome v131.0.6778.86
* Ghost-CLI v1.26.1
* Ghost v5.101.2

## Pasos para la instalación y ejecución de pruebas RIPuppet
### 1. Clonar el proyecto desde GitHub
Ubicarse en una ruta del PC y ejecutar el siguiente comando:

```
git clone https://github.com/mars192/PruebasAutomatizadas.git
```
### 2. Confirmar la versión de NodeJS
Para esta entrega se usa la versión v20.18.0 de NodeJS, por lo tanto, se debe ejecutar el siguiente comando para confirmar dicha versión:

```
node --version
```
### 3. Instalar dependencias para Ghost
Acceder a la carpeta ```/PruebasAutomatizadas/ghost/``` presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe remplazar el valor de ```<YOUR_DIRECTORY_HERE>``` según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/ghost/
```
Luego de esto, ejecutar el siguiente comando
```
npm install
```

### 4. Subir Ghost
Desde el directorio ```<YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/ghost/ghost/``` ejecutar el comando:
```
../node_modules/ghost-cli/bin/ghost start
```
_**Nota:** En caso de no utilizar los archivos de Ghost presentes en el repositorio de GitHub y con el objetivo de que las pruebas se ejecuten de forma exitosa, se debe crear un usuario adminsitrador con los datos: ```email: ma.rodriguezs123456@uniandes.edu.co``` y ```contrsaeña: Prueba123456```_

### 5. Instalar dependencias para cypress
Acceder a la carpeta ```/PruebasAutomatizadas/RIPuppet/``` presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe reemplazar el valor de ```<YOUR_DIRECTORY_HERE>``` según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/RIPuppet/
```
Luego de esto, ejecutar el siguiente comando
```
npm install
```
### 6. Ejecutar el Ripper
Acceder a la carpeta ```/PruebasAutomatizadas/RIPuppet/``` presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe reemplazar el valor de ```<YOUR_DIRECTORY_HERE>``` según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/RIPuppet/
```
Luego de esto, ejecutar el siguiente comando
```
node index.js
```
Luego de ejecutar el comando, se abrirá un navegador web Chromium, en donde se deben ingresar los datos para el inicio de sesión. Este paso es requerido debido a que el Ripper no realiza de forma automática el inicio de sesión y este debe continuar con el análisis de las páginas, una vez que se encuentra autenticado. 

Los datos de inicio de sesión son:
```
email: ma.rodriguezs123456@uniandes.edu.co
contrsaeña: Prueba123456
```

## Pasos para la instalación y ejecución de pruebas E2E
### 1. Clonar el proyecto desde GitHub
Ubicarse en una ruta del PC y ejecutar el siguiente comando:

```
git clone https://github.com/mars192/PruebasAutomatizadas.git
```

### 2. Confirmar la versión de NodeJS
Para esta entrega se usa la versión v20.18.0 de NodeJS, por lo tanto, se debe ejecutar el siguiente comando para confirmar dicha versión:

```
node --version
```
### 3. Instalar dependencias para Ghost
Acceder a la carpeta ```/PruebasAutomatizadas/ghost/``` presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe remplazar el valor de ```<YOUR_DIRECTORY_HERE>``` según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/ghost/
```
Luego de esto, ejecutar el siguiente comando
```
npm install
```

### 4. Subir Ghost
Desde el directorio ```<YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/ghost/ghost/``` ejecutar el comando:
```
../node_modules/ghost-cli/bin/ghost start
```
_**Nota:** En caso de no utilizar los archivos de Ghost presentes en el repositorio de GitHub y con el objetivo de que las pruebas se ejecuten de forma exitosa, se debe crear un usuario adminsitrador con los datos: ```email: ma.rodriguezs123456@uniandes.edu.co``` y ```contrsaeña: Prueba123456```_

### 5. Instalar dependencias para cypress
Acceder a la carpeta ```/PruebasAutomatizadas/cypress/``` presente en el directorio que contiene el proyecto previamente clonado. Para esto puede usar el comando presentado acontinuación, en donde debe reemplazar el valor de ```<YOUR_DIRECTORY_HERE>``` según corresponda.
```
cd <YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/cypress/
```
Luego de esto, ejecutar el siguiente comando
```
npm install
```

### 6. Desplegar la ingerfaz gráfica de cypress
Desde el directorio ```<YOUR_DIRECTORY_HERE>/PruebasAutomatizadas/cypress/``` ejecutar el comando:
```
npm run cy:open
```
Luego de esto debe seleccionar/configurar la opcion _E2E Testing_ y finalmente seleccionar el navegador _Chrome_

### 7. Ejecutar pruebas
En la interfaz gráfica de cypress se ecuentra la sigueinte estructura:
```
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
```

Para ejecutar los casos de cada funcionalidad, se debe dar clic cobre el archivo ```.cy.js.```
