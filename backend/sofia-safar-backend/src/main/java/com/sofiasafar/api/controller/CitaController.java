package com.sofiasafar.api.controller;

import com.sofiasafar.api.dto.CitaDTO;
import com.sofiasafar.api.service.CitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/citas")
@CrossOrigin(origins = "http://localhost:4200") // Conexión directa para Angular
@RequiredArgsConstructor
public class CitaController {

    private final CitaService citaService;

    @GetMapping
    public ResponseEntity<List<CitaDTO>> listarCitas() {
        return ResponseEntity.ok(citaService.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(citaService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<CitaDTO> agendarCita(@Valid @RequestBody CitaDTO citaDTO) {
        CitaDTO nuevaCita = citaService.agendarCita(citaDTO);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }
}