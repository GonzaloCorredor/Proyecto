
/* 1. Usuarios y Preferencias */

-- 1.1 Registrar usuario 
-- (password_hash se genera en Node con bcrypt)
INSERT INTO Usuario (nombre, apellidos, email, password_hash)
VALUES (?, ?, ?, ?);

-- 1.2 Comprobar si un email ya existe
SELECT id_usuario FROM Usuario WHERE email = ?;

-- 1.3 Login: obtener usuario por email        
-- (en Node se compara password con bcrypt.compare)
SELECT id_usuario, nombre, apellidos, email, password_hash
FROM Usuario
WHERE email = ? AND estado = TRUE;

-- 1.4 Consultar datos de un usuario
SELECT u.id_usuario, u.nombre, u.apellidos, u.email, u.fecha_registro,
p.idioma, p.moneda, p.notificaciones
FROM Usuario u
LEFT JOIN Preferencias p ON p.id_usuario = u.id_usuario
WHERE u.id_usuario = ?;

-- 1.5 Modificar datos del usuario
UPDATE Usuario
SET nombre = ?, apellidos = ?
WHERE id_usuario = ?;

-- 1.6 Crear o actualizar preferencias
-- (id_usuario es UNIQUE en Preferencias, por eso funciona el upsert)
INSERT INTO Preferencias (id_usuario, idioma, moneda, notificaciones)
VALUES (?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
idioma = VALUES(idioma),
moneda = VALUES(moneda),
notificaciones = VALUES(notificaciones);

-- 1.7 Dar de baja usuario (borrado lógico)
UPDATE Usuario SET estado = FALSE WHERE id_usuario = ?;


/* 2. Hoteles */

-- 2.1 Listar todos los hoteles con su precio más bajo
SELECT h.id_hotel, h.nombre, h.ciudad, h.direccion, h.valoracion,
MIN(o.precio) AS precio_desde
FROM Hotel h
LEFT JOIN Oferta o ON o.id_hotel = h.id_hotel
GROUP BY h.id_hotel
ORDER BY h.valoracion DESC;

-- 2.2 Detalle de un hotel                     
SELECT h.*, p.nombre AS proveedor
FROM Hotel h
JOIN Proveedor p ON p.id_proveedor = h.id_proveedor
WHERE h.id_hotel = ?;

-- 2.3 Servicios de un hotel
SELECT s.id_servicio, s.nombre
FROM Hotel_servicio hs
JOIN Servicio s ON s.id_servicio = hs.id_servicio
WHERE hs.id_hotel = ?;

-- 2.4 BUSCAR hoteles con filtros
-- Parámetros: ciudad, precio mínimo, precio máximo, valoración mínima
SELECT h.id_hotel, h.nombre, h.ciudad, h.valoracion,
MIN(o.precio) AS precio_desde
FROM Hotel h
JOIN Oferta o ON o.id_hotel = h.id_hotel
WHERE h.ciudad LIKE CONCAT('%', ?, '%')
AND h.valoracion >= ?
GROUP BY h.id_hotel
HAVING precio_desde BETWEEN ? AND ?
ORDER BY precio_desde ASC;

-- 2.5 Buscar hoteles que tengan TODOS los servicios pedidos
--(ej.: wifi + piscina + parking)
SELECT h.id_hotel, h.nombre, h.ciudad, h.valoracion
FROM Hotel h
JOIN Hotel_servicio hs ON hs.id_hotel = h.id_hotel
WHERE h.ciudad LIKE CONCAT('%', ?, '%')
  AND hs.id_servicio IN (?)
GROUP BY h.id_hotel
HAVING COUNT(DISTINCT hs.id_servicio) = ?;

-- 2.6 Crear hotel
INSERT INTO Hotel (id_proveedor, nombre, direccion, ciudad, valoracion, descripcion)
VALUES (?, ?, ?, ?, ?, ?);

-- 2.7 Asignar servicio a un hotel
INSERT IGNORE INTO Hotel_servicio (id_hotel, id_servicio) VALUES (?, ?);

-- 2.8 Modificar hotel
UPDATE Hotel
SET id_proveedor = ?, nombre = ?, direccion = ?, ciudad = ?,
    valoracion = ?, descripcion = ?
WHERE id_hotel = ?;

-- 2.9 Eliminar hotel
-- (Hotel_servicio, Favoritos y Alertas se borran solos por ON DELETE CASCADE.
DELETE FROM Oferta WHERE id_hotel = ?;
DELETE FROM Hotel WHERE id_hotel = ?;

-- 2.10 Listar servicios disponibles (para filtros del front)
SELECT id_servicio, nombre FROM Servicio ORDER BY nombre;

-- 2.11 Ciudades disponibles (autocompletado)
SELECT DISTINCT ciudad FROM Hotel WHERE ciudad LIKE CONCAT(?, '%') ORDER BY ciudad;


/* 3. Vuelos*/

-- 3.1 Listar todos los vuelos con datos completos
SELECT v.id_vuelo, a.nombre AS aerolinea,
ao.codigo AS origen_codigo, ao.ciudad AS origen_ciudad,
ad.codigo AS destino_codigo, ad.ciudad AS destino_ciudad,
v.fecha_salida, v.fecha_llegada, v.escalas,
TIMESTAMPDIFF(MINUTE, v.fecha_salida, v.fecha_llegada) AS duracion_min,
MIN(o.precio) AS precio_desde
FROM Vuelo v
JOIN Aerolinea a ON a.id_aerolinea = v.id_aerolinea
JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
LEFT JOIN Oferta o ON o.id_vuelo = v.id_vuelo
GROUP BY v.id_vuelo
ORDER BY v.fecha_salida;

-- 3.2 Detalle de un vuelo
SELECT v.*, a.nombre AS aerolinea,
ao.nombre AS origen_nombre, ao.codigo AS origen_codigo,
ad.nombre AS destino_nombre, ad.codigo AS destino_codigo
FROM Vuelo v
JOIN Aerolinea a ON a.id_aerolinea = v.id_aerolinea
JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
WHERE v.id_vuelo = ?;

-- 3.3 Buscar vuelos de ida
-- Parámetros: origen, destino, fecha de ida, máx. escalas
SELECT v.id_vuelo, a.nombre AS aerolinea,
v.fecha_salida, v.fecha_llegada, v.escalas,
MIN(o.precio) AS precio_desde
FROM Vuelo v
JOIN Aerolinea a ON a.id_aerolinea = v.id_aerolinea
JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
JOIN Oferta o ON o.id_vuelo = v.id_vuelo
WHERE ao.codigo = ?
AND ad.codigo = ?
AND DATE(v.fecha_salida) = ?
AND v.escalas <= ?
GROUP BY v.id_vuelo
ORDER BY precio_desde ASC;

-- 3.4 Vuelos flexibles: +/- N días sobre la fecha elegida
SELECT v.id_vuelo, a.nombre AS aerolinea, v.fecha_salida, v.escalas,
MIN(o.precio) AS precio_desde
FROM Vuelo v
JOIN Aerolinea a ON a.id_aerolinea = v.id_aerolinea
JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
JOIN Oferta o ON o.id_vuelo = v.id_vuelo
WHERE ao.codigo = ?
  AND ad.codigo = ?
  AND DATE(v.fecha_salida) BETWEEN DATE_SUB(?, INTERVAL ? DAY)
  AND DATE_ADD(?, INTERVAL ? DAY)
GROUP BY v.id_vuelo
ORDER BY precio_desde ASC;

-- 3.5 Vuelo más barato por aerolínea para una ruta (comparador)
SELECT a.nombre AS aerolinea, MIN(o.precio) AS precio_minimo
FROM Vuelo v
JOIN Aerolinea a ON a.id_aerolinea = v.id_aerolinea
JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
JOIN Oferta o ON o.id_vuelo = v.id_vuelo
WHERE ao.codigo = ? AND ad.codigo = ?
GROUP BY a.id_aerolinea
ORDER BY precio_minimo;

-- 3.6 Crear vuelo
INSERT INTO Vuelo (id_aerolinea, id_origen, id_destino, fecha_salida, fecha_llegada, escalas)
VALUES (?, ?, ?, ?, ?, ?);

-- 3.7 Modificar vuelo
UPDATE Vuelo
SET id_aerolinea = ?, id_origen = ?, id_destino = ?,
fecha_salida = ?, fecha_llegada = ?, escalas = ?
WHERE id_vuelo = ?;

-- 3.8 Eliminar vuelo
DELETE FROM Oferta WHERE id_vuelo = ?;
DELETE FROM Vuelo WHERE id_vuelo = ?;

-- 3.9 Listar aeropuertos y aerolíneas (selectores del front)
SELECT id_aeropuerto, nombre, ciudad, codigo FROM Aeropuerto ORDER BY ciudad;
SELECT id_aerolinea, nombre FROM Aerolinea ORDER BY nombre;


/* 4. Ofertas y Proveedores */

-- 4.1 Todas las ofertas de un hotel, de más barata a más cara
SELECT o.id_oferta, p.nombre AS proveedor, o.precio, o.condiciones,
       o.url_reserva, o.fecha_actualizacion
FROM Oferta o
JOIN Proveedor p ON p.id_proveedor = o.id_proveedor
WHERE o.id_hotel = ?
ORDER BY o.precio ASC;

-- 4.2 Todas las ofertas de un vuelo
SELECT o.id_oferta, p.nombre AS proveedor, o.precio, o.condiciones,
       o.url_reserva, o.fecha_actualizacion
FROM Oferta o
JOIN Proveedor p ON p.id_proveedor = o.id_proveedor
WHERE o.id_vuelo = ?
ORDER BY o.precio ASC;

-- 4.3 Crear oferta (hotel O vuelo, el CHECK obliga a que sea uno solo)
INSERT INTO Oferta (id_proveedor, id_hotel, id_vuelo, precio, condiciones, url_reserva)
VALUES (?, ?, ?, ?, ?, ?);

-- 4.4 Actualizar precio de una oferta
UPDATE Oferta
SET precio = ?, fecha_actualizacion = NOW()
WHERE id_oferta = ?;

-- 4.5 Listar proveedores
SELECT id_proveedor, nombre, url, tipo FROM Proveedor ORDER BY nombre;


/* 5. Historial de Busquedas */

-- 5.1 Guardar búsqueda de hotel
INSERT INTO Busqueda (id_usuario, tipo_busqueda, destino)
VALUES (?, 'hotel', ?);
-- luego, con el id_busqueda obtenido:
INSERT INTO Busqueda_hotel (id_busqueda, fecha_entrada, fecha_salida,
                            huespedes, habitaciones, fecha_flexible)
VALUES (?, ?, ?, ?, ?, ?);

-- 5.2 Guardar búsqueda de vuelo
INSERT INTO Busqueda (id_usuario, tipo_busqueda, destino)
VALUES (?, 'vuelo', ?);
INSERT INTO Busqueda_vuelo (id_busqueda, id_origen, id_destino, fecha_ida,
                            fecha_vuelta, pasajeros, tipo_proyecto)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- 5.3 Historial de búsquedas de un usuario (últimas 10)
SELECT b.id_busqueda, b.tipo_busqueda, b.destino, b.fecha_busqueda,
bh.fecha_entrada, bh.fecha_salida, bh.huespedes, bh.habitaciones,
bv.fecha_ida, bv.fecha_vuelta, bv.pasajeros
FROM Busqueda b
LEFT JOIN Busqueda_hotel bh ON bh.id_busqueda = b.id_busqueda
LEFT JOIN Busqueda_vuelo bv ON bv.id_busqueda = b.id_busqueda
WHERE b.id_usuario = ?
ORDER BY b.fecha_busqueda DESC
LIMIT 10;

-- 5.4 Borrar una búsqueda del historial
DELETE FROM Busqueda WHERE id_busqueda = ? AND id_usuario = ?;

-- 5.5 Destinos más buscados (estadística / recomendaciones)
SELECT destino, COUNT(*) AS total_busquedas
FROM Busqueda
WHERE destino IS NOT NULL
GROUP BY destino
ORDER BY total_busquedas DESC
LIMIT 5;


/* 6. Favoritos */

-- 6.1 Añadir hotel a favoritos
INSERT INTO Favoritos (id_usuario, id_hotel) VALUES (?, ?);

-- 6.2 Añadir vuelo a favoritos
INSERT INTO Favoritos (id_usuario, id_vuelo) VALUES (?, ?);

-- 6.3 Listar hoteles favoritos de un usuario
SELECT f.id_favoritos, h.id_hotel, h.nombre, h.ciudad, h.valoracion,
MIN(o.precio) AS precio_desde, f.fecha_guardado
FROM Favoritos f
JOIN Hotel h ON h.id_hotel = f.id_hotel
LEFT JOIN Oferta o ON o.id_hotel = h.id_hotel
WHERE f.id_usuario = ?
GROUP BY f.id_favoritos
ORDER BY f.fecha_guardado DESC;

-- 6.4 Listar vuelos favoritos de un usuario
SELECT f.id_favoritos, v.id_vuelo, a.nombre AS aerolinea,
ao.codigo AS origen, ad.codigo AS destino,
v.fecha_salida, MIN(o.precio) AS precio_desde, f.fecha_guardado
FROM Favoritos f
JOIN Vuelo v ON v.id_vuelo = f.id_vuelo
JOIN Aerolinea a ON a.id_aerolinea = v.id_aerolinea
JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
LEFT JOIN Oferta o ON o.id_vuelo = v.id_vuelo
WHERE f.id_usuario = ?
GROUP BY f.id_favoritos
ORDER BY f.fecha_guardado DESC;

-- 6.5 Quitar de favoritos
DELETE FROM Favoritos WHERE id_favoritos = ? AND id_usuario = ?;


/* 7. Alertas de Precio */

-- 7.1 Crear alerta de hotel
INSERT INTO Alerta_precio (id_usuario, id_hotel, precio_objetivo)
VALUES (?, ?, ?);

-- 7.2 Crear alerta de vuelo
INSERT INTO Alerta_precio (id_usuario, id_vuelo, precio_objetivo)
VALUES (?, ?, ?);

-- 7.3 Alertas activas de un usuario
SELECT ap.id_alerta, ap.precio_objetivo, ap.fecha_creacion,
h.nombre AS hotel, ao.codigo AS origen, ad.codigo AS destino
FROM Alerta_precio ap
LEFT JOIN Hotel h ON h.id_hotel = ap.id_hotel
LEFT JOIN Vuelo v ON v.id_vuelo = ap.id_vuelo
LEFT JOIN Aeropuerto ao ON ao.id_aeropuerto = v.id_origen
LEFT JOIN Aeropuerto ad ON ad.id_aeropuerto = v.id_destino
WHERE ap.id_usuario = ? AND ap.activa = TRUE
ORDER BY ap.fecha_creacion DESC;

-- 7.4 Desactivar alerta
UPDATE Alerta_precio SET activa = FALSE WHERE id_alerta = ? AND id_usuario = ?;

-- 7.5 Eliminar alerta
DELETE FROM Alerta_precio WHERE id_alerta = ? AND id_usuario = ?;

-- 7.6 Alertas Disparadas: el precio actual ya está por debajo del objetivo
SELECT ap.id_alerta, u.email, h.nombre AS hotel,
       ap.precio_objetivo, MIN(o.precio) AS precio_actual
FROM Alerta_precio ap
JOIN Usuario u ON u.id_usuario = ap.id_usuario
JOIN Hotel h ON h.id_hotel = ap.id_hotel
JOIN Oferta o ON o.id_hotel = ap.id_hotel
WHERE ap.activa = TRUE
GROUP BY ap.id_alerta
HAVING precio_actual <= ap.precio_objetivo;

-- 7.8 Alertas de vuelo:
SELECT ap.id_alerta, u.email, ap.id_vuelo, ap.precio_objetivo,
MIN(o.precio) AS precio_actual
FROM Alerta_precio ap
JOIN Usuario u ON u.id_usuario = ap.id_usuario
JOIN Oferta o ON o.id_vuelo = ap.id_vuelo
WHERE ap.activa = TRUE
GROUP BY ap.id_alerta
HAVING precio_actual <= ap.precio_objetivo;


/* 8.Incidencias y administración */

-- 8.1 Usuario crea incidencia
INSERT INTO Incidencia (id_usuario, descripcion) VALUES (?, ?);

-- 8.2 Incidencias de un usuario
SELECT id_incidencia, descripcion, fecha, estado
FROM Incidencia
WHERE id_usuario = ?
ORDER BY fecha DESC;

-- 8.3 Admin: login
SELECT id_administrador, nombre, password_hash
FROM Administrador
WHERE email = ?;

-- 8.4 Admin: listar incidencias pendientes
SELECT i.id_incidencia, u.nombre, u.email, i.descripcion, i.fecha, i.estado
FROM Incidencia i
JOIN Usuario u ON u.id_usuario = i.id_usuario
WHERE i.estado = 'Pendiente'
ORDER BY i.fecha ASC;

-- 8.5 Admin: gestionar incidencia (comentar y cambiar estado)
INSERT INTO Gestion_incidencia (id_incidencia, id_admin, comentario)
VALUES (?, ?, ?);
UPDATE Incidencia SET estado = ? WHERE id_incidencia = ?;

-- 8.6 Historial de gestión de una incidencia
SELECT g.fecha_gestion, ad.nombre AS administrador, g.comentario
FROM Gestion_incidencia g
JOIN Administrador ad ON ad.id_administrador = g.id_admin
WHERE g.id_incidencia = ?
ORDER BY g.fecha_gestion;

-- 8.7 Admin: panel resumen (contadores)
SELECT
  (SELECT COUNT(*) FROM Usuario) AS usuarios,
  (SELECT COUNT(*) FROM Hotel) AS hoteles,
  (SELECT COUNT(*) FROM Vuelo) AS vuelos,
  (SELECT COUNT(*) FROM Incidencia WHERE estado = 'Pendiente') AS incidencias_pendientes;


/* 9. Indices recomendados (para búsquedas rápidas) */

CREATE INDEX idx_hotel_ciudad ON Hotel (ciudad);
CREATE INDEX idx_vuelo_ruta_fecha ON Vuelo (id_origen, id_destino, fecha_salida);
CREATE INDEX idx_oferta_hotel_precio ON Oferta (id_hotel, precio);
CREATE INDEX idx_oferta_vuelo_precio ON Oferta (id_vuelo, precio);
CREATE INDEX idx_busqueda_usuario ON Busqueda (id_usuario, fecha_busqueda);
CREATE INDEX idx_alerta_activa ON Alerta_precio (activa);

-- Evitar favoritos duplicados (un usuario no puede guardar dos veces lo mismo)
CREATE UNIQUE INDEX uq_fav_hotel ON Favoritos (id_usuario, id_hotel);
CREATE UNIQUE INDEX uq_fav_vuelo ON Favoritos (id_usuario, id_vuelo);