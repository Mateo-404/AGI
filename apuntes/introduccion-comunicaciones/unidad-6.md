# Unidad 6 — Modelo TCP/IP

## 1. Introducción

El **modelo TCP/IP** (también llamado modelo de Internet) es el conjunto de protocolos que sustenta la comunicación en Internet. A diferencia del modelo OSI (7 capas), TCP/IP organiza la comunicación en **4 capas**.

## 2. Las cuatro capas del modelo TCP/IP

### Capa de acceso a la red (Network Access / Link)
- **Función:** entrega de datos en el mismo enlace físico; encapsulación en tramas.
- **Protocolos:** Ethernet, Wi-Fi, PPP, ARP.
- **Equivalente OSI:** capas 1 y 2.

### Capa de Internet (Interred / Internet)
- **Función:** direccionamiento lógico y enrutamiento de paquetes entre redes.
- **Protocolo principal:** **IP** (Internet Protocol).
- **Protocolos auxiliares:** ICMP, ARP, IGMP.
- **Equivalente OSI:** capa 3.

### Capa de transporte
- **Función:** comunicación extremo a extremo; control de flujo y de errores.
- **Protocolos:** TCP y UDP.
- **Equivalente OSI:** capa 4.

### Capa de aplicación
- **Función:** servicios de red a las aplicaciones del usuario.
- **Protocolos:** HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SNMP, Telnet, SSH.
- **Equivalente OSI:** capas 5, 6 y 7.

---

## 3. Protocolo IP

### IPv4
- **Dirección:** 32 bits (4 bytes), representada en notación decimal con puntos (ej.: 192.168.1.1).
- **Clases (histórico):**
  - Clase A: 1.0.0.0 – 126.255.255.255 (máscara /8)
  - Clase B: 128.0.0.0 – 191.255.255.255 (máscara /16)
  - Clase C: 192.0.0.0 – 223.255.255.255 (máscara /24)
  - Clase D: multicast (224.0.0.0 – 239.255.255.255)
  - Clase E: experimental (240.0.0.0 – 255.255.255.255)
- **Direcciones privadas (RFC 1918):**
  - 10.0.0.0/8
  - 172.16.0.0/12
  - 192.168.0.0/16
- **Loopback:** 127.0.0.0/8 (localhost: 127.0.0.1).
- **Broadcast limitado:** 255.255.255.255.

### IPv6
- **Dirección:** 128 bits (16 bytes), representada en hexadecimal con dos puntos (ej.: 2001:db8::1).
- **Tipos:**
  - Unicast (global, link-local, unique local)
  - Multicast (ff00::/8)
  - Anycast
- **No tiene broadcast** (se usa multicast).
- **Autoconfiguración:** SLAAC (Stateless Address Autoconfiguration).
- **DHCPv6:** asignación stateful.

---

## 4. Subnetting y CIDR

### CIDR (Classless Inter-Domain Routing)
Notación que indica la cantidad de bits de red: `IP/prefijo` (ej.: 192.168.1.0/24).

### Cálculo de subredes
- **Máscara de subred:** bits en 1 = porción de red; bits en 0 = porción de host.
- **Dirección de red:** AND bit a bit entre IP y máscara.
- **Broadcast de subred:** bits de host en 1.
- **Hosts utilizables:** 2^(bits de host) – 2.

### Ejemplo
Red 192.168.1.0/24:
- Máscara: 255.255.255.0
- Hosts: 2⁸ – 2 = 254
- Rango de hosts: 192.168.1.1 – 192.168.1.254
- Broadcast: 192.168.1.255

---

## 5. Protocolos de transporte

### TCP (Transmission Control Protocol)
- **Orientado a conexión:** establece sesión (three-way handshake: SYN, SYN-ACK, ACK).
- **Fiable:** retransmisión de paquetes perdidos, control de flujo, control de congestión.
- **Orden:** entrega en orden.
- **Uso:** HTTP, HTTPS, FTP, SMTP, SSH.

### UDP (User Datagram Protocol)
- **No orientado a conexión:** no establece sesión.
- **No fiable:** sin retransmisión ni control de flujo.
- **Sin orden garantizado.**
- **Uso:** DNS, DHCP, VoIP, streaming, juegos online.

### Puertos conocidos (well-known ports)
| Puerto | Protocolo | Servicio |
|--------|-----------|----------|
| 20/21 | TCP | FTP |
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | TCP/UDP | DNS |
| 67/68 | UDP | DHCP |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 |
| 143 | TCP | IMAP |
| 443 | TCP | HTTPS |

---

## 6. Protocolos de aplicación

- **HTTP/HTTPS:** transferencia de hipertexto (web).
- **FTP:** transferencia de archivos.
- **SMTP/POP3/IMAP:** correo electrónico.
- **DNS:** resolución de nombres de dominio a direcciones IP.
- **DHCP:** asignación automática de direcciones IP.
- **SNMP:** gestión de red.
- **SSH:** acceso remoto seguro.
- **Telnet:** acceso remoto (sin cifrado, obsoleto).

---

## 7. ARP y resolución de direcciones

- **ARP (Address Resolution Protocol):** resuelve direcciones IP a direcciones MAC en la red local.
- **Proceso:** broadcast ARP request → respuesta unicast ARP reply.
- **Tabla ARP:** caché de mapeos IP-MAC.

---

## 8. ICMP y diagnóstico

- **ICMP (Internet Control Message Protocol):** mensajes de control y error.
- **ping:** prueba de conectividad (echo request/reply).
- **traceroute/tracert:** traza la ruta de los paquetes.

---

## 9. Comparación OSI vs. TCP/IP

| OSI (7 capas) | TCP/IP (4 capas) |
|---------------|------------------|
| 7 Aplicación | Aplicación |
| 6 Presentación | Aplicación |
| 5 Sesión | Aplicación |
| 4 Transporte | Transporte |
| 3 Red | Internet |
| 2 Enlace | Acceso a la red |
| 1 Física | Acceso a la red |

TCP/IP es el modelo práctico de Internet; OSI es un modelo de referencia teórico.
