package gorohBar.goroh.Service;

import gorohBar.goroh.DTO.SingUpDTO;
import gorohBar.goroh.DTO.SingUpShowDTO;
import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Model.UserRole;
import gorohBar.goroh.Repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public SingUpShowDTO showUserByEmail(String email) {
        Optional<SingUpUser> user = userRepository.getUserByEmail(email);
        if (user.isPresent()) {
            return new SingUpShowDTO(user.get());
        }else{
            throw new RuntimeException("Usuário nao encontrado!");
        }
    }

    public SingUpShowDTO showUserByID(Long id){
        Optional<SingUpUser> optionalSingUpUser = userRepository.findById(id);
        if (optionalSingUpUser.isPresent()) {
            return new SingUpShowDTO(optionalSingUpUser.get());
        }else{
            throw new RuntimeException("Usuario nao encontrado!");
        }
    }

    public SingUpShowDTO updateUser(SingUpUser singUpUser, Long id) {

        String criptografy = null;
        if (singUpUser.getPassword() != null && !singUpUser.getPassword().isEmpty()) {
            criptografy = new BCryptPasswordEncoder().encode(singUpUser.getPassword());
        }

        Optional<SingUpUser> optionalSingUpUser = userRepository.getUserById(id);
        if (optionalSingUpUser.isPresent()) {

            //verify each item if is necessary to update
            SingUpUser userToUpdate = optionalSingUpUser.get();

            if(singUpUser.getName() != null){
                userToUpdate.setName(singUpUser.getName());
            }else{
                userToUpdate.setName(optionalSingUpUser.get().getName());
            }

            if(singUpUser.getEmail() != null){
                userToUpdate.setEmail(singUpUser.getEmail());
            }else{
                userToUpdate.setEmail(optionalSingUpUser.get().getEmail());
            }

            if(singUpUser.getRole() != null){
                userToUpdate.setRole(singUpUser.getRole());
            }else{
                userToUpdate.setRole(optionalSingUpUser.get().getRole());
            }

            if(criptografy != null){
                userToUpdate.setPassword(criptografy);
            }else{
                userToUpdate.setPassword(optionalSingUpUser.get().getPassword());
            }


            userRepository.save(userToUpdate);
            return new SingUpShowDTO(userToUpdate);
        }else{
            throw  new RuntimeException("Usuario nao encontrado!");
        }
    }

    public Page<SingUpShowDTO> showAll(Pageable pageable){
        return userRepository.findAll(pageable).map(SingUpShowDTO::new);
    }

    public void deleteUser(Long id) {
        Optional<SingUpUser> optionalSingUpUser = userRepository.findById(id);
        if (optionalSingUpUser.isPresent()) {
            userRepository.delete(optionalSingUpUser.get());
        }else{
            throw new RuntimeException("Usuario nao encontrado!");
        }
    }
}
