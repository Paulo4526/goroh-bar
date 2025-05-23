package gorohBar.goroh.Security;

import gorohBar.goroh.Service.Token.VerifyToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class UserSecurity {

    @Autowired
    private VerifyToken verifyToken;

    //Swagger permissions URL's
    private static final String[] WHITE_LIST_URL = { "/api/v1/auth/**", "/v2/api-docs", "/v3/api-docs",
            "/v3/api-docs/**", "/swagger-resources", "/swagger-resources/**", "/configuration/ui",
            "/configuration/security", "/swagger-ui/**", "/webjars/**", "/swagger-ui.html", "/api/auth/**",
            "/api/test/**", "/authenticate", "swagger-ui**"};

    @Bean
    public SecurityFilterChain securityFilter(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(autorize -> autorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/user/byEmail").hasAnyRole("USER", "ADMIN", "MASTER")
                        .requestMatchers(HttpMethod.GET, "/user//byId").hasAnyRole("ADMIN", "MASTER")
                        .requestMatchers(HttpMethod.GET, "/user/userList").hasAnyRole("ADMIN", "MASTER")
                        .requestMatchers(HttpMethod.PUT, "/user/update").hasAnyRole( "USER","ADMIN", "MASTER")
                        .requestMatchers(HttpMethod.PUT, "/user/patch").hasAnyRole( "USER","ADMIN", "MASTER")
                        .requestMatchers(HttpMethod.DELETE, "/user/delete").hasAnyRole( "MASTER")
                        .requestMatchers(WHITE_LIST_URL).permitAll()
                        .anyRequest()
                        .authenticated()
                ).addFilterBefore(verifyToken, UsernamePasswordAuthenticationFilter.class).build();
    }


    // Configuração do CORS que já está
    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));  // Permite o frontend
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    //Aqui usamos a validação do nosso login passados pela classe AuthController e fará a autenticação da nossa requisilção HTTP
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }


    //PasswordEncoder já cria a criptografia da nossa aplicação criptografando a senha que o usuario passar.
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
