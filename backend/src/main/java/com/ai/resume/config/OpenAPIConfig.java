package com.ai.resume.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AI Resume Builder API")
                        .version("1.0.0")
                        .description("Production-grade AI-powered resume builder API")
                        .contact(new Contact()
                                .name("AI Resume Builder Team")
                                .email("support@airesume.dev")
                        )
                )
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development"),
                        new Server().url("http://localhost/api").description("Docker Nginx")
                ));
    }
}
