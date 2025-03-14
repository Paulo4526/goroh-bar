package gorohBar.goroh.Service;

import gorohBar.goroh.DTO.SingUpDTO;
import gorohBar.goroh.DTO.SingUpShowDTO;
import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Model.UserRole;
import gorohBar.goroh.Repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public SingUpShowDTO singUp(SingUpDTO singUpDTO) {
        String criptografy = new BCryptPasswordEncoder().encode(singUpDTO.password());

        SingUpUser singUpUser = new SingUpUser();
        BeanUtils.copyProperties(singUpDTO, singUpUser);

        singUpUser.setPassword(criptografy);

        if (singUpUser.getRole() == null) {
            singUpUser.setRole(UserRole.USER);
        }

        SingUpUser sing = userRepository.save(singUpUser);
        return new SingUpShowDTO(sing);
    }
}
