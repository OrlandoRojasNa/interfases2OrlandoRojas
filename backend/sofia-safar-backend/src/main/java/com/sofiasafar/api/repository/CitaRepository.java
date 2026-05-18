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
        // Citas quemadas de prueba para tener datos al arrancar
        dataBaseSimulada.add(new Cita(idGenerator.getAndIncrement(), "Laura Restrepo", "laura@mail.com", "Limpieza Facial", LocalDateTime.now().plusDays(1), "PENDIENTE"));
        dataBaseSimulada.add(new Cita(idGenerator.getAndIncrement(), "Carlos Mendoza", "carlos@mail.com", "Masaje Relajante", LocalDateTime.now().plusDays(2), "CONFIRMADA"));
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
                c.setFechaHora(cita.getFechaHora());
                c.setEstado(cita.getEstado());
            });
        }
        return cita;
    }
}