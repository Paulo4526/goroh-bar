package gorohBar.goroh.Repository;

import gorohBar.goroh.Model.SingUpUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<SingUpUser, Long> {

    UserDetails findByEmail(String email);
}
