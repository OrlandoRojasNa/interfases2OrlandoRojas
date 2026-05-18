package com.sofiasafar.api.repository;

import com.sofiasafar.api.entity.Cita;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class CitaRepository {

    private final List<Cita> dataBaseSimulada = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public CitaRepository() {
        // Inicialización adaptada con los nuevos campos de tipo y especialista asignado
        Cita cita1 = new Cita(idGenerator.getAndIncrement(), "Laura Restrepo", "laura@mail.com", "Limpieza Facial Profunda", "FACIAL", LocalDateTime.now().plusDays(1), "PENDIENTE", "Dr. Camilo Ruiz");
        Cita cita2 = new Cita(idGenerator.getAndIncrement(), "Carlos Mendoza", "carlos@mail.com", "Masaje Reductor Corporal", "CORPORAL", LocalDateTime.now().plusDays(2), "CONFIRMADA", "Dra. Elena Gómez");
        dataBaseSimulada.add(cita1);
        dataBaseSimulada.add(cita2);
    }

    public List<Cita> findAll() {
        return dataBaseSimulada;
    }

    public Optional<Cita> findById(Long id) {
        return dataBaseSimulada.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public Cita save(Cita cita) {
        if (cita.getId() == null) {
            cita.setId(idGenerator.getAndIncrement());
            cita.setEstado("PENDIENTE");
            dataBaseSimulada.add(cita);
        } else {
            this.findById(cita.getId()).ifPresent(c -> {
                c.setClienteNombre(cita.getClienteNombre());
                c.setClienteEmail(cita.getClienteEmail());
                c.setServicio(cita.getServicio());
                c.setTipoServicio(cita.getTipoServicio());
                c.setFechaHora(cita.getFechaHora());
                c.setEstado(cita.getEstado());
                c.setEspecialistaAsignado(cita.getEspecialistaAsignado());
            });
        }
        return cita;
    }
}