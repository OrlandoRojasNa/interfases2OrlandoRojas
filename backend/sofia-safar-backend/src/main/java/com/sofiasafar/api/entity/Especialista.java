package com.sofiasafar.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Especialista {
    private Long id;
    private String nombre;
    private String especialidad; // "FACIAL" o "CORPORAL"
}