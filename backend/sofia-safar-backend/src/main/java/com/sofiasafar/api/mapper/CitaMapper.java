package com.sofiasafar.api.mapper;

import com.sofiasafar.api.dto.CitaDTO;
import com.sofiasafar.api.entity.Cita;
import org.springframework.stereotype.Component;

@Component
public class CitaMapper {

    public CitaDTO toDTO(Cita cita) {
        if (cita == null) return null;
        CitaDTO dto = new CitaDTO();
        dto.setId(cita.getId());
        dto.setClienteNombre(cita.getClienteNombre());
        dto.setClienteEmail(cita.getClienteEmail());
        dto.setServicio(cita.getServicio());
        dto.setTipoServicio(cita.getTipoServicio());
        dto.setFechaHora(cita.getFechaHora());
        dto.setEstado(cita.getEstado());
        dto.setEspecialistaAsignado(cita.getEspecialistaAsignado());
        return dto;
    }

    public Cita toEntity(CitaDTO dto) {
        if (dto == null) return null;
        Cita entity = new Cita();
        entity.setId(dto.getId());
        entity.setClienteNombre(dto.getClienteNombre());
        entity.setClienteEmail(dto.getClienteEmail());
        entity.setServicio(dto.getServicio());
        entity.setTipoServicio(dto.getTipoServicio());
        entity.setFechaHora(dto.getFechaHora());
        entity.setEstado(dto.getEstado());
        entity.setEspecialistaAsignado(dto.getEspecialistaAsignado());
        return entity;
    }
}