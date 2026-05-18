package com.sofiasafar.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CitaDTO {
    private Long id;

    @NotBlank(message = "El nombre del cliente es obligatorio")
    private String clienteNombre;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El formato del correo no es válido")
    private String clienteEmail;

    @NotBlank(message = "El servicio solicitado es obligatorio")
    private String servicio;

    @NotNull(message = "La fecha y hora de la cita son obligatorias")
    private LocalDateTime fechaHora;

    private String estado;
}