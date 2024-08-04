package org.example.tools_manager.services;

import org.example.tools_manager.models.Tool;
import org.example.tools_manager.repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ToolService {
    @Autowired
    private ToolRepository toolRepository;

    public List<Tool> getAllTools() {
        return toolRepository.findAll();
    }

    public List<Tool> getToolsByUserId(String userId) {
        return toolRepository.findByUserId(userId);
    }

    public Optional<Tool> getToolById(String id) {
        return toolRepository.findById(Long.parseLong(id));
    }

    public Tool saveTool(Tool tool) {
        return toolRepository.save(tool);
    }

    public void deleteTool(Long id) {
        toolRepository.deleteById(id);
    }
}