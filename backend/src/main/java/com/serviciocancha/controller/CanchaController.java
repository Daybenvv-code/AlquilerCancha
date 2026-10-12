package com.serviciocancha.controller;

import com.serviciocancha.model.Cancha;
import com.serviciocancha.service.CanchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/canchas")
public class CanchaController {

    @Autowired
    private CanchaService canchaService;

    @GetMapping
    public List<Cancha> listar() {
        return canchaService.listar();
    }

    @GetMapping("/{id}")
    public Cancha buscarPorId(@PathVariable Integer id) {
        return canchaService.buscarPorId(id);
    }

    @PostMapping
    public Cancha guardar(@RequestBody Cancha cancha) {
        // Aseguramos minúsculas para el estado si viene en mayúsculas
        if (cancha.getEstado() != null) {
            cancha.setEstado(cancha.getEstado().toLowerCase());
        }
        return canchaService.guardar(cancha);
    }

    @PutMapping("/{id}")
    public Cancha actualizar(@PathVariable Integer id, @RequestBody Cancha cancha) {
        cancha.setId(id);
        if (cancha.getEstado() != null) {
            cancha.setEstado(cancha.getEstado().toLowerCase());
        }
        return canchaService.guardar(cancha);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        canchaService.eliminar(id);
    }
}