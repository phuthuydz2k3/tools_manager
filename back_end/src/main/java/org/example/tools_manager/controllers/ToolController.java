package org.example.tools_manager.controllers;

import org.example.tools_manager.models.Tool;
import org.example.tools_manager.services.ToolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tools")
public class ToolController {
    private static final Logger logger = LoggerFactory.getLogger(ToolController.class);

    @Autowired
    private ToolService toolService;

    @GetMapping
    public List<Tool> getAllTools() {
        logger.info("Fetching all tools");
        return toolService.getAllTools();
    }

    @GetMapping("/{id}")
    public Tool getToolById(@PathVariable String id) {
        logger.info("Fetching tool with id: {}", id);
        return toolService.getToolById(id)
                .orElseThrow(() -> {
                    logger.error("Tool not found with id: {}", id);
                    return new RuntimeException("Tool not found with id: " + id);
                });
    }

    @GetMapping(params = "userId")
    public ResponseEntity<List<Tool>> getToolsByUserId(@RequestParam String userId) {
        logger.info("Fetching tools for userId: {}", userId);
        List<Tool> tools = toolService.getToolsByUserId(userId);
        return ResponseEntity.ok(tools);
    }

    @PostMapping
    public Tool createTool(@RequestBody Tool tool) {
        logger.info("Creating new tool with name: {}", tool.getName());
        return toolService.saveTool(tool);
    }

    @PutMapping("/{id}")
    public Tool updateTool(@PathVariable String id, @RequestBody Tool toolDetails) {
        logger.info("Updating tool with id: {}", id);
        Tool tool = toolService.getToolById(id)
                .orElseThrow(() -> {
                    logger.error("Tool not found with id: {}", id);
                    return new RuntimeException("Tool not found with id: " + id);
                });

        tool.setName(toolDetails.getName());
        tool.setDescription(toolDetails.getDescription());
        tool.setUserId(toolDetails.getUserId());
        tool.setInstruction(toolDetails.getInstruction());
        tool.setLink(toolDetails.getLink());
        tool.setContact(toolDetails.getContact());

        logger.info("Tool with id: {} updated successfully", id);
        return toolService.saveTool(tool);
    }

    @DeleteMapping("/{id}")
    public void deleteTool(@PathVariable Long id) {
        logger.info("Deleting tool with id: {}", id);
        toolService.deleteTool(id);
        logger.info("Tool with id: {} deleted successfully", id);
    }
}
