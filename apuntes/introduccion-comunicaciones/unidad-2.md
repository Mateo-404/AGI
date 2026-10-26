# Unidad 2 — Fundamentos de Redes

## 1. Definición y usos de las redes de datos

### Red
Conjunto de dos o más **dispositivos conectados entre sí** con el fin de **compartir información, datos, recursos y servicios**.

### ¿Qué comparten las redes?
- **Información / Datos:** archivos, carpetas, programas, bases de datos, correo electrónico.
- **Servicios:** mensajería, acceso a internet, correo electrónico, scheduling.
- **Recursos de hardware:** impresoras, escáneres, módems, unidades de disco.

### Argumentos para implementar una red
- **Reducción de costos:** compartir hardware evita duplicar equipos costosos.
- **Compartir información:** acceso centralizado y colaborativo a datos.
- **Trabajo en equipo:** comunicación interna y coordinación entre usuarios.

---

## 2. Filosofía cliente–servidor

### Principio fundamental
En toda interacción en red, una computadora actúa como **cliente** y otra como **servidor**.

- **Cliente:** computadora que **solicita** un servicio o **utiliza recursos** (hardware, archivos, programas) de otras computadoras de la red.
- **Servidor:** computadora que **brinda** servicios o recursos a otras computadoras de la red; habitualmente con hardware más potente.

> **Regla mnemónica:** quien **solicita** = cliente / quien **brinda** = servidor.

⚠️ Algunas computadoras pueden jugar **ambos roles**, pero se recomienda usar sistemas operativos especializados para optimizar recursos.

---

## 3. Sistemas operativos según rol

### SO para clientes
- **Windows corriente:** Windows 8, Windows 7, Windows XP Professional.
- **SO cliente dedicado (legacy):** Windows 2000 Professional, Windows NT 4.0 WorkStation.

### SO para servidores
- **Microsoft:** Windows Server 2012, 2008, 2003, 2000 / Windows NT 4.0 Server.
- **Linux**
- **Novell:** Novell Netware 5.0
- **Unix**
- **Lantastic**

⚠️ Los servidores requieren **mayor capacidad** de hardware: más procesadores, más RAM (mínimo **2 GB** para Windows Server 2008), mayor almacenamiento.

---

## 4. Tipos de servidores

### Por dedicación
- **Centralizado:** realiza **todas** las tareas; único servidor de la red; apto solo para **pequeñas empresas** con poco tráfico; actúa como servidor de usuarios, internet e impresión simultáneamente.
- **Dedicado:** se especializa en **una sola función** específica; solo recibe una parte del trabajo total de la red.
- **No dedicado:** además de brindar servicios, también es **utilizado como cliente**; algún usuario trabaja directamente en él.

### Tipos de servidores dedicados
- **Servidor de usuarios:** administra **permisos**, valida el ingreso, establece políticas de acceso por grupos e individuos y controla el acceso a recursos.
- **Servidor de archivos:** atiende pedidos de acceso a **almacenamiento masivo**; operaciones: leer, escribir, copiar, modificar, crear, mover, ejecutar; puede establecer **cuotas por usuario**.
- **Servidor de impresión:** administra solicitudes de impresión mediante una **cola de espera**; ordena la impresora según el orden solicitado.
- **Servidor de comunicaciones:** (gateway, proxy) recibe pedidos de transmisión entre redes distintas; **traduce** entre redes (entre sucursales o hacia internet).
- **Servidor de back up de usuarios:** mantiene una **copia actualizada** de permisos; ante falla del servidor de usuarios, lo **reemplaza automáticamente**.
- **Servidor de back up de archivos:** almacena **copias de respaldo** de archivos críticos según políticas de seguridad; hardware especial para almacenamiento duplicado.

---

## 5. Clasificación de redes — Por tamaño / alcance

- **LAN (Local Area Network):** red de **área local**; se extiende en un **edificio o edificios contiguos**; la organización es **propietaria** de todos los elementos de interconexión (cables, placas de red, etc.).
- **MAN (Metropolitan Area Network):** red de **área metropolitana**; interconecta usuarios en **distintos puntos de una ciudad**; parte de los elementos de interconexión son **alquilados** (ej.: líneas telefónicas).
- **WAN (Wide Area Network):** red de **área extensa**; supera los límites de una ciudad; conecta sedes en **distintas ciudades o países**; dispositivos de interconexión habitualmente **alquilados** (telefónicas o satelitales).

### Otras clasificaciones por tamaño
- **PAN (Personal Area Network):** alcanza el espacio de **dispositivos personales** (celular, PDA, audio); medio habitual: **Bluetooth**.
- **WLAN (Wireless LAN):** red de área local **inalámbrica**; alternativa o complemento de la LAN cableada.
- **VLAN (Virtual LAN):** dispositivos en **distintas ubicaciones físicas** dentro de una LAN que se comunican como si estuvieran en una sola división lógica; se logra dividiendo conmutadores en **virtuales**.
- **CAN (Campus Area Network):** conecta LANs en un **área geográfica limitada** (campus, hospital, base militar) con medios propios y alta velocidad.

### Flashcard — diferencia clave LAN / MAN / WAN
- **LAN:** infraestructura **propia**, edificio o edificios contiguos.
- **MAN:** infraestructura **parcialmente alquilada**, ciudad.
- **WAN:** infraestructura **alquilada**, entre ciudades o países.

---

## 6. Clasificación de redes — Por administración de recursos

### Red Peer to Peer (P2P)
Red en la que **cada usuario administra sus propios recursos**; no hay jerarquía; cualquier equipo puede ser cliente y servidor simultáneamente.

**Características principales:**
- **Administración:** cada **usuario** administra sus propios recursos.
- **Seguridad:** nivel **muy bajo** (cada usuario decide qué comparte).
- **Costo:** **bajo** — no requiere servidor extra ni SO especial.
- **SO requerido:** Windows 8, 7, XP, 98 o Lantastic — **económicos**.
- **Escala recomendada:** hasta **10–12 usuarios** en ámbito físico limitado; criterio real = **bajo tráfico**.
- **Hardware:** las computadoras existentes no requieren cambios importantes.

**✅ Ventajas P2P:**
- Sin costo de servidor dedicado.
- SO económico.
- Hardware sin modificaciones.
- Implementación sencilla.

**❌ Desventajas P2P:**
- Seguridad muy baja.
- No escala bien (muchos usuarios → comunicaciones lentas).
- Requiere capacitar a usuarios para administrar sus recursos.

### Red basada en servidor
La prestación de servicios se **centraliza en uno o más servidores**; administrada por un **administrador de red** especializado.

**Características principales:**
- **Administración:** **administrador de red** centraliza la gestión.
- **Seguridad:** nivel **alto** — define qué usuario accede a qué recursos; puede limitar acceso hasta nivel de usuario individual.
- **SO:** sistemas operativos **especiales de servidor** (más sólidos/estables).
- **Monitoreo:** los administradores pueden ver **toda la actividad** de usuarios.
- **Hardware servidores:** muy superiores a clientes (multiprocesador, **16 GB RAM**, gran almacenamiento).
- **Escalabilidad:** recomendada para **muchos usuarios** o **alto tráfico**.

⚠️ "Red basada en servidor" **no implica un único servidor** — puede haber varios dedicados a distintas funciones (mail, archivos, impresión, internet…).

**✅ Ventajas basada en servidor:**
- Alta seguridad centralizada.
- SO estable (servidores pueden funcionar sin apagarse).
- Herramientas de gestión y respaldo integradas.
- Escala a muchos usuarios.

**❌ Desventajas basada en servidor:**
- Mayor costo (hardware potente + SO de servidor).
- Requiere administrador especializado.

---

## 7. Comparación P2P vs. basada en servidor

| Criterio | P2P | Basada en servidor |
|----------|-----|-------------------|
| **Seguridad** | Administrada por cada usuario → nivel **bajo** | Administrada por **administradores** → nivel **alto** |
| **Costo** | **Bajo** (sin servidor dedicado, SO económico) | **Alto** (hardware potente + SO especial) |
| **Escala** | Recomendada para **bajo tráfico** (≤ 10–12 usuarios orientativamente) | Recomendada para **alto tráfico** o muchos usuarios |
| **Administración** | Los mismos **usuarios** | **Administrador de red** especializado |

> 💡 Para determinar el tipo de red en un caso práctico: primero clasificar **por tamaño** (LAN/MAN/WAN) y luego **por administración** (P2P o basada en servidor según cantidad de usuarios y nivel de tráfico esperado).

⚠️ La cantidad de usuarios conectados **no determina** si es LAN, MAN o WAN — eso lo determina la **extensión geográfica**.
