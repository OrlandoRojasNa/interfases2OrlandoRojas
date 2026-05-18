package com.sofiasafar.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cita {
    private Long id;
    private String clienteNombre;
    private String clienteEmail;
    private String servicio;
    private String tipoServicio; // "FACIAL" o "CORPORAL"
    private LocalDateTime fechaHora;
    private String estado;
    private String especialistaAsignado; // Almacena el nombre del especialista que lo atenderá
}