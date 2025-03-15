package gorohBar.goroh.DTO;

import gorohBar.goroh.Model.SingUpUser;
import gorohBar.goroh.Model.UserRole;

public record SingUpShowDTO(

        Long userId,
        String name,
        String email,
        UserRole role

) {
    public SingUpShowDTO (SingUpUser singUpUser){
        this(singUpUser.getUserID(), singUpUser.getName(), singUpUser.getEmail(), singUpUser.getRole());
    }
}
