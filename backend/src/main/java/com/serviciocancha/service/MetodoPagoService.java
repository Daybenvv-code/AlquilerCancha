package com.serviciocancha.service;

import com.serviciocancha.model.MetodoPago;
import com.serviciocancha.repository.MetodoPagoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetodoPagoService {

    // 1. Inyección por constructor (recomendado)
    private final MetodoPagoRepository metodoPagoRepository;

    public MetodoPagoService(MetodoPagoRepository metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }

    public List<MetodoPago> listar() {
        return metodoPagoRepository.findAll();
    }

    public MetodoPago buscarPorId(Integer id) {
        return metodoPagoRepository.findById(id).orElse(null);
    }

    public MetodoPago guardar(MetodoPago metodoPago) {
        return metodoPagoRepository.save(metodoPago);
    }

    public MetodoPago actualizar(Integer id, MetodoPago datos) {
        MetodoPago metodoPago = metodoPagoRepository.findById(id).orElse(null);

        // 2. Validación de seguridad para evitar NullPointerException si el ID no existe
        if (metodoPago == null) {
            return null;
        }

        metodoPago.setNombre(datos.getNombre());
        return metodoPagoRepository.save(metodoPago);
    }

    public void eliminar(Integer id) {
        metodoPagoRepository.deleteById(id);
    }
}