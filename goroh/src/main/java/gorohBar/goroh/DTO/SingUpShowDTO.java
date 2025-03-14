package gorohBar.goroh.DTO;

import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Model.UserRole;

public record SingUpShowDTO(

        Long userId,
        String username,
        String password,
        String email,
        UserRole role

) {
    public SingUpShowDTO (SingUpUser singUpUser){
        this(singUpUser.getUserID(), singUpUser.getUsername(), singUpUser.getPassword(), singUpUser.getEmail(), singUpUser.getRole());
    }
}
