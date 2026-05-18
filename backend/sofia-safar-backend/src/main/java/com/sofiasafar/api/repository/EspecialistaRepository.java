package com.sofiasafar.api.repository;

import com.sofiasafar.api.entity.Especialista;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class EspecialistaRepository {

    private final List<Especialista> especialistas = new ArrayList<>();

    public EspecialistaRepository() {
        // Inicializamos los especialistas de prueba
        especialistas.add(new Especialista(1L, "Dr. Camilo Ruiz", "FACIAL"));
        especialistas.add(new Especialista(2L, "Dra. Elena Gómez", "CORPORAL"));
    }

    public List<Especialista> findByEspecialidad(String especialidad) {
        return especialistas.stream()
                .filter(e -> e.getEspecialidad().equalsIgnoreCase(especialidad))
                .collect(Collectors.toList());
    }
}