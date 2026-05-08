package com.ai.resume.controller;

import com.ai.resume.dto.request.ResumeCreateRequest;
import com.ai.resume.dto.response.ResumeResponse;
import com.ai.resume.enums.TemplateType;
import com.ai.resume.exception.ResourceNotFoundException;
import com.ai.resume.mapper.ResumeMapper;
import com.ai.resume.service.ResumeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ResumeController.class)
class ResumeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResumeService resumeService;

    @MockBean
    private ResumeMapper resumeMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreateResume() throws Exception {
        ResumeCreateRequest request = new ResumeCreateRequest();
        request.setTitle("Test Resume");
        request.setTemplateType(TemplateType.MODERN);

        ResumeResponse response = new ResumeResponse();
        response.setTitle("Test Resume");

        when(resumeService.createResume(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/resumes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Resume"));
    }

    @Test
    void testGetAllResumes() throws Exception {
        mockMvc.perform(get("/api/v1/resumes"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetResumeById_notFound() throws Exception {
        when(resumeService.getResumeById(999L)).thenThrow(new ResourceNotFoundException("Resume", 999L));
        mockMvc.perform(get("/api/v1/resumes/999"))
                .andExpect(status().isNotFound());
    }
}
