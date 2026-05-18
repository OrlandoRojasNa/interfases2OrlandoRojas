package com.sofiasafar.api.service;

import com.sofiasafar.api.dto.CitaDTO;
import com.sofiasafar.api.entity.Cita;
import com.sofiasafar.api.exception.ResourceNotFoundException;
import com.sofiasafar.api.mapper.CitaMapper;
import com.sofiasafar.api.repository.CitaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitaService {

    private final CitaRepository citaRepository;
    private final CitaMapper citaMapper;

    public List<CitaDTO> obtenerTodas() {
        return citaRepository.findAll().stream()
                .map(citaMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CitaDTO obtenerPorId(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La cita con ID " + id + " no existe."));
        return citaMapper.toDTO(cita);
    }

    public CitaDTO agendarCita(CitaDTO citaDTO) {
        Cita nuevaCita = citaMapper.toEntity(citaDTO);
        Cita citaGuardada = citaRepository.save(nuevaCita);
        return citaMapper.toDTO(citaGuardada);
    }
}