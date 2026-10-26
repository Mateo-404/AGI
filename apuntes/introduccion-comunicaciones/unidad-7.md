# Unidad 7 — Diseño e Innovación

## 1. Fases de diseño de una red

### Fase 1 — Análisis de requisitos
- Identificar necesidades del cliente/organización.
- Determinar número de usuarios, aplicaciones, tráfico esperado.
- Definir restricciones: presupuesto, tiempo, normativas.

### Fase 2 — Diseño lógico
- Seleccionar topología, protocolos, direccionamiento IP.
- Diseñar esquema de subredes y VLANs.
- Definir políticas de seguridad y QoS.

### Fase 3 — Diseño físico
- Seleccionar equipos (routers, switches, APs, cableado).
- Planificar ubicación de dispositivos y cableado estructurado.
- Considerar redundancia y tolerancia a fallos.

### Fase 4 — Implementación
- Instalación de hardware y cableado.
- Configuración de equipos y protocolos.
- Pruebas de conectividad y rendimiento.

### Fase 5 — Monitoreo y mantenimiento
- Supervisión continua (SNMP, dashboards).
- Actualización de firmware y parches.
- Escalabilidad futura.

---

## 2. Análisis de solicitud de red

### Componentes del análisis
- **Alcance:** qué se incluye y qué no.
- **Usuarios:** cantidad, perfiles, ubicaciones.
- **Aplicaciones:** tipos, requisitos de ancho de banda y latencia.
- **Datos:** volumen, sensibilidad, respaldo.
- **Presupuesto:** CAPEX (inversión inicial) y OPEX (operación).
- **Cronograma:** plazos de entrega.

### Preguntas clave
- ¿Cuántos usuarios concurrentes habrá?
- ¿Qué aplicaciones son críticas?
- ¿Se necesita alta disponibilidad (HA)?
- ¿Qué nivel de seguridad se requiere?
- ¿Hay restricciones de espacio o energía?

---

## 3. IoT (Internet of Things)

### Concepto
Red de dispositivos físicos ("cosas") equipados con sensores, software y conectividad que les permite recopilar e intercambiar datos.

### Componentes de un sistema IoT
- **Dispositivos / Sensores:** recopilan datos del entorno.
- **Conectividad:** Wi-Fi, Bluetooth, Zigbee, LoRa, NB-IoT, 5G.
- **Plataforma / Cloud:** procesamiento y almacenamiento.
- **Aplicación:** interfaz para el usuario y automatización.

### Aplicaciones
- **Smart Home:** domótica, iluminación, climatización.
- **Industria 4.0:** mantenimiento predictivo, control de procesos.
- **Ciudades inteligentes:** tráfico, alumbrado, residuos.
- **Salud:** wearables, monitoreo remoto de pacientes.
- **Agricultura:** sensores de humedad, riego automatizado.

### Desafíos
- **Seguridad:** dispositivos vulnerables, falta de actualizaciones.
- **Escalabilidad:** millones de dispositivos conectados.
- **Interoperabilidad:** estándares diversos.
- **Privacidad:** datos personales y sensibles.

### Protocolos IoT
- **MQTT:** mensajería ligera publicador/suscriptor.
- **CoAP:** protocolo web para dispositivos restringidos.
- **AMQP:** mensajería empresarial.
- **HTTP/REST:** APIs web estándar.
- **LoRaWAN:** redes de área amplia de bajo consumo.

---

## 4. Tendencias e innovación en redes

- **SDN (Software-Defined Networking):** separación del plano de control y datos; programabilidad centralizada.
- **NFV (Network Functions Virtualization):** virtualización de funciones de red (firewalls, balanceadores).
- **Cloud Networking:** redes definidas por software en la nube.
- **Edge Computing:** procesamiento en el borde de la red para reducir latencia.
- **5G / 6G:** alta velocidad, baja latencia, massive IoT.
- **Zero Trust:** seguridad basada en identidad, no en perímetro.
- **AI/ML en redes:** detección de anomalías, optimización automática.
