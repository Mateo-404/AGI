# Unidad 3 — Modelo de Referencia OSI

## 1. Introducción

El **Modelo de Referencia OSI** (Open Systems Interconnection) es un estándar desarrollado por la ISO que describe cómo se comunican los sistemas en una red mediante **siete capas**. Cada capa cumple una función específica y se comunica con la capa inmediatamente superior e inferior.

## 2. Las siete capas del modelo OSI

### Capas de acceso (bajas)

#### Capa 1 — Física
- **Función:** transmisión de bits a través del medio físico (cables, fibra, ondas).
- **Define:** voltajes, temporización, distancias, conectores, codificación de señales.
- **Dispositivos:** repetidores, hubs, cables, NIC (tarjeta de red).
- **Estándares:** Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), Bluetooth.

#### Capa 2 — Enlace de datos
- **Función:** transmisión fiable de tramas entre nodos adyacentes; control de acceso al medio (MAC).
- **Define:** formato de trama, direccionamiento físico (MAC), detección de errores (CRC).
- **Subcapas:** LLC (Logical Link Control) y MAC (Media Access Control).
- **Dispositivos:** switches, bridges.
- **Protocolos:** Ethernet, PPP, HDLC, Wi-Fi (802.11).

### Capas medias

#### Capa 3 — Red
- **Función:** direccionamiento lógico y enrutamiento de paquetes entre redes distintas.
- **Define:** direccionamiento IP, enrutamiento, fragmentación.
- **Dispositivos:** routers.
- **Protocolos:** IP, ICMP, ARP, OSPF, BGP.

#### Capa 4 — Transporte
- **Función:** comunicación extremo a extremo; control de flujo y de errores; multiplexación de puertos.
- **Protocolos:** TCP (orientado a conexión, fiable) y UDP (no orientado a conexión, no fiable).
- **Conceptos clave:** puertos, segmentos, control de congestión.

### Capas superiores

#### Capa 5 — Sesión
- **Función:** establecimiento, gestión y terminación de sesiones entre aplicaciones.
- **Conceptos:** sincronización, puntos de control, diálogo (simplex, half-duplex, full-duplex).
- **Protocolos:** NetBIOS, RPC, PPTP.

#### Capa 6 — Presentación
- **Función:** traducción, cifrado y compresión de datos; asegura que la información sea legible para la aplicación receptora.
- **Conceptos:** codificación de caracteres (ASCII, Unicode), cifrado (SSL/TLS), compresión (JPEG, MPEG).
- **Protocolos:** TLS/SSL, MIME.

#### Capa 7 — Aplicación
- **Función:** interfaz entre la red y las aplicaciones del usuario; proporciona servicios de red a las aplicaciones.
- **Protocolos:** HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, SNMP, Telnet.

---

## 3. Encapsulamiento

Cada capa agrega su propia cabecera (y a veces cola) a los datos recibidos de la capa superior, formando una nueva unidad de datos:

| Capa | Unidad de datos | Cabecera agregada |
|------|-----------------|-------------------|
| 7 Aplicación | Datos | — |
| 6 Presentación | Datos | — |
| 5 Sesión | Datos | — |
| 4 Transporte | Segmento / Datagrama | Cabecera TCP/UDP (puertos) |
| 3 Red | Paquete | Cabecera IP (direcciones lógicas) |
| 2 Enlace | Trama | Cabecera MAC + cola (FCS) |
| 1 Física | Bit | Codificación física |

En el receptor, el proceso se invierte (desencapsulamiento): cada capa retira su cabecera y pasa los datos a la capa superior.

---

## 4. Comunicación entre capas

- **Comunicación vertical:** entre capas adyacentes dentro del mismo dispositivo (interfaz).
- **Comunicación horizontal:** entre capas equivalentes en dispositivos diferentes (protocolo).

---

## 5. Dispositivos por capa

| Capa | Dispositivos típicos |
|------|----------------------|
| 1 Física | Hub, repetidor, cable, NIC |
| 2 Enlace | Switch, bridge |
| 3 Red | Router |
| 4 Transporte | Firewall (stateful), load balancer |
| 5-7 | Gateway de aplicación, proxy |

---

## 6. Resumen de funciones por capa

| Capa | Función principal |
|------|-------------------|
| 7 Aplicación | Servicios de red al usuario |
| 6 Presentación | Formato, cifrado, compresión |
| 5 Sesión | Gestión de sesiones |
| 4 Transporte | Entrega extremo a extremo, puertos |
| 3 Red | Enrutamiento, direccionamiento lógico |
| 2 Enlace | Tramas, direccionamiento físico, MAC |
| 1 Física | Transmisión de bits por el medio |
