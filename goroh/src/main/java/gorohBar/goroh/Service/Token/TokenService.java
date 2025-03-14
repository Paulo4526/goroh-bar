package gorohBar.goroh.Service.Token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import gorohBar.goroh.Model.SingUpUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${token.key}")
    private String key;

    public String getKey(SingUpUser user) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(key);
            String token = JWT
                    .create()
                    .withIssuer("user")
                    .withSubject(user.getEmail())
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algorithm);
            return token;
        }catch (JWTVerificationException e){
            throw new RuntimeException("Erro ao Gerar o Token");
        }
    }

    public String validarToken(String token){
        try{
            Algorithm algoritimo = Algorithm.HMAC256(key);
            return JWT
                    //Comando require para validação do algoritimo contido na key
                    .require(algoritimo)
                    //Comando withIssuer para validar o assunto condificado no algoritimo.
                    .withIssuer("user")
                    //Comando build para criação da validação.
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException erro){
            throw new RuntimeException("Não foi possível validar o token");
        }
    }

    public Instant gerarDataExpiracao (){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
