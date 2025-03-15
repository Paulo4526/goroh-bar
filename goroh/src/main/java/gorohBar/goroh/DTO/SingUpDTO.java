package gorohBar.goroh.DTO;

import gorohBar.goroh.Model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SingUpDTO(
        @NotBlank(message = "The name space could not be blank, please put in a valid name!")
        @Size(message = "The name space must have more than 10 characters or less than 100 characters", max = 100, min = 10)
        String name,

        @NotBlank(message = "The password space could not be blank, please put in a valid name!")
        @Size(message = "The name space must have more than 10 characters!", min = 10)
        String password,

        @Email(message = "the email space must have a especial character like '@', please put in a valid email. ")
        String email,

        UserRole role
) {
}
