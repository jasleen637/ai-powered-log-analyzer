package com.org.demo.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class LogAnalyzerService {

    private final ChatClient chatClient;


    public LogAnalyzerService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String analyzeLogs(String logs){
        String prompt = """
            Analyze the following logs and provide:
            1. Summary of the issue
            2. List of errors
            3. Severity level (LOW, MEDIUM, HIGH)
            4. Suggested fixes

            Logs:
            """ + logs;

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    public String analyzeFile(MultipartFile file) throws IOException {
        String logs = new String(file.getBytes(), StandardCharsets.UTF_8);
        return analyzeLogs(logs);
    }
}
