package com.sofiasafar.api.service;

import com.sofiasafar.api.dto.CitaDTO;
import com.sofiasafar.api.entity.Cita;
import com.sofiasafar.api.entity.Especialista;
import com.sofiasafar.api.exception.ResourceNotFoundException;
import com.sofiasafar.api.mapper.CitaMapper;
import com.sofiasafar.api.repository.CitaRepository;
import com.sofiasafar.api.repository.EspecialistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitaService {

    private final CitaRepository citaRepository;
    private final EspecialistaRepository especialistaRepository;
    private final CitaMapper citaMapper;

    public List<CitaDTO> obtenerTodas() {
        return citaRepository.findAll().stream()
                .map(citaMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CitaDTO agendarCita(CitaDTO citaDTO) {
        Cita nuevaCita = citaMapper.toEntity(citaDTO);

        // Regla de negocio: Buscar especialista según el tipo de servicio comprado
        List<Especialista> disponibles = especialistaRepository.findByEspecialidad(nuevaCita.getTipoServicio());

        if (!disponibles.isEmpty()) {
            // Asignación simple: Toma al primer especialista disponible de esa rama
            nuevaCita.setEspecialistaAsignado(disponibles.get(0).getNombre());
        } else {
            nuevaCita.setEspecialistaAsignado("Por Asignar (Sin especialista disponible)");
        }

        Cita citaGuardada = citaRepository.save(nuevaCita);
        return citaMapper.toDTO(citaGuardada);
    }
}