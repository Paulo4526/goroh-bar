package gorohbar.gorohBebidas.Model.UserToken;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum UserRole {
    ADMIN("admin"),
    USER("user"),
    MASTER("master");

    private String role;


}
