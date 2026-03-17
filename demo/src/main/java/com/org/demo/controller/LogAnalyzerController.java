package com.org.demo.controller;

import com.org.demo.service.LogAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analyze")
public class LogAnalyzerController {

    @Autowired
    private LogAnalyzerService logAnalyzerService;

    @PostMapping("/logs")
    public String analyzeLogs(@RequestBody String logs){
        return logAnalyzerService.analyzeLogs(logs);
    }
}
