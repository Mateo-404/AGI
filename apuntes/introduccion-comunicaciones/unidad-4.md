# Unidad 4 — Redes de Área Local (LAN)

## 1. Estándar Ethernet

Ethernet (IEEE 802.3) es el estándar dominante para redes de área local cableadas. Define el formato de la trama, el método de acceso al medio y las características físicas.

### Formato de la trama Ethernet (IEEE 802.3)

| Campo | Tamaño | Descripción |
|-------|--------|-------------|
| Preámbulo | 7 bytes | Sincronización |
| SFD (Start Frame Delimiter) | 1 byte | Inicio de trama |
| Dirección MAC destino | 6 bytes | Destinatario |
| Dirección MAC origen | 6 bytes | Remitente |
| Tipo / Longitud | 2 bytes | Protocolo o longitud del payload |
| Datos (payload) | 46–1500 bytes | Información útil |
| FCS (Frame Check Sequence) | 4 bytes | CRC para detección de errores |

- **MTU (Maximum Transmission Unit):** 1500 bytes de datos.
- **Dirección MAC:** 48 bits (6 bytes), representada en hexadecimal (ej.: 00:1A:2B:3C:4D:5E).

---

## 2. Control de acceso al medio: CSMA/CD

**CSMA/CD** (Carrier Sense Multiple Access with Collision Detection) es el método de acceso utilizado en Ethernet clásico (half-duplex).

### Funcionamiento
1. **Carrier Sense:** el nodo escucha el medio antes de transmitir.
2. **Multiple Access:** varios nodos comparten el mismo medio.
3. **Collision Detection:** si dos nodos transmiten simultáneamente, se detecta la colisión.
4. **Jam Signal:** se envía una señal de atasco para notificar la colisión.
5. **Backoff exponencial:** los nodos esperan un tiempo aleatorio antes de reintentar.

### Limitaciones
- CSMA/CD solo funciona en **half-duplex**.
- En redes modernas con switches (full-duplex), **no hay colisiones** y CSMA/CD se desactiva.

---

## 3. Métodos de acceso al medio

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| **CSMA/CD** | Detección de colisiones | Ethernet clásico |
| **CSMA/CA** | Evitación de colisiones | Wi-Fi (802.11) |
| **Token Passing** | Token circula entre nodos | Token Ring, FDDI |

---

## 4. Dispositivos de interconexión LAN

- **NIC (Network Interface Card):** tarjeta de red; conecta el dispositivo al medio.
- **Hub:** repetidor multi-puerto; dominio de colisión único (obsoleto).
- **Switch:** conmutador de capa 2; cada puerto es un dominio de colisión separado; aprende direcciones MAC.
- **Bridge:** conecta segmentos de red; filtra por MAC.
- **Router:** conecta redes diferentes; opera en capa 3.

---

## 5. Topologías lógicas vs. físicas

- **Topología física:** disposición real de cables y dispositivos.
- **Topología lógica:** forma en que los datos fluyen por la red.

Ethernet usa topología física de **estrella** (con switch) pero topología lógica de **bus** (en el sentido de medio compartido en half-duplex).

---

## 6. Direccionamiento MAC

- **OUI (Organizationally Unique Identifier):** primeros 3 bytes identifican al fabricante.
- **NIC (Network Interface Controller):** últimos 3 bytes identifican la tarjeta.
- **Broadcast:** FF:FF:FF:FF:FF:FF.
- **Multicast:** bit menos significativo del primer byte en 1.

---

## 7. Velocidades Ethernet

| Estándar | Velocidad | Medio |
|----------|-----------|-------|
| 10BASE-T | 10 Mbps | Par trenzado |
| 100BASE-TX (Fast Ethernet) | 100 Mbps | Par trenzado |
| 1000BASE-T (Gigabit Ethernet) | 1 Gbps | Par trenzado |
| 10GBASE-T | 10 Gbps | Par trenzado (Cat 6a/7) |
| 100GBASE | 100 Gbps | Fibra óptica |
