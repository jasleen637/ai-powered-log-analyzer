package com.org.demo.controller;

import com.org.demo.service.LogAnalyzerService;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/analyze")
public class LogAnalyzerController {

    @Autowired
    private LogAnalyzerService logAnalyzerService;

    @PostMapping("/logs")
    public String analyzeLogs(@RequestBody String logs){
        return logAnalyzerService.analyzeLogs(logs);
    }

    @PostMapping("/file")
    public String uploadAnalyzeLogs(@RequestParam MultipartFile file) throws IOException {
        return logAnalyzerService.analyzeFile(file);
    }

}
