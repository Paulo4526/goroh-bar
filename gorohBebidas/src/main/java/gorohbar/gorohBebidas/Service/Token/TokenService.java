package gorohbar.gorohBebidas.Service.Token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Value("${token.key}")

    private String key;

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
}
