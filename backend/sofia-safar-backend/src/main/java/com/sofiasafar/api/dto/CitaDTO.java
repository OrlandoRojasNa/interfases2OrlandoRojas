package com.sofiasafar.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CitaDTO {
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    private String clienteNombre;
    @NotBlank(message = "El email es obligatorio")
    @Email
    private String clienteEmail;
    @NotBlank(message = "El servicio es obligatorio")
    private String servicio;
    @NotBlank(message = "El tipo de servicio (FACIAL/CORPORAL) es obligatorio")
    private String tipoServicio;
    @NotNull(message = "La fecha es obligatoria")
    private LocalDateTime fechaHora;
    private String estado;
    private String especialistaAsignado;
}