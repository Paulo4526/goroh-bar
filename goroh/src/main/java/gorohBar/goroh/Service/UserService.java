package gorohBar.goroh.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import gorohBar.goroh.DTO.SingUpDTO;
import gorohBar.goroh.DTO.SingUpShowDTO;
import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Model.UserRole;
import gorohBar.goroh.Repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl;
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


    public SingUpShowDTO patchUser(String json, Long id) throws JsonProcessingException {

        String field = null;

        UserRole role = null;

        String value = null;

        String criptografy = null;

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode node = objectMapper.readTree(json);

        if(node.has("name")){
            field = "name";
            value = node.get("name").asText();
        }else if(node.has("email")){
            field = "email";
            value = node.get("email").asText();
        }else if(node.has("role")){
            field = "role";
            role = UserRole.valueOf(node.get("role").asText());
        }else if(node.has("password")){
            field = "password";
            value = node.get("password").asText();
        }

        Optional<SingUpUser> optionalSingUpUser = userRepository.getUserById(id);
        if (optionalSingUpUser.isPresent()) {

            SingUpUser userToUpdate = optionalSingUpUser.get();

            if(field.equals("name")){

                userToUpdate.setName(value);
            }else if(field.equals("email")){

                Optional<SingUpUser> existingUserWithEmail = userRepository.getUserByEmail(value);
                if (existingUserWithEmail.isPresent()) {
                    throw new RuntimeException("Email já está em uso.");
                }
                userToUpdate.setEmail(value);

            }else if(field.equals("role")){

                userToUpdate.setRole(role);

            }else if(field.equals("password")){
                criptografy = new BCryptPasswordEncoder().encode(value);
                userToUpdate.setPassword(criptografy);

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
