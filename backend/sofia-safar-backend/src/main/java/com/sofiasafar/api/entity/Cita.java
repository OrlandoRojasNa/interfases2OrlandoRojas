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
    private LocalDateTime fechaHora;
    private String estado; // "PENDIENTE", "CONFIRMADA", "CANCELADA"
}