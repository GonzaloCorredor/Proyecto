
/*Modelo de prueba, a lo largo del proyecto podría variar*/

/*1.Creacion de base de daos*/

CREATE DATABASE buscador_viajes
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE buscador_viajes;

/*2.Usuarios y cuentas*/

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE Preferencias (
    id_preferencia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    idioma VARCHAR(50),
    moneda VARCHAR(10),
    notificaciones BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE
);


/*3.Viajes y Aeropuertos*/
CREATE TABLE Aerolinea (
    id_aerolinea INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

CREATE TABLE Aeropuerto (
    id_aeropuerto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100),
    codigo VARCHAR(10) UNIQUE
);

CREATE TABLE Vuelo (
    id_vuelo INT AUTO_INCREMENT PRIMARY KEY,
    id_aerolinea INT NOT NULL,
    id_origen INT NOT NULL,
    id_destino INT NOT NULL,
    fecha_salida DATETIME NOT NULL,
    fecha_llegada DATETIME NOT NULL,
    escalas INT DEFAULT 0,

    FOREIGN KEY (id_aerolinea)
        REFERENCES Aerolinea(id_aerolinea),

    FOREIGN KEY (id_origen)
        REFERENCES Aeropuerto(id_aeropuerto),

    FOREIGN KEY (id_destino)
        REFERENCES Aeropuerto(id_aeropuerto)
);

/*4.Busquedas*/
CREATE TABLE Busqueda (
    id_busqueda INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_busqueda VARCHAR(20) NOT NULL,
    fecha_busqueda DATETIME DEFAULT CURRENT_TIMESTAMP,
    destino VARCHAR(150),

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE Busqueda_hotel (
    id_busqueda INT PRIMARY KEY,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    huespedes INT NOT NULL,
    habitaciones INT NOT NULL,
    fecha_flexible BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (id_busqueda)
        REFERENCES Busqueda(id_busqueda)
        ON DELETE CASCADE
);

CREATE TABLE Busqueda_vuelo (
    id_busqueda INT PRIMARY KEY,
    id_origen INT NOT NULL,
    id_destino INT NOT NULL,
    fecha_ida DATE NOT NULL,
    fecha_vuelta DATE,
    pasajeros INT NOT NULL,
    tipo_viaje VARCHAR(50),

    FOREIGN KEY (id_busqueda)
        REFERENCES Busqueda(id_busqueda)
        ON DELETE CASCADE
);


/*5.Provedores y Ofertas*/
CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    url VARCHAR(500),
    tipo VARCHAR(50)
);

CREATE TABLE Oferta (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    id_hotel INT NULL,
    id_vuelo INT NULL,
    precio DECIMAL(10,2) NOT NULL,
    condiciones TEXT,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    url_reserva VARCHAR(500),

    FOREIGN KEY (id_proveedor)
        REFERENCES Proveedor(id_proveedor),

    FOREIGN KEY (id_hotel)
        REFERENCES Hotel(id_hotel),

    FOREIGN KEY (id_vuelo)
        REFERENCES Vuelo(id_vuelo),

    CHECK (
        (id_hotel IS NOT NULL AND id_vuelo IS NULL)
        OR
        (id_hotel IS NULL AND id_vuelo IS NOT NULL)
    )
);

/*6.Hoteles y Servicios*/

CREATE TABLE Hotel (
    id_hotel INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    valoracion DECIMAL(3,2),
    descripcion TEXT,

    FOREIGN KEY (id_proveedor)
        REFERENCES Proveedor(id_proveedor)
);

CREATE TABLE Servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Hotel_servicio (
    id_hotel INT NOT NULL,
    id_servicio INT NOT NULL,

    PRIMARY KEY (id_hotel, id_servicio),

    FOREIGN KEY (id_hotel)
        REFERENCES Hotel(id_hotel)
        ON DELETE CASCADE,

    FOREIGN KEY (id_servicio)
        REFERENCES Servicio(id_servicio)
        ON DELETE CASCADE
);


/*7.Favoritos y alertas de precios*/

CREATE TABLE Favoritos (
    id_favoritos INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_hotel INT NULL,
    id_vuelo INT NULL,
    fecha_guardado DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE,

    FOREIGN KEY (id_hotel)
        REFERENCES Hotel(id_hotel)
        ON DELETE CASCADE,

    FOREIGN KEY (id_vuelo)
        REFERENCES Vuelo(id_vuelo)
        ON DELETE CASCADE,

    CHECK (
        (id_hotel IS NOT NULL AND id_vuelo IS NULL)
        OR
        (id_hotel IS NULL AND id_vuelo IS NOT NULL)
    )
);

CREATE TABLE Alerta_precio (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_hotel INT NULL,
    id_vuelo INT NULL,
    precio_objeto DECIMAL(10,2) NOT NULL,
    activa BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE,

    FOREIGN KEY (id_hotel)
        REFERENCES Hotel(id_hotel)
        ON DELETE CASCADE,

    FOREIGN KEY (id_vuelo)
        REFERENCES Vuelo(id_vuelo)
        ON DELETE CASCADE,

    CHECK (
        (id_hotel IS NOT NULL AND id_vuelo IS NULL)
        OR
        (id_hotel IS NULL AND id_vuelo IS NOT NULL)
    )
);

/*8. Administración e incidencias*/
CREATE TABLE Incidencia (
    id_incidencia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'Pendiente',

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario)
);

CREATE TABLE Administrador (
    id_administrador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE Gestion_incidencia (
    id_gestion INT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia INT NOT NULL,
    id_admin INT NOT NULL,
    fecha_gestion DATETIME DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT,

    FOREIGN KEY (id_incidencia)
        REFERENCES Incidencia(id_incidencia)
        ON DELETE CASCADE,

    FOREIGN KEY (id_admin)
        REFERENCES Administrador(id_administrador)
);