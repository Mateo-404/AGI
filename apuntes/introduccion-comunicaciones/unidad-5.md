# Unidad 5 — Capa Física y Topologías

## 1. Topologías de red LAN

### Topología en estrella (Star)
- Todos los nodos se conectan a un dispositivo central (hub o switch).
- ✅ Fácil de instalar y administrar; fallo de un nodo no afecta a los demás.
- ❌ Dependencia del dispositivo central; mayor costo de cableado.

### Topología en bus (Bus)
- Todos los nodos comparten un mismo cable (backbone).
- ✅ Económica para redes pequeñas.
- ❌ Difícil de diagnosticar; fallo del backbone afecta a toda la red.

### Topología en anillo (Ring)
- Cada nodo se conecta a dos vecinos, formando un anillo.
- ✅ Rendimiento predecible; no hay colisiones.
- ❌ Fallo de un nodo o enlace puede romper el anillo (salvo anillo doble).

### Topología en malla (Mesh)
- Cada nodo se conecta a varios (o todos) los demás.
- ✅ Alta redundancia y tolerancia a fallos.
- ❌ Alto costo de implementación y complejidad.

### Topología en árbol (Tree)
- Jerarquía de estrellas conectadas entre sí.
- ✅ Escalable; fácil de expandir.
- ❌ Dependencia de los nodos raíz.

---

## 2. Cableado estructurado

### Estándar TIA/EIA-568
Define el cableado de telecomunicaciones en edificios comerciales.

### Tipos de cable de par trenzado

| Categoría | Ancho de banda | Uso típico |
|-----------|----------------|------------|
| Cat 5 | 100 MHz | Fast Ethernet (obsoleto) |
| Cat 5e | 100 MHz | Gigabit Ethernet |
| Cat 6 | 250 MHz | Gigabit / 10 Gbps (cortas distancias) |
| Cat 6a | 500 MHz | 10 Gbps |
| Cat 7 | 600 MHz | 10 Gbps (blindado) |
| Cat 8 | 2000 MHz | 25/40 Gbps (data center) |

### Conectores
- **RJ-45:** conector estándar para par trenzado.
- **T568A / T568B:** esquemas de cableado (directo o cruzado).

### Fibra óptica
- **Monomodo (Single-mode):** núcleo pequeño; largas distancias; láser.
- **Multimodo (Multi-mode):** núcleo mayor; cortas distancias; LED.
- **Conectores:** SC, LC, ST, MTP/MPO.

---

## 3. Dispositivos de conexión

- **Repetidor (Repeater):** regenera la señal en capa 1.
- **Hub:** repetidor multi-puerto.
- **Switch:** conmutador de capa 2 (y capa 3 en switches L3).
- **Router:** enrutador de capa 3.
- **Access Point (AP):** punto de acceso inalámbrico.
- **Módem:** modulador/demodulador para acceso a internet.

---

## 4. Estándares inalámbricos (IEEE 802.11)

| Estándar | Frecuencia | Velocidad máxima | Año |
|----------|------------|------------------|-----|
| 802.11b | 2.4 GHz | 11 Mbps | 1999 |
| 802.11g | 2.4 GHz | 54 Mbps | 2003 |
| 802.11n (Wi-Fi 4) | 2.4/5 GHz | 600 Mbps | 2009 |
| 802.11ac (Wi-Fi 5) | 5 GHz | 3.5 Gbps | 2013 |
| 802.11ax (Wi-Fi 6) | 2.4/5/6 GHz | 9.6 Gbps | 2019 |
| 802.11be (Wi-Fi 7) | 2.4/5/6 GHz | 46 Gbps | 2024 |

### Conceptos clave
- **SSID:** nombre de la red inalámbrica.
- **BSS (Basic Service Set):** conjunto de dispositivos conectados a un AP.
- **ESS (Extended Service Set):** múltiples BSS interconectados.
- **Ad hoc:** red sin AP (peer-to-peer inalámbrica).
- **Seguridad:** WEP (obsoleto), WPA, WPA2, WPA3.

---

## 5. Topologías inalámbricas

- **Infraestructura:** dispositivos se conectan a un AP.
- **Ad hoc / IBSS:** dispositivos se conectan directamente entre sí.
- **Mesh:** múltiples APs se interconectan para extender la cobertura.
- **Punto a punto (PtP):** enlace inalámbrico entre dos ubicaciones.
- **Punto a multipunto (PtMP):** un AP central conecta varios clientes remotos.
