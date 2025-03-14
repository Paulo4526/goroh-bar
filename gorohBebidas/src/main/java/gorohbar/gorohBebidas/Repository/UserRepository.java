package gorohbar.gorohBebidas.Repository;

import gorohbar.gorohBebidas.Model.UserToken.SingUpUser;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<SingUpUser, Long> {
    UserDetails findByEmail(String email);
}
