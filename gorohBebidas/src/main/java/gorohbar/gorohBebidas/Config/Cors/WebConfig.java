package gorohbar.gorohBebidas.Config.Cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite todas as rotas
                .allowedOrigins("http://localhost:3000", "http://localhost:5051")  // Permite o frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Permite métodos HTTP
                .allowedHeaders("*")  // Permite todos os headers
                .allowCredentials(true);  // Permite credenciais (cookies, autorização, etc)
    }
}
