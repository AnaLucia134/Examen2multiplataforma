@"
# Documento Técnico

## Aplicación TODO LIST en React Native

---

## Descripción general

La aplicación consiste en un sistema de gestión de tareas desarrollado en React Native con Expo, que permite al usuario agregar, visualizar, editar y eliminar tareas, así como cambiar su estado.

Se implementó persistencia local mediante AsyncStorage y navegación mediante Stack Navigation.

---

## Pantallas

### Pantalla principal
- Muestra lista de tareas
- Permite eliminar tareas
- Permite cambiar estado rápidamente
- Botón para agregar nuevas tareas

### Pantalla agregar tarea
- Permite ingresar título, materia, fecha y estado
- Valida datos antes de guardar
- Regresa al Home al guardar

### Pantalla detalle
- Permite editar todos los campos
- Permite cambiar estado
- Guarda cambios y regresa al Home

---

## Componentes reutilizables

### TaskCard
- Muestra cada tarea
- Permite interacción rápida

### CustomButton
- Botones reutilizables con estilos consistentes

---

## Persistencia

Se utiliza AsyncStorage para guardar tareas localmente.

- useEffect carga datos al iniciar
- useEffect guarda cambios automáticamente

---

## Navegación

Se utiliza Stack Navigation:

- Home → AddTask
- Home → TaskDetail
- AddTask → Home
- TaskDetail → Home

---

## Tecnologías utilizadas

- React Native
- Expo
- AsyncStorage
- React Navigation

---

## Conclusión

El proyecto cumple con todos los requerimientos del examen, implementando correctamente navegación, persistencia, reutilización de componentes y manejo de estado.
"@ | Set-Content tecnico.md