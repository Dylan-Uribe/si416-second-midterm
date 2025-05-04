<div>
  <img src="https://virtual.upsa.edu.bo/pluginfile.php/1/theme_lambda/logo/1744939487/logo%20UPSA-universidad-03.png" alt="Descripción de la imagen" width="100%" />
</div>

# Sistema de Gestión de Turnos para Clínica Odontológica
API GraphQL para la administración de turnos, pacientes y especialidades odontológicas.

## 📋 Descripción

Este proyecto implementa un backend completo para gestionar turnos médicos en una clínica odontológica, permitiendo:

- Registro y autenticación de usuarios administrativos
- Administración de pacientes
- Gestión de especialidades odontológicas
- Creación y seguimiento de turnos asociados a pacientes y especialidades

Desarrollado con Node.js, Apollo Server y MongoDB.

## 🚀 Tecnologías utilizadas

- **Node.js**: Entorno de ejecución
- **Apollo Server**: Servidor GraphQL
- **MongoDB**: Base de datos
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación mediante tokens
- **bcryptjs**: Encriptación de contraseñas
- **dotenv**: Manejo de variables de entorno

## 🏗️ Estructura del proyecto
```
.
├── config/
│   └── db.js              # Configuración y conexión a MongoDB
├── graphql/
│   ├── typeDefs.js        # Definición de tipos GraphQL
│   ├── resolvers.js       # Resolvers para queries y mutations
│   └── auth.js            # Funciones de autenticación
├── model/
│   ├── User.js            # Modelo de usuarios administrativos
│   ├── Patient.js         # Modelo de pacientes
│   ├── Specialty.js       # Modelo de especialidades
│   └── Appointment.js     # Modelo de turnos
├── index.js               # Punto de entrada - servidor Apollo
├── variables.env          # Variables de entorno (crear manualmente)
├── package.json           # Dependencias y scripts
└── README.md              # Este archivo
```

## 🔧 Instalación

### Requisitos previos
- Node.js
- MongoDB instalado localmente o una cuenta en MongoDB Atlas
- PNPM como gestor de paquetes

### Instalando PNPM
Si no tienes PNPM instalado:
```bash
npm install -g pnpm
```

### Configuración del proyecto
1. Clona este repositorio
```bash
git clone https://github.com/Dylan-Uribe/si416-second-midterm.git
cd si416-second-midterm/
```
2. Instala las dependencias usando pnpm
```bash
pnpm install
```
3. Crea manualmente un archivo `variables.env` en la raíz del proyecto con la siguiente estructura:
```
MONGO_URI=mongodb:tu_url_de_mongo_db
SECRET=tu_clave_secreta_para_tokens
```
<p align="center"><em>Cambia las credenciales según tu propia configuración.</em></p> <br>

De todas formas el proyecto incluye un template con esta configuración llamada: `variables.template.env`


## 🚀 Ejecución

Modo desarrollo
```bash
pnpm run dev
```

Modo producción
```bash
pnpm start
```

El servidor estará disponible por defecto en http://localhost:4000

## 📄 API GraphQL

### Principales Queries

- `me`: Obtiene el usuario autenticado
- `getPatients`: Lista todos los pacientes
- `getPatient(id)`: Obtiene un paciente específico
- `getSpecialties`: Lista todas las especialidades
- `getAppointments`: Lista todos los turnos
- `getAppointmentsByPatient(patientId)`: Obtiene los turnos de un paciente

### Principales Mutations

- `registerUser(input)`: Registra un nuevo usuario administrativo
- `login(input)`: Autentica un usuario y devuelve un token JWT
- `createPatient(input)`: Crea un nuevo paciente
- `createSpecialty(input)`: Crea una nueva especialidad
- `createAppointment(input)`: Asigna un nuevo turno

## 🔐 Autenticación

La mayoría de las operaciones requieren autenticación mediante un token JWT. Para realizar consultas autenticadas:

1. Usa la mutación `login` para obtener un token
2. Incluye el token en el header HTTP:

```json
{
  "Authorization": "OBTENIDO_DE_LOGIN"
}
```
<hr>
Desarrollado como parte del segundo parcial para la materia de Desarrollo Web - UPSA 2025.

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **Nombre**: Dylan Uribe
- **Correo**: a2022112008@estudiantes.upsa.edu.bo