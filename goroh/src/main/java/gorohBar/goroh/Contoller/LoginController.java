package gorohBar.goroh.Contoller;

import gorohBar.goroh.DTO.Login.LoginDTO;
import gorohBar.goroh.DTO.Login.TokenDTO;
import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Service.Token.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO dto) {
        UsernamePasswordAuthenticationToken userPassword = new UsernamePasswordAuthenticationToken(
                dto.email(),
                dto.password()
        );
        Authentication auth = authenticationManager.authenticate(userPassword);
        String token = tokenService.getKey((SingUpUser) auth.getPrincipal());
        return ResponseEntity.ok(new TokenDTO(token));
    }
}
