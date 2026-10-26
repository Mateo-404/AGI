# Unidad 8 — Seguridad en Redes

## 1. Seguridad física

Protección de la infraestructura de hardware y del entorno donde opera la red.

### Medidas
- **Control de acceso físico:** cerraduras, tarjetas, biometría, guardias.
- **Seguridad ambiental:** UPS, climatización, detección de incendios, supresión de incendios (gas inerte).
- **Protección de equipos:** racks con llave, cableado oculto, etiquetado.
- **Respaldo de energía:** generadores, UPS, redundancia de fuentes.
- **Gestión de residuos:** destrucción segura de discos y documentos.

---

## 2. Seguridad lógica

Protección de datos, sistemas y comunicaciones mediante controles de software y políticas.

### Componentes
- **Autenticación:** verificar la identidad del usuario (contraseñas, MFA, certificados).
- **Autorización:** definir qué recursos puede acceder cada usuario (ACL, RBAC).
- **Confidencialidad:** cifrado de datos en tránsito y en reposo.
- **Integridad:** garantizar que los datos no sean alterados (hashes, firmas digitales).
- **Disponibilidad:** asegurar que los servicios estén accesibles (redundancia, DDoS mitigation).
- **No repudio:** imposibilidad de negar una acción (firmas digitales, logs).

---

## 3. Cifrado

### Cifrado simétrico
- **Una sola clave** para cifrar y descifrar.
- **Algoritmos:** AES, DES, 3DES, ChaCha20.
- **Uso:** cifrado de datos en reposo, VPN (IPsec), TLS (bulk encryption).
- **Desafío:** distribución segura de la clave.

### Cifrado asimétrico (clave pública)
- **Par de claves:** pública (cifra) y privada (descifra).
- **Algoritmos:** RSA, ECC, Diffie-Hellman.
- **Uso:** intercambio de claves, firmas digitales, certificados digitales.
- **Desafío:** mayor costo computacional.

### Hash y firmas digitales
- **Función hash:** produce un resumen de longitud fija (SHA-256, MD5).
- **Firma digital:** hash cifrado con la clave privada del emisor; verificable con la clave pública.
- **Certificado digital:** asocia una clave pública a una identidad (emitido por una CA).

### TLS/SSL
- Protocolo que proporciona cifrado y autenticación en la capa de transporte.
- Usado en HTTPS, FTPS, SMTPS, etc.
- **Handshake:** negociación de algoritmos, intercambio de claves, verificación de certificados.

---

## 4. Protección contra malware

### Tipos de malware
- **Virus:** se adjunta a archivos; se propaga al ejecutarlos.
- **Gusano (Worm):** se propaga por la red sin intervención del usuario.
- **Troyano:** se disfraza de software legítimo; abre puertas traseras.
- **Ransomware:** cifra archivos y exige rescate.
- **Spyware:** espía la actividad del usuario.
- **Adware:** muestra publicidad no deseada.
- **Rootkit:** oculta la presencia del atacante en el sistema.
- **Botnet:** red de equipos comprometidos controlados remotamente.

### Medidas de protección
- **Antivirus / EDR:** detección y eliminación de malware.
- **Firewall:** filtrado de tráfico por reglas.
- **IDS/IPS:** detección/prevención de intrusiones.
- **Sandboxing:** ejecución aislada de software sospechoso.
- **Parcheo:** actualización de sistemas y aplicaciones.
- **Principio de mínimo privilegio:** usuarios solo acceden a lo necesario.
- **Backup:** copias de seguridad regulares (regla 3-2-1).

---

## 5. Políticas de monitoreo

### Monitoreo de red
- **SNMP (Simple Network Management Protocol):** gestión y monitoreo de dispositivos.
- **NetFlow / sFlow:** análisis de tráfico.
- **Syslog:** registro de eventos de sistemas.
- **SIEM (Security Information and Event Management):** correlación de eventos de seguridad.

### Políticas de seguridad
- **Política de contraseñas:** complejidad, rotación, MFA.
- **Política de acceso:** control de acceso basado en roles (RBAC).
- **Política de actualización:** parcheo regular de sistemas.
- **Política de backup:** frecuencia, retención, pruebas de restauración.
- **Política de respuesta a incidentes:** procedimientos ante brechas de seguridad.
- **Política de uso aceptable:** reglas para el uso de recursos de red.

### Auditoría y cumplimiento
- **Logs de auditoría:** registro de accesos y cambios.
- **Vulnerability scanning:** escaneo de vulnerabilidades.
- **Penetration testing:** pruebas de penetración.
- **Cumplimiento normativo:** ISO 27001, GDPR, PCI-DSS, etc.

---

## 6. Amenazas comunes

- **Phishing:** engaño para obtener credenciales.
- **Man-in-the-Middle (MitM):** interceptación de comunicaciones.
- **DDoS (Distributed Denial of Service):** saturación de servicios.
- **SQL Injection:** inyección de código en bases de datos.
- **XSS (Cross-Site Scripting):** inyección de scripts en páginas web.
- **Brute Force:** intentos masivos de adivinar contraseñas.
- **Social Engineering:** manipulación psicológica.
- **Zero-day:** explotación de vulnerabilidades desconocidas.

---

## 7. Medidas de protección en redes

- **Firewall:** filtrado de paquetes, stateful inspection, NGFW.
- **VPN:** túnel cifrado para acceso remoto (IPsec, SSL/TLS).
- **NAC (Network Access Control):** control de acceso a la red.
- **Segmentación:** VLANs, microsegmentación, zonas desmilitarizadas (DMZ).
- **Zero Trust:** "nunca confiar, siempre verificar".
- **Backup y recuperación:** plan de continuidad del negocio (BCP/DRP).
- **Concientización:** capacitación de usuarios en seguridad.
