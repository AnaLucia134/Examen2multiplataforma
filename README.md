# TODO LIST APP - React Native con Expo

Aplicación móvil desarrollada con **React Native y Expo** que permite gestionar tareas pendientes de forma sencilla, organizada y con persistencia local.

---

## Características principales

- Agregar tareas
- Editar tareas
- Eliminar tareas
- Cambiar estado (Pendiente / Completada)
- Contador de tareas pendientes
- Orden automático (pendientes arriba)
- Persistencia de datos con AsyncStorage
- Interfaz moderna (modo oscuro)
- Footer con información del autor

---

## Tecnologías utilizadas

- React Native
- Expo
- React Navigation (Stack)
- AsyncStorage
- JavaScript (ES6)

---

## Instalación paso a paso

### 1. Clonar repositorio

```bash
git clone https://github.com/AnaLucia134/Examen2multiplataforma.git
cd Examen2multiplataforma

2. Instalar dependencias del proyecto
npm install

3. Instalar librerías necesarias
Navegación
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack

Dependencias requeridas por navegación
npx expo install react-native-screens
npx expo install react-native-safe-area-context

Persistencia
npx expo install @react-native-async-storage/async-storage

4. Ejecutar la aplicación
npx expo start